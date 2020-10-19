// import Axios, { AxiosInstance } from "axios";
import { AuthContract } from "@ioc:Adonis/Addons/Auth";
import TwitterToken from "App/Models/Auth/TwitterToken";
import User from "App/Models/People/User";
import Tweep from "App/Models/Tweep";
import { apiKey, apiSecret, baseUrl, callbackUrl } from "Config/twitter";
import { OAuth } from "oauth";
import Twitter from "./Twitter";

export default class AuthProvider {
  private $oauth: any;

  public constructor() {
    this.$oauth = new OAuth(
      `${baseUrl}/oauth/request_token`,
      `${baseUrl}/oauth/access_token`,
      apiKey,
      apiSecret,
      "1.0A",
      callbackUrl,
      "HMAC-SHA1"
    );
  }

  public async authenticate({
    auth,
    token,
    verifier
  }: {
    auth: AuthContract;
    token: string;
    verifier: string;
  }) {
    const twitterToken = await TwitterToken.findByOrFail("requestToken", token);

    const { token: accessToken, secret, results } = await this.getAccessToken({
      token: twitterToken.requestToken,
      secret: twitterToken.requestSecret,
      verifier
    });

    var tweep = await Tweep.updateOrCreate(
      { twitterAccount: Number(results.user_id) },
      {
        twitterHandle: results.screen_name,
        token: accessToken,
        tokenSecret: secret
      }
    );

    const twitterUser = await new Twitter().getUserByHandle(
      results.screen_name
    );

    const user = await User.updateOrCreate(
      { twitterAccount: twitterUser.id },
      { name: "twitterUser.name" }
    );

    tweep.userId = user.id;
    tweep.save();

    const bearerToken = await auth.use("api").login(user);

    return { bearerToken, tweep, user };
  }

  public geRequestToken(): Promise<{ token: string; secret: string }> {
    return new Promise((resolve, reject) => {
      this.$oauth.getOAuthRequestToken((error, token, secret) => {
        if (error) return reject(error);
        return resolve({ token, secret });
      });
    });
  }

  public getAccessToken({
    token,
    secret,
    verifier
  }): Promise<{
    token: string;
    secret: string;
    results: { user_id: string; screen_name: string };
  }> {
    return new Promise((resolve, reject) => {
      this.$oauth.getOAuthAccessToken(
        token,
        secret,
        verifier,
        (error, token, secret, results) => {
          if (error) return reject(error);
          return resolve({ token, secret, results });
        }
      );
    });
  }
}
