import Tweep from "App/Models/Tweep";
import Axios, { AxiosInstance, AxiosResponse } from "axios";
import logger from "@ioc:Adonis/Core/Logger";
import {
  apiKey,
  apiSecret,
  appHandle,
  bearerToken,
  requestUrl
} from "Config/twitter";
import Twit from "twit";

export default class Twitter {
  $axios: AxiosInstance;
  $twit: any;

  public constructor(tweep?: Tweep) {
    this.$axios = Axios.create({
      baseURL: requestUrl,
      headers: {
        common: { Authorization: `Bearer ${bearerToken}` }
      }
    });

    if (tweep) this.initializeTwit(tweep);
  }

  public initializeTwit(tweep: Tweep) {
    this.$twit = new Twit({
      consumer_key: apiKey,
      consumer_secret: apiSecret,
      access_token: tweep.token,
      access_token_secret: tweep.tokenSecret,
      timeout_ms: 60 * 1000
    });
  }

  public async getUserByHandle(
    handle: string,
    dataOnly = true
  ): Promise<AxiosResponse<TwitterUser> & TwitterUser> {
    const response = await this.$axios.get("users/show.json", {
      params: { screen_name: handle }
    });

    return dataOnly ? response.data : response;
  }

  public async tweet(data: {
    status: string;
    in_reply_to_status_id?: any;
  }): Promise<Tweet> {
    const response = await this.$twit.post("statuses/update", data);

    return response.data;
  }

  public async stream(filter, callBack: Function) {
    const appTweep = await Tweep.findByOrFail("twitterHandle", appHandle);
    this.initializeTwit(appTweep);

    var twitterStream = this.$twit.stream("statuses/filter", {
      track: filter,
      language: "en"
    });

    twitterStream.on("connect", () => logger.info("twitter stream connected"));

    twitterStream.on("tweet", (tweet) => callBack(tweet));
  }
}
