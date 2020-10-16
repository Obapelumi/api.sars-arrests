import User from "App/Models/People/User";
import CtxExtendContract from "Contracts/ctxExtend";
import { Exception } from "@poppinss/utils";

export default class OAuthController {
  async index({ response }: CtxExtendContract) {
    return response.json({
      message: "Hi! Spread Peace :)"
    });
  }

  async userLogin({ auth, validator }: CtxExtendContract) {
    const { username, password } = await validator.validate({
      username: validator.schema.string(),
      password: validator.schema.string()
    });

    const token = await auth.use("api").attempt(username, password);

    try {
      await User.query()
        .where("active", true)
        .where("email", username)
        .orWhere("phone", username)
        .firstOrFail();
    } catch (error) {
      throw new Exception("user account has been suspended", 403);
    }

    return token.toJSON();
  }

  async userLogout({ auth, response }) {
    await auth.use("api").logout();

    return response.json({
      message: "user logged out"
    });
  }

  async me({ request, response, auth }: CtxExtendContract) {
    const { relationships = [] } = request.get();

    var query = User.query().where("id", auth.user ? auth.user.id : 0);

    for (const relationship of relationships) query.preload(relationship);

    const user = await query.firstOrFail();

    return response.json({ user });
  }
}
