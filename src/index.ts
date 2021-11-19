import axios, { AxiosInstance } from "axios";
import { Fields, ParamsInterface } from "./types";
import request from "request";

// TODO tests
// TODO documentation
// TODO oauth feito, só falta finalizar
// TODO other methods
// TODO npm workflow
// TODO realtime
class TwitterApi {
  BearerToken: string | undefined;
  ConsumerKey: string | undefined;
  ConsumerSecret: string | undefined;
  AcessToken: string | undefined;
  AcessSecret: string | undefined;
  api: AxiosInstance;

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

    const api = axios.create({
      baseURL: "https://api.twitter.com/2",
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

  async createTweet({ text }: { text: string }) {
    // @ts-ignore
    const req = request.post({
      oauth: {
        consumer_key: "",
        consumer_secret: "",
        token: "",
        token_secret: "",
        timestamp: Math.floor(new Date().getTime() / 1000),
      },
      body: { text },
      json: true,
      url: "https://api.twitter.com/2/tweets",
    });

    let response;

    req.on("response", function (res) {
      req.on("data", function (chunk) {
        response = chunk.toString("utf8");
      });
    });

    return response;
  }

  deleteTweet(id: string) {
    return "In progress";
  }

  getFollowersById(id: string) {
    return "In progress";
  }

  followUserId(id: string) {
    return "In progress";
  }

  unfollowUserId(id: string) {
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

twitter.createTweet({ text: "Hello!" });
// .then(({ data }) => console.log(data.includes));

// End teste session

export { TwitterApi };
