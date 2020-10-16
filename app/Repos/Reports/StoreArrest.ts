import StoreArrestValidator from "App/Validators/Reports/StoreArrestValidator";
import { AuthContract } from "@ioc:Adonis/Addons/Auth";
import Arrest from "App/Models/Reports/Arrest";
import Twitter from "App/Services/Twitter/Twitter";
import ArrestStatus from "App/Models/Reports/ArrestStatus";

export default class StoreArrest {
  async handle(
    { name, location, officer, handle }: typeof StoreArrestValidator.props,
    auth?: AuthContract
  ) {
    var twitterUser = "";
    if (handle) {
      twitterUser = (await new Twitter().getUserByHandle(handle)).id_str;
    }

    const arrestStatus = await ArrestStatus.findByOrFail("code", "reported");

    const arrest = await Arrest.create({
      name,
      location,
      officer,
      twitterUser,
      arrestStatusId: arrestStatus.id,
      createdBy: auth?.user?.id
    });

    return arrest;
  }
}
