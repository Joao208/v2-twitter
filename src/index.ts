import axios, { AxiosInstance } from "axios";
import { Fields, FieldsFollowers, ParamsInterface } from "./types";
import request from "request";

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
    array: Array<[string, Array<String>]>,
    obj: { [key: string]: string }
  ) => Array<String>;

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

    if (!objectKeys.includes("BearerToken") && objectKeys !== array) {
      throw new Error("Ao menos um parâmetro de login é necessário");
    }

    const baseURL = "https://api.twitter.com/2";

    const api = axios.create({
      baseURL,
      timeout: 30000,
      headers: { Authorization: `Bearer ${BearerToken}` },
    });

    if (!objectKeys.includes("BearerToken")) {
      api.interceptors.request.use((options) => {
        if (!options?.headers) return options;

        options.headers.Authorization = `Bearer ${BearerToken}`;

        return options;
      });
    }

    const getParams = (
      array: Array<[string, Array<String>]>,
      obj: { [key: string]: string }
    ) => {
      const params = [];

      for (const [fieldName, fieldValues] of array) {
        params.push(
          (params.length ? "&" : "?") +
            obj[fieldName] +
            "=" +
            fieldValues.join(",")
        );
      }

      return params;
    };

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
    const params = fields?.length ? "?user.fields=" + fields.join("&") : "";

    return this.api
      .get(`/users/by/username/${username}${params}`)
      .catch((error) => {
        throw new Error(JSON.stringify(error?.response?.data));
      });
  }

  async getUsersByUsersname(usernames: Array<String>, fields?: Array<string>) {
    const params = fields?.length ? "&user.fields=" + fields.join("&") : "";
    const usernamesFormated = usernames.join(",");

    return this.api
      .get(`/users/by?usernames=${usernamesFormated}${params}`)
      .catch((error) => {
        throw new Error(JSON.stringify(error?.response?.data));
      });
  }

  async getUserById(id: string, fields?: Array<string>) {
    const params = fields?.length ? "?user.fields=" + fields.join("&") : "";

    return this.api.get(`/users/${id}${params}`).catch((error) => {
      throw new Error(JSON.stringify(error?.response?.data));
    });
  }

  async getUsersById(id: Array<string>, fields?: Array<string>) {
    const params = fields?.length ? "&user.fields=" + fields.join("&") : "";
    const ids = id.join(",");

    return this.api.get(`/users?ids=${ids}${params}`).catch((error) => {
      throw new Error(JSON.stringify(error?.response?.data));
    });
  }

  async getSingleTweet(id: string, fields?: Fields) {
    const arrayFields = fields ? Object.entries(fields) : [];

    const params = this.getParams(arrayFields, this.obj);

    return this.api.get(`/tweets/${id}${params.join("")}`).catch((error) => {
      throw new Error(JSON.stringify(error?.response?.data));
    });
  }

  async getMultipleTweets(id: Array<string>, fields?: Fields) {
    const arrayFields = fields ? Object.entries(fields) : [];
    const ids = id.join(",");

    const params = this.getParams(arrayFields, this.obj);

    return this.api
      .get(`/tweets?ids=${ids}${params.join("")}`)
      .catch((error) => {
        throw new Error(JSON.stringify(error?.response?.data));
      });
  }

  async getTimelineByUserId(id: string, fields?: Fields) {
    const arrayFields = fields ? Object.entries(fields) : [];

    const params = this.getParams(arrayFields, this.obj);

    return this.api
      .get(`/users/${id}/tweets${params.join("")}`)
      .catch((error) => {
        throw new Error(JSON.stringify(error?.response?.data));
      });
  }

  async createTweet(body: { text: string }) {
    const req = request.post(
      // @ts-ignore
      this.getPayload({ body, json: true, url: `${this.baseURL}/tweets` })
    );

    return new Promise((resolve) => {
      req.on("response", () => {
        req.on("data", (chunk) => {
          resolve(chunk.toString("utf8"));
        });
      });
    });
  }

  async deleteTweet(id: string) {
    const req = request.delete(
      // @ts-ignore
      this.getPayload({ url: `${this.baseURL}/tweets/${id}` })
    );

    return new Promise((resolve) => {
      req.on("response", () => {
        req.on("data", (chunk) => {
          resolve(chunk.toString("utf8"));
        });
      });
    });
  }

  async getFollowersById(id: string, fields?: FieldsFollowers) {
    const arrayFields = fields ? Object.entries(fields) : [];

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

    return this.api
      .get(`/users/${id}/followers${params.join("")}`)
      .catch((error) => {
        throw new Error(JSON.stringify(error?.response?.data));
      });
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

    return new Promise((resolve) => {
      req.on("response", () => {
        req.on("data", (chunk) => {
          resolve(chunk.toString("utf8"));
        });
      });
    });
  }

  async unfollowUserId(yourId: string, id: string) {
    const req = request.delete(
      // @ts-ignore
      this.getPayload({
        url: `${this.baseURL}/users/${yourId}/following/${id}`,
      })
    );

    return new Promise((resolve) => {
      req.on("response", () => {
        req.on("data", (chunk) => {
          resolve(chunk.toString("utf8"));
        });
      });
    });
  }

  async followUsername(yourUserName: string, username: string) {
    const userToFollow = await this.getUserByUsername(username);
    const yourUser = await this.getUserByUsername(yourUserName);

    return this.followUserId(
      yourUser?.data?.data?.id,
      userToFollow?.data?.data?.id
    );
  }

  async unfolowUsername(yourUserName: string, username: string) {
    const userToFollow = await this.getUserByUsername(username);
    const yourUser = await this.getUserByUsername(yourUserName);

    return this.unfollowUserId(
      yourUser?.data?.data?.id,
      userToFollow?.data?.data?.id
    );
  }
}

export default TwitterApi;
