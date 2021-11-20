import { AxiosInstance } from "axios";
import { Fields, FieldsFollowers, ParamsInterface } from "./types";
import request from "request";
import {
  checkFields,
  getApi,
  getArrayFields,
  getParams,
  returnPromise,
} from "./utils";

// TODO realtime https://www.youtube.com/watch?v=PjjjhGW4ceM

class TwitterApi {
  obj: { [key: string]: string };
  BearerToken: string | undefined;
  ConsumerKey: string | undefined;
  ConsumerSecret: string | undefined;
  AcessToken: string | undefined;
  AcessSecret: string | undefined;
  api: AxiosInstance;
  baseURL: string;
  getPayload: (params: Object) => Object;
  getParams: (
    arrayToCheck: Array<[string, Array<string>]>,
    objOfFields: { [key: string]: string },
    isQueryParams?: boolean
  ) => Array<string>;
  checkFields: (fields?: Array<string>, isQueryParams?: boolean) => string;
  getArrayFields: (fields?: Fields | FieldsFollowers) => Array<any>;

  constructor(data: ParamsInterface) {
    const {
      BearerToken,
      ConsumerKey,
      ConsumerSecret,
      AcessToken,
      AcessSecret,
    } = data;

    const array = [
      "ConsumerKey",
      "ConsumerSecret",
      "AcessToken",
      "AcessSecret",
    ];

    const objectKeys = Object.keys(data);

    if (
      !objectKeys.includes("BearerToken") &&
      [...array].sort().join(",") !== [...objectKeys].sort().join(",")
    ) {
      throw new Error("Ao menos um método de login é necessário");
    }

    const baseURL = "https://api.twitter.com/2";

    const api = getApi({ baseURL, objectKeys, BearerToken });

    const getPayload = (params: Object) => {
      return {
        oauth: {
          consumer_key: this.ConsumerKey,
          consumer_secret: this.ConsumerSecret,
          token: this.AcessToken,
          token_secret: this.AcessSecret,
          timestamp: Math.floor(new Date().getTime() / 1000),
        },
        ...params,
      };
    };

    const obj = {
      user: "user.fields",
      tweet: "tweet.fields",
      expansions: "expansions",
      media: "media.fields",
    };

    this.getArrayFields = getArrayFields;
    this.checkFields = checkFields;
    this.obj = obj;
    this.getParams = getParams;
    this.api = api;
    this.baseURL = baseURL;
    this.BearerToken = BearerToken;
    this.ConsumerKey = ConsumerKey;
    this.ConsumerSecret = ConsumerSecret;
    this.AcessToken = AcessToken;
    this.AcessSecret = AcessSecret;
    this.getPayload = getPayload;
  }

  async getUserByUsername(username: string, fields?: Array<string>) {
    const params = this.checkFields(fields);

    const response = await this.api
      .get(`/users/by/username/${username}${params}`)
      .catch((error) => {
        throw new Error(JSON.stringify(error?.response?.data));
      });

    return response?.data;
  }

  async getUsersByUsersname(usernames: Array<string>, fields?: Array<string>) {
    const params = this.checkFields(fields, true);
    const usernamesFormated = usernames.join(",");

    const response = await this.api
      .get(`/users/by?usernames=${usernamesFormated}${params}`)
      .catch((error) => {
        throw new Error(JSON.stringify(error?.response?.data));
      });

    return response?.data;
  }

  async getUserById(id: string, fields?: Array<string>) {
    const params = this.checkFields(fields);

    const response = await this.api
      .get(`/users/${id}${params}`)
      .catch((error) => {
        throw new Error(JSON.stringify(error?.response?.data));
      });

    return response?.data;
  }

  async getUsersById(id: Array<string>, fields?: Array<string>) {
    const params = this.checkFields(fields, true);
    const ids = id.join(",");

    const response = await this.api
      .get(`/users?ids=${ids}${params}`)
      .catch((error) => {
        throw new Error(JSON.stringify(error?.response?.data));
      });

    return response?.data;
  }

  async getSingleTweet(id: string, fields?: Fields) {
    const arrayFields = this.getArrayFields(fields);

    const params = this.getParams(arrayFields, this.obj);

    const response = await this.api
      .get(`/tweets/${id}${params.join("")}`)
      .catch((error) => {
        throw new Error(JSON.stringify(error?.response?.data));
      });

    return response?.data;
  }

  async getMultipleTweets(id: Array<string>, fields?: Fields) {
    const arrayFields = this.getArrayFields(fields);
    const ids = id.join(",");

    const params = this.getParams(arrayFields, this.obj, true);

    const response = await this.api
      .get(`/tweets?ids=${ids}${params.join("")}`)
      .catch((error) => {
        throw new Error(JSON.stringify(error?.response?.data));
      });

    return response?.data;
  }

  async getTimelineByUserId(id: string, fields?: Fields) {
    const arrayFields = this.getArrayFields(fields);

    const params = this.getParams(arrayFields, this.obj);

    const response = await this.api
      .get(`/users/${id}/tweets${params.join("")}`)
      .catch((error) => {
        throw new Error(JSON.stringify(error?.response?.data));
      });

    return response?.data;
  }

  async createTweet(body: { text: string }) {
    const req = request.post(
      // @ts-ignore
      this.getPayload({ body, json: true, url: `${this.baseURL}/tweets` })
    );

    return returnPromise(req);
  }

  async deleteTweet(id: string) {
    const req = request.delete(
      // @ts-ignore
      this.getPayload({ url: `${this.baseURL}/tweets/${id}` })
    );

    return returnPromise(req);
  }

  async getFollowersById(id: string, fields?: FieldsFollowers) {
    const arrayFields = this.getArrayFields(fields);

    const params = [];

    for (const [fieldName, fieldValues] of arrayFields) {
      const obj = {
        pagination: "pagination_token",
        max: "max_results",
      } as { [key: string]: string };

      params.push(
        (params.length ? "&" : "?") + obj[fieldName] + "=" + fieldValues
      );
    }

    const response = await this.api
      .get(`/users/${id}/followers${params.join("")}`)
      .catch((error) => {
        throw new Error(JSON.stringify(error?.response?.data));
      });

    return response?.data;
  }

  async followUserId(yourId: string, id: string) {
    const req = request.post(
      // @ts-ignore
      this.getPayload({
        body: {
          target_user_id: id,
        },
        json: true,
        url: `${this.baseURL}/users/${yourId}/following`,
      })
    );

    return returnPromise(req);
  }

  async unfollowUserId(yourId: string, id: string) {
    const req = request.delete(
      // @ts-ignore
      this.getPayload({
        url: `${this.baseURL}/users/${yourId}/following/${id}`,
      })
    );

    return returnPromise(req);
  }

  async followUsername(yourUserName: string, username: string) {
    const userToFollow = await this.getUserByUsername(username);
    const yourUser = await this.getUserByUsername(yourUserName);

    return this.followUserId(yourUser?.data?.id, userToFollow?.data?.id);
  }

  async unfolowUsername(yourUserName: string, username: string) {
    const userToFollow = await this.getUserByUsername(username);
    const yourUser = await this.getUserByUsername(yourUserName);

    return this.unfollowUserId(yourUser?.data?.id, userToFollow?.data?.id);
  }
}

export default TwitterApi;
