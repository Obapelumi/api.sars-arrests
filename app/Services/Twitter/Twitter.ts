import Tweep from "App/Models/Tweep";
import Axios, { AxiosInstance, AxiosResponse } from "axios";
import { apiKey, apiSecret, bearerToken, requestUrl } from "Config/twitter";
import Twit from "twit";

export default class Twitter {
  $axios: AxiosInstance;
  $twit: any;

  public constructor(tweep?: Tweep) {
    this.$axios = Axios.create({
      baseURL: requestUrl,
      headers: {
        common: { Authorization: `Bearer ${bearerToken}` }
      }
    });

    if (tweep) {
      this.$twit = new Twit({
        consumer_key: apiKey,
        consumer_secret: apiSecret,
        access_token: tweep.token,
        access_token_secret: tweep.tokenSecret,
        timeout_ms: 60 * 1000
      });
    }
  }

  public async getUserByHandle(
    handle: string,
    dataOnly = true
  ): Promise<AxiosResponse<TwitterUser> & TwitterUser> {
    const response = await this.$axios.get("users/show.json", {
      params: { screen_name: handle }
    });

    return dataOnly ? response.data : response;
  }

  public async tweet(text) {
    const response = await this.$twit.post("statuses/update", {
      status: text
    });

    return response;
  }
}
