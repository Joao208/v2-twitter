import axios, { AxiosInstance } from "axios";
import { Fields, FieldsFollowers, ParamsInterface } from "./types";
import request from "request";

// TODO tests
// TODO documentation
// TODO oauth feito, só falta finalizar
// TODO other methods
// TODO npm workflow
// TODO realtime https://www.youtube.com/watch?v=PjjjhGW4ceM
// TODO refatorar e splitar funções repetitivas
class TwitterApi {
  BearerToken: string | undefined;
  ConsumerKey: string | undefined;
  ConsumerSecret: string | undefined;
  AcessToken: string | undefined;
  AcessSecret: string | undefined;
  api: AxiosInstance;
  baseURL: string;

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

    this.api = api;
    this.baseURL = baseURL;
    this.BearerToken = BearerToken;
    this.ConsumerKey = ConsumerKey;
    this.ConsumerSecret = ConsumerSecret;
    this.AcessToken = AcessToken;
    this.AcessSecret = AcessSecret;
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
    const params = fields?.length ? "?user.fields=" + fields.join("&") : "";
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
    const params = fields?.length ? "?user.fields=" + fields.join("&") : "";
    const ids = id.join(",");

    return this.api.get(`/users?ids=${ids}${params}`).catch((error) => {
      throw new Error(JSON.stringify(error?.response?.data));
    });
  }

  async getSingleTweet(id: string, fields?: Fields) {
    const arrayFields = fields ? Object.entries(fields) : [];

    const params = [];

    for (const [fieldName, fieldValues] of arrayFields) {
      const obj = {
        user: "user.fields",
        tweet: "tweet.fields",
        expansions: "expansions",
        media: "media.fields",
      } as { [key: string]: string };

      params.push(
        (params.length ? "&" : "?") +
          obj[fieldName] +
          "=" +
          fieldValues.join(",")
      );
    }

    return this.api.get(`/tweets/${id}${params.join("")}`).catch((error) => {
      throw new Error(JSON.stringify(error?.response?.data));
    });
  }

  async getMultipleTweets(id: Array<string>, fields?: Fields) {
    const arrayFields = fields ? Object.entries(fields) : [];
    const ids = id.join(",");

    const params = [];

    for (const [fieldName, fieldValues] of arrayFields) {
      const obj = {
        user: "user.fields",
        tweet: "tweet.fields",
        expansions: "expansions",
        media: "media.fields",
      } as { [key: string]: string };

      params.push("&" + obj[fieldName] + "=" + fieldValues.join(","));
    }

    return this.api
      .get(`/tweets?ids=${ids}${params.join("")}`)
      .catch((error) => {
        throw new Error(JSON.stringify(error?.response?.data));
      });
  }

  async getTimelineByUserId(id: string, fields?: Fields) {
    const arrayFields = fields ? Object.entries(fields) : [];

    const params = [];

    for (const [fieldName, fieldValues] of arrayFields) {
      const obj = {
        user: "user.fields",
        tweet: "tweet.fields",
        expansions: "expansions",
        media: "media.fields",
      } as { [key: string]: string };

      params.push(
        (params.length ? "&" : "?") +
          obj[fieldName] +
          "=" +
          fieldValues.join(",")
      );
    }

    return this.api
      .get(`/users/${id}/tweets${params.join("")}`)
      .catch((error) => {
        throw new Error(JSON.stringify(error?.response?.data));
      });
  }

  async getMentionsTimeline(id: string) {
    return "In progress";
  }

  async createTweet(body: { text: string }) {
    // TODO entender esse @ts-ignore
    // @ts-ignore
    const req = request.post({
      oauth: {
        consumer_key: this.ConsumerKey,
        consumer_secret: this.ConsumerSecret,
        token: this.AcessToken,
        token_secret: this.AcessSecret,
        timestamp: Math.floor(new Date().getTime() / 1000),
      },
      body,
      json: true,
      url: `${this.baseURL}/tweets`,
    });

    let response;

    req.on("response", function (res) {
      req.on("data", function (chunk) {
        response = chunk.toString("utf8");
      });
    });

    return response;
  }

  async deleteTweet(id: string) {
    // @ts-ignore
    const req = request.delete({
      oauth: {
        consumer_key: this.ConsumerKey,
        consumer_secret: this.ConsumerSecret,
        token: this.AcessToken,
        token_secret: this.AcessSecret,
        timestamp: Math.floor(new Date().getTime() / 1000),
      },
      url: `${this.baseURL}/tweets/${id}`,
    });

    let response;

    req.on("response", function (res) {
      req.on("data", function (chunk) {
        response = chunk.toString("utf8");
      });
    });

    return response;
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

  async followUserId(id: string) {
    // @ts-ignore
    const req = request.post({
      oauth: {
        consumer_key: this.ConsumerKey,
        consumer_secret: this.ConsumerSecret,
        token: this.AcessToken,
        token_secret: this.AcessSecret,
        timestamp: Math.floor(new Date().getTime() / 1000),
      },
      url: `${this.baseURL}/users/${id}/following`,
    });

    let response;

    req.on("response", function (res) {
      req.on("data", function (chunk) {
        response = chunk.toString("utf8");
      });
    });

    // TODO retornar assim não funciona pois ele não espera o req.on
    return response;
  }

  async unfollowUserId(id: string) {
    // TODO entender na documentação os parametros que precisam ser passados
    return "In progress";
  }
}

// Start Test session

const twitter = new TwitterApi({
  BearerToken: "",
  ConsumerKey: "",
  ConsumerSecret: "",
  AcessToken: "",
  AcessSecret: "",
});

twitter.followUserId("1171894501587247104").then((data) => console.log(data));

// End teste session

export { TwitterApi };
