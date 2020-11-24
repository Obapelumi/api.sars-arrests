import User from "App/Models/People/User";
import Arrest from "App/Models/Reports/Arrest";
import Tweep from "App/Models/Tweep";
import StoreArrest from "App/Repos/Reports/StoreArrest";
import Twitter from "App/Services/Twitter/Twitter";
import { appHandle } from "Config/twitter";

export default class Stream {
  async handle(tweet: Tweet) {
    var referenceArrest = await Arrest.findBy(
      "tweetReplyId",
      tweet.in_reply_to_status_id || 0
    );

    if (referenceArrest)
      return await this.arrestLocator(tweet, referenceArrest);

    return this.newArrest(tweet);
  }

  parseTweetText(text) {
    return text
      .toLowerCase()
      .replace("@", "")
      .replace("sarsarrests", "")
      .trim();
  }

  async arrestLocator(tweet: Tweet, arrest: Arrest) {
    arrest.location = this.parseTweetText(tweet.text);
    await arrest.save();

    const appTweep = await Tweep.query()
      .where("twitterHandle", appHandle)
      .preload("user")
      .firstOrFail();

    await new Twitter(appTweep).tweet({
      status: `@${tweet.user.screen_name} got you`,
      in_reply_to_status_id: tweet.id_str
    });

    return arrest;
  }

  async newArrest(tweet: Tweet) {
    const user = await User.updateOrCreate(
      { twitterAccount: tweet.user.id },
      { name: tweet.user.name }
    );
    const tweep = await Tweep.updateOrCreate(
      { twitterAccount: tweet.user.id },
      { twitterHandle: tweet.user.screen_name, userId: user.id }
    );

    var arrest = await new StoreArrest().handle(
      {
        details: this.parseTweetText(tweet.text),
        location: undefined,
        officer: undefined,
        handle: undefined,
        googlePlaceId: undefined
      },
      { user },
      false
    );

    const appTweep = await Tweep.query()
      .where("twitterHandle", appHandle)
      .preload("user")
      .firstOrFail();

    const botTweet = await new Twitter(appTweep).tweet({
      status: `@${tweep.twitterHandle} Hi. Please reply with your current location`,
      in_reply_to_status_id: tweet.id_str
    });

    arrest.tweetId = tweet.id;
    arrest.tweetReplyId = botTweet.id;
    await arrest.save();

    this.pollForReply(arrest, appTweep);

    return arrest;
  }

  pollForReply(arrest: Arrest, appTweep: Tweep) {
    var i = 0;
    var poll = setInterval(() => {
      if (i >= 5) return clearInterval(poll);
      (async () => {
        const mentions: Tweet[] = (
          await new Twitter(appTweep).$twit.get("statuses/mentions_timeline")
        ).data;
        const reply = mentions.find((mention) => {
          return mention.in_reply_to_status_id == arrest.tweetReplyId;
        });
        if (reply) {
          this.arrestLocator(reply, arrest);
          clearInterval(poll);
          i = 5;
        }
      })();
      i++;
    }, 45000);
  }
}
