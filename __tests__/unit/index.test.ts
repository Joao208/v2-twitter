import TwitterApi from "../../src/index";
import axios from "axios";
import request from "request";

jest.mock("axios");
jest.mock("request");

describe("Twitter Class", () => {
  let app;

  beforeAll(() => {
    // @ts-ignore
    axios.create.mockImplementation(() => ({
      get: jest.fn().mockReturnValue({
        data: { mocked: true },
        catch: jest.fn().mockReturnValue({ data: { mocked: true } }),
      }),
    }));

    // @ts-ignore
    request.post.mockImplementation(() => ({
      on: jest.fn((type, callback) => callback({ mocked: true })),
    }));

    // @ts-ignore
    request.delete.mockImplementation(() => ({
      on: jest.fn((type, callback) => callback({ mocked: true })),
    }));

    app = new TwitterApi({ BearerToken: "" });
  });

  describe("Should be test with bearer token", () => {
    it("Should be defined", () => {
      expect(new TwitterApi({ BearerToken: "" })).toBeDefined();
    });

    it("Should be get user by username", async () => {
      const response = await app.getUserByUsername("TwitterDev", [
        "profile_image_url",
      ]);

      expect(response.data.mocked).toBe(true);
    });

    it("Should be get users by usernames", async () => {
      const response = await app.getUsersByUsersname(
        ["TwitterDev"],
        ["picture"]
      );

      expect(response.data.mocked).toBe(true);
    });

    it("Should be get user by user id", async () => {
      const response = await app.getUserById("2244994945", [
        "profile_image_url",
      ]);

      expect(response.data.mocked).toBe(true);
    });

    it("Should be get user by users ids", async () => {
      const response = await app.getUsersById(
        ["2244994945"],
        ["profile_image_url"]
      );

      expect(response.data.mocked).toBe(true);
    });

    it("Should be get tweet by id", async () => {
      const response = await app.getSingleTweet("2244994945", {
        media: ["profile_image_url"],
      });

      expect(response.data.mocked).toBe(true);
    });

    it("Should be get multiple tweets by id", async () => {
      const response = await app.getMultipleTweets(["2244994945"], {
        media: ["profile_image_url"],
      });

      expect(response.data.mocked).toBe(true);
    });

    it("Should be get timeline by user id", async () => {
      const response = await app.getTimelineByUserId("2244994945", {
        media: ["profile_image_url"],
      });

      expect(response.data.mocked).toBe(true);
    });

    it("Should be get followers by user id", async () => {
      const response = await app.getFollowersById("2244994945", { max: 1 });

      expect(response.data.mocked).toBe(true);
    });
  });

  describe("Should be test with oauth", () => {
    it("Should be create tweet", async () => {
      const response = await app.createTweet({ text: "Hello!" });

      expect(response).toBe({ mocked: true }.toString());
    });

    it("Should be delete tweet", async () => {
      const response = await app.deleteTweet("2244994945");

      expect(response).toBe({ mocked: true }.toString());
    });

    it("Should be follow user by id", async () => {
      const response = await app.followUserId("2244994945", "2244994945");

      expect(response).toBe({ mocked: true }.toString());
    });

    it("Should be unfollow user by id", async () => {
      const response = await app.unfollowUserId("2244994945", "2244994945");

      expect(response).toBe({ mocked: true }.toString());
    });

    it("Should be follow user by username", async () => {
      const response = await app.followUsername("TwitterDev", "TwitterDev");

      expect(response).toBe({ mocked: true }.toString());
    });

    it("Should be unfollow user by username", async () => {
      const response = await app.unfolowUsername("TwitterDev", "TwitterDev");

      expect(response).toBe({ mocked: true }.toString());
    });
  });

  describe("Should be test validations", () => {
    expect.assertions(3);

    try {
      new TwitterApi({});
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe("Ao menos um parâmetro de login é necessário");
    }
  });
});
