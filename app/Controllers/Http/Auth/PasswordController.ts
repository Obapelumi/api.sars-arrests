import Event from "@ioc:Adonis/Core/Event";
import passwordResetConfig from "Config/passwordReset";
import CtxExtendContract from "Contracts/ctxExtend";
import { Exception } from "@poppinss/utils";
import PasswordReset from "App/Models/Auth/PasswordReset";
import User from "App/Models/People/User";

export default class PasswordController {
  async sendCode({ validator, response }: CtxExtendContract) {
    const { email, phone, type } = await validator.validate({
      email: validator.schema.string.optional({}, [
        validator.rules.exists({ table: "users", column: "email" }),
        validator.rules.requiredWhen("type", "=", "email")
      ]),
      phone: validator.schema.string.optional({}, [
        validator.rules.exists({ table: "users", column: "phone" }),
        validator.rules.requiredWhen("type", "=", "phone")
      ]),
      type: validator.schema.string()
    });

    const user = await User.query()
      .where("email", email ? email : "")
      .orWhere("phone", phone ? phone : "")
      .firstOrFail();

    var resetCode;

    do {
      resetCode = Math.floor(1000 + Math.random() * 9000).toString();
    } while ((await PasswordReset.findBy("code", resetCode)) !== null);

    const oldPasswordResets = await PasswordReset.query().where(
      "user_id",
      user.id
    );

    for (const oldPasswordReset of oldPasswordResets)
      await oldPasswordReset.delete();

    PasswordReset.create({
      userId: user.id,
      code: resetCode
    });

    Event.emit("password/reset-code-generated", { user, resetCode, type });

    return response.json({
      status: true,
      message: `a password reset code has been sent to your registered ${type}`
    });
  }

  async verifyAndReset({ validator, response, auth }: CtxExtendContract) {
    const { code, password } = await validator.validate({
      code: validator.schema.string(),
      password: validator.schema.string()
    });

    const passwordReset = await PasswordReset.findByOrFail("code", code);

    if (
      passwordReset.createdAt.diffNow().milliseconds >
      passwordResetConfig.timeToExpiry
    ) {
      passwordReset.delete();
      throw new Exception("reset code has expired", 400);
    }

    const user = await User.findByOrFail("id", passwordReset.userId);

    user.password = password;
    await user.save();

    await passwordReset.delete();

    const token = await auth.use("api").login(user);

    return response.json(token);
  }

  async change({ validator, response, auth }: CtxExtendContract) {
    const { password } = await validator.validate({
      password: validator.schema.string()
    });

    var user = await User.findOrFail(auth.user?.id);
    user.password = password;
    await user.save();

    return response.json({
      status: true,
      message: "password change successful"
    });
  }
}
