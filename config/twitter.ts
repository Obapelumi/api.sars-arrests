import Env from "@ioc:Adonis/Core/Env";

export const apiKey: string = Env.getOrFail("TWITTER_API_KEY") as string;

export const apiSecret: string = Env.getOrFail("TWITTER_API_SECRET") as string;

export const appHandle: string = Env.getOrFail("TWITTER_HANDLE") as string;

export const baseUrl: string = Env.getOrFail("TWITTER_URL") as string;

export const bearerToken: string = Env.getOrFail(
  "TWITTER_BEARER_TOKEN"
) as string;

export const callbackUrl: string = Env.getOrFail(
  "TWITTER_CALLBACK_URL"
) as string;

export const requestUrl: string = `${baseUrl}/1.1`;
