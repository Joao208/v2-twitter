import axios, { AxiosInstance } from "axios";
import { Fields, ParamsInterface } from "./types";

// TODO tests
// TODO documentation
// TODO oauth
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
    } else {
      // Start oauth logic, how does oauth with axios?

      api.interceptors.request.use((options) => {
        if (!options?.headers) return options;

        const obj = {};

        options.headers.Authorization = `Bearer ${BearerToken}`;

        return options;
      });

      // End oauth logic
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

  getMentionsTimeline(id: string) {
    return "In progress";
  }

  createTweet({ text }: { text: string }) {
    return "In progress";
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
});

twitter
  .getTimelineByUserId("1171894501587247104", {
    expansions: ["attachments.media_keys"],
    media: ["url"],
  })
  .then(({ data }) => console.log(data.includes));

// End teste session

export { TwitterApi };
