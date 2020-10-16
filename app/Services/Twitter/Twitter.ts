import Axios, { AxiosInstance, AxiosResponse } from "axios";
import { baseUrl, bearerToken } from "Config/twitter";

export default class Twitter {
  $axios: AxiosInstance;

  public constructor() {
    this.$axios = Axios.create({
      baseURL: baseUrl,
      headers: {
        Authorization: `Bearer ${bearerToken}`
      }
    });
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
}
