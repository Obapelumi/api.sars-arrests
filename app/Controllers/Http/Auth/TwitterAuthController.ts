import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import TwitterToken from "App/Models/Auth/TwitterToken";
import AuthProvider from "App/Services/Twitter/AuthProvider";

export default class TwitterAuthController {
  public async getRequestToken({ response }: HttpContextContract) {
    const { token, secret } = await new AuthProvider().geRequestToken();

    await TwitterToken.create({ requestToken: token, requestSecret: secret });

    return response.json({ status: true, token, secret });
  }

  public async getAccessToken({
    auth,
    request,
    response
  }: HttpContextContract) {
    const { token, verifier } = request.all();

    const { bearerToken, tweep, user } = await new AuthProvider().authenticate({
      auth,
      token,
      verifier
    });

    return response.json({ status: true, token: bearerToken, tweep, user });
  }
}
