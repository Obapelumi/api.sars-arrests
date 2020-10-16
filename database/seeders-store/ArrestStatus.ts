import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import logger from "@ioc:Adonis/Core/Logger";
import ArrestStatus from "App/Models/Reports/ArrestStatus";

export default class ArrestStatusSeeder extends BaseSeeder {
  public static async run() {
    logger.info("seeding arrest status");

    await ArrestStatus.updateOrCreateMany("code", [
      { code: "reported", name: "Reported" },
      { code: "verified", name: "Verified" },
      { code: "relaesed", name: "Released" },
      { code: "lost", name: "Lost" }
    ]);

    logger.info("done seeding arrest statuses");
  }
}
