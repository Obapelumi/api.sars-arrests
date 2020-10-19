import Comment from "App/Models/Misc/Comment";
import { AuthContract } from "@ioc:Adonis/Addons/Auth";
import User from "App/Models/People/User";

export default class CreateComment {
  async handle(
    {
      title,
      text
    }: {
      title: string;
      text?: string;
    },
    auth?: AuthContract | { user: User }
  ) {
    const comment = await Comment.firstOrCreate(
      { title },
      { createdBy: !auth?.user ? undefined : auth.user.id, text }
    );

    return comment;
  }
}
