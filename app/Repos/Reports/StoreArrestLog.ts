import CreateComment from "App/Repos/Misc/Comment/Create";
import Arrest from "App/Models/Reports/Arrest";
import { AuthContract } from "@ioc:Adonis/Addons/Auth";
import User from "App/Models/People/User";

export default class Create {
  async handle(arrest: Arrest, title, auth?: AuthContract | { user: User }) {
    const comment = await new CreateComment().handle({ title }, auth);

    return await arrest.related("logs").create({
      commentId: comment.id,
      createdBy: arrest.createdBy,
      consultationStatusId: arrest.arrestStatusId
    });
  }
}
