import Env from "@ioc:Adonis/Core/Env";

export const baseUrl: string = Env.getOrFail("TWITTER_URL") as string;

export const bearerToken: string = Env.getOrFail(
  "TWITTER_BEARER_TOKEN"
) as string;
