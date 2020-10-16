import Arrest from "App/Models/Reports/Arrest";
import ArrestStatus from "App/Models/Reports/ArrestStatus";
import Twitter from "App/Services/Twitter/Twitter";
import UpdateArrestValidator from "App/Validators/Reports/UpdateArrestValidator";

export default class UpdateArrest {
  async handle(id, data: typeof UpdateArrestValidator.props) {
    var arrest = await Arrest.findOrFail(id);

    for (const key in data) {
      if (["name", "location", "officer"].includes(key))
        arrest[key] = typeof data[key] != "undefined" ? data[key] : data[key];
    }

    if (data.handle) {
      arrest.twitterUser = (
        await new Twitter().getUserByHandle(data.handle)
      ).id_str;
    }

    if (data.status) {
      const arrestStatus = await ArrestStatus.findByOrFail("code", data.status);
      arrest.arrestStatusId = arrestStatus.id;
    }

    await arrest.save();

    return arrest;
  }
}
