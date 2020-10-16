import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import ArrestStatusSeeder from "Database/seeders-store/ArrestStatus";

export default class DatabaseSeeder extends BaseSeeder {
  public async run() {
    await ArrestStatusSeeder.run();
  }
}
