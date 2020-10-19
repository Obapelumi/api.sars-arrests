import { AuthContract } from "@ioc:Adonis/Addons/Auth";
import Arrest from "App/Models/Reports/Arrest";
import ArrestStatus from "App/Models/Reports/ArrestStatus";
import Twitter from "App/Services/Twitter/Twitter";
import UpdateArrestValidator from "App/Validators/Reports/UpdateArrestValidator";
import StoreArrestLog from "./StoreArrestLog";

export default class UpdateArrest {
  async handle(
    id,
    data: typeof UpdateArrestValidator.props,
    auth: AuthContract
  ) {
    var arrest = await Arrest.findOrFail(id);

    for (const key in data) {
      if (["name", "location", "officer"].includes(key))
        arrest[key] = typeof data[key] != "undefined" ? data[key] : data[key];
    }

    if (data.handle) {
      arrest.twitterAccount = (
        await new Twitter().getUserByHandle(data.handle)
      ).id;
    }

    if (data.status) {
      const arrestStatus = await ArrestStatus.findByOrFail("code", data.status);
      arrest.arrestStatusId = arrestStatus.id;
      await new StoreArrestLog().handle(arrest, `Arrest ${data.status}`, auth);
    }

    await arrest.save();

    return arrest;
  }
}
