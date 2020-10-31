import StoreArrestValidator from "App/Validators/Reports/StoreArrestValidator";
import { AuthContract } from "@ioc:Adonis/Addons/Auth";
import Arrest from "App/Models/Reports/Arrest";
import Twitter from "App/Services/Twitter/Twitter";
import ArrestStatus from "App/Models/Reports/ArrestStatus";
import StoreArrestLog from "./StoreArrestLog";
import logger from "@ioc:Adonis/Core/Logger";
import Tweep from "App/Models/Tweep";
import { appHandle } from "Config/twitter";
import User from "App/Models/People/User";

export default class StoreArrest {
  async handle(
    { details, location, officer, handle }: typeof StoreArrestValidator.props,
    auth: AuthContract | { user: User },
    sendTweet = true
  ) {
    var twitterAccount: number | undefined = undefined;
    if (handle) {
      twitterAccount = (await new Twitter().getUserByHandle(handle)).id;
    }

    const arrestStatus = await ArrestStatus.findByOrFail("code", "reported");

    const arrest = await Arrest.create({
      details,
      location,
      officer,
      twitterAccount,
      arrestStatusId: arrestStatus.id,
      createdBy: auth?.user?.id
    });

    await new StoreArrestLog().handle(arrest, "Arrest reported", auth);

    if (sendTweet) {
      try {
        const appTweep = await Tweep.findByOrFail("twitterHandle", appHandle);
        await new Twitter(appTweep).tweet({
          status: `#sarsArrest #endSARS ${details} at ${location}`
        });
      } catch (error) {
        logger.error(error);
      }
    }

    return arrest;
  }
}
