import TwitterApi from "../../src/index";
import axios from "axios";
import request from "request";

jest.mock("axios");
jest.mock("request");

describe("Twitter Class", () => {
  let app;

  const interceptorsReturn = {
    request: {
      use: jest.fn((callback) => callback({ headers: {} })),
    },
  };

  beforeAll(() => {
    // @ts-ignore
    axios.create.mockImplementation(() => ({
      get: jest.fn().mockReturnValue({
        data: { mocked: true },
        catch: jest.fn().mockReturnValue({ data: { mocked: true } }),
      }),
      interceptors: interceptorsReturn,
    }));

    // @ts-ignore
    request.post.mockImplementation(() => ({
      on: jest.fn((type, callback) =>
        callback(Buffer.from(JSON.stringify({ mocked: true })))
      ),
    }));

    // @ts-ignore
    request.delete.mockImplementation(() => ({
      on: jest.fn((type, callback) =>
        callback(Buffer.from(JSON.stringify({ mocked: true })))
      ),
    }));

    app = new TwitterApi({ BearerToken: "" });
  });

  it("Should be defined", () => {
    expect(new TwitterApi({ BearerToken: "" })).toBeDefined();
  });

  describe("Should be test with bearer token", () => {
    it("Should be get user by username", async () => {
      const response = await app.getUserByUsername("TwitterDev", [
        "profile_image_url",
      ]);

      expect(response.mocked).toBe(true);
    });

    it("Should be get users by usernames", async () => {
      const response = await app.getUsersByUsersname(
        ["TwitterDev"],
        ["picture"]
      );

      expect(response.mocked).toBe(true);
    });

    it("Should be get user by user id", async () => {
      const response = await app.getUserById("2244994945", [
        "profile_image_url",
      ]);

      expect(response.mocked).toBe(true);
    });

    it("Should be get user by users ids", async () => {
      const response = await app.getUsersById(
        ["2244994945"],
        ["profile_image_url"]
      );

      expect(response.mocked).toBe(true);
    });

    it("Should be get tweet by id", async () => {
      const response = await app.getSingleTweet("2244994945", {
        media: ["profile_image_url"],
      });

      expect(response.mocked).toBe(true);
    });

    it("Should be get multiple tweets by id", async () => {
      const response = await app.getMultipleTweets(["2244994945"], {
        media: ["profile_image_url"],
      });

      expect(response.mocked).toBe(true);
    });

    it("Should be get timeline by user id", async () => {
      const response = await app.getTimelineByUserId("2244994945", {
        media: ["profile_image_url"],
      });

      expect(response.mocked).toBe(true);
    });

    it("Should be get followers by user id", async () => {
      const response = await app.getFollowersById("2244994945", { max: 1 });

      expect(response.mocked).toBe(true);
    });
  });

  describe("Should be test with oauth", () => {
    it("Should be create tweet", async () => {
      const response = await app.createTweet({ text: "Hello!" });

      expect(response).toStrictEqual({ mocked: true });
    });

    it("Should be delete tweet", async () => {
      const response = await app.deleteTweet("2244994945");

      expect(response).toStrictEqual({ mocked: true });
    });

    it("Should be follow user by id", async () => {
      const response = await app.followUserId("2244994945", "2244994945");

      expect(response).toStrictEqual({ mocked: true });
    });

    it("Should be unfollow user by id", async () => {
      const response = await app.unfollowUserId("2244994945", "2244994945");

      expect(response).toStrictEqual({ mocked: true });
    });

    it("Should be follow user by username", async () => {
      const response = await app.followUsername("TwitterDev", "TwitterDev");

      expect(response).toStrictEqual({ mocked: true });
    });

    it("Should be unfollow user by username", async () => {
      const response = await app.unfolowUsername("TwitterDev", "TwitterDev");

      expect(response).toStrictEqual({ mocked: true });
    });
  });

  describe("Should be test catch errors", () => {
    beforeAll(() => {
      // @ts-ignore
      axios.create.mockImplementation(() => ({
        get: jest.fn().mockReturnValue({
          data: { mocked: true },
          catch: jest.fn((callback) =>
            callback({ response: { data: { error: true } } })
          ),
        }),
        interceptors: {
          request: {
            use: jest.fn((callback) => callback(true)),
          },
        },
      }));

      app = new TwitterApi({
        AcessSecret: "",
        BearerToken: "",
        AcessToken: "",
        ConsumerKey: "",
        ConsumerSecret: "",
      });
    });

    it("Should throw new error in get user by username", async () => {
      expect.assertions(2);

      try {
        await app.getUserByUsername("TwitterDev", ["profile_image_url"]);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe(JSON.stringify({ error: true }));
      }
    });

    it("Should throw new error in get many users by username", async () => {
      expect.assertions(2);

      try {
        await app.getUsersByUsersname(["TwitterDev"], ["picture"]);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe(JSON.stringify({ error: true }));
      }
    });

    it("Should throw new error in get user by user id", async () => {
      expect.assertions(2);

      try {
        await app.getUserById("2244994945", ["profile_image_url"]);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe(JSON.stringify({ error: true }));
      }
    });

    it("Should throw new error in get many user by user id", async () => {
      expect.assertions(2);

      try {
        await app.getUsersById(["2244994945"], ["profile_image_url"]);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe(JSON.stringify({ error: true }));
      }
    });

    it("Should throw new error in get single tweet by id", async () => {
      expect.assertions(2);

      try {
        await app.getSingleTweet("2244994945");
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe(JSON.stringify({ error: true }));
      }
    });

    it("Should throw new error in get multiple tweets by id", async () => {
      expect.assertions(2);

      try {
        await app.getMultipleTweets(["2244994945"], {
          media: ["profile_image_url"],
        });
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe(JSON.stringify({ error: true }));
      }
    });

    it("Should throw new error in get timeline by user id", async () => {
      expect.assertions(2);

      try {
        await app.getTimelineByUserId("2244994945", {
          media: ["profile_image_url"],
        });
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe(JSON.stringify({ error: true }));
      }
    });

    it("Should throw new error in get followers by user id", async () => {
      try {
        await app.getFollowersById("2244994945", { max: 1, pagination: "10" });
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe(JSON.stringify({ error: true }));
      }
    });
  });

  describe("Should be test validations", () => {
    it("Should be pass without add bearer token", () => {
      new TwitterApi({
        AcessSecret: "",
        AcessToken: "",
        ConsumerKey: "",
        ConsumerSecret: "",
      });

      expect(interceptorsReturn.request.use).not.toBeCalled();
    });

    it("Should be throw an error if params is empty", () => {
      expect.assertions(2);

      try {
        new TwitterApi({});
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe("Ao menos um método de login é necessário");
      }
    });
  });
});
