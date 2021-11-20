## Twitter V2

[![codecov](https://codecov.io/gh/Joao208/twitter_v2/branch/main/graph/badge.svg?token=YK3MIN9SMX)](https://codecov.io/gh/Joao208/twitter_v2)

Twitter api, using [V2](https://developer.twitter.com/en), for use, create new instance of api, no parameter is necessary, but if you don't pass BearerToken, the others params `ConsumerKey, ConsumerSecret, AcessToken, AcessSecret` are necessary, but you can pass all parameters

```js
import TwitterApi from ''

const twitter = new TwitterApi({
  BearerToken: "",
  ConsumerKey: "",
  ConsumerSecret: "",
  AcessToken: "",
  AcessSecret: "",
});
```
#### Get An User By Username

For get all user informations:, all parameters and fields can be consulted [here](https://developer.twitter.com/en/docs/twitter-api/fields)

```js
twitter
  .getUserByUsername("TwitterDev", ['profile_image_url'])
  .then((data) => console.log(data));
```

#### Get Many Users For Username

For get all user informations for many users:, all parameters and fields can be consulted [here](https://developer.twitter.com/en/docs/twitter-api/fields)

```js
twitter
  .getUsersByUsersname(["TwitterDev"], ['profile_image_url'])
  .then((data) => console.log(data));
```

#### Get User For UserId

For get all user informations by user id:, all parameters and fields can be consulted [here](https://developer.twitter.com/en/docs/twitter-api/fields)

```js
twitter
  .getUserById('2244994945', ['profile_image_url'])
  .then((data) => console.log(data));
```

#### Get Many Users For UserId

For get all user informations by user id for many users:, all parameters and fields can be consulted [here](https://developer.twitter.com/en/docs/twitter-api/fields)

```js
twitter
  .getUsersById(['2244994945'], ['profile_image_url'])
  .then((data) => console.log(data));
```

#### Get Tweet By Id

For get tweet data for tweet id: all parameters and fields can be consulted [here](https://developer.twitter.com/en/docs/twitter-api/fields)

```js
twitter
  .getSingleTweet('2244994945', { tweet: ['text', 'id'] })
  .then((data) => console.log(data));
```

#### Get Many Tweets by Id

For get tweet data for many tweets id: all parameters and fields can be consulted [here](https://developer.twitter.com/en/docs/twitter-api/fields)

```js
twitter
  .getMultipleTweets('2244994945', { tweet: ['text', 'id'] })
  .then((data) => console.log(data));
```

#### Get User Timeline By UserId

For get timeline of user by user id: all parameters and fields can be consulted [here](https://developer.twitter.com/en/docs/twitter-api/fields)

```js
twitter
  .getTimelineByUserId('2244994945', { tweet: ['text', 'id'] })
  .then((data) => console.log(data));
```

#### Create new Tweet

🚨 For post/create new Tweet is necessary oauth login and write access 🚨 <br>
For create new tweet: all parameters and fields can be consulted [here](https://developer.twitter.com/en/docs/twitter-api/fields)

```js
twitter
  .createTweet('2244994945', { tweet: ['text', 'id'] })
  .then((data) => console.log(data));
```

#### Delete Tweet by Id

🚨 For delete Tweet is necessary oauth login and write access 🚨 <br>
For delete tweet:

```js
twitter
  .deleteTweet('2244994945')
  .then((data) => console.log(data));
```

#### Get Followers By UserId

For get all followers for user by id: all parameters and fields can be consulted [here](https://developer.twitter.com/en/docs/twitter-api/fields)

```js
twitter
  .getFollowersById('2244994945', { max:10 })
  .then((data) => console.log(data));
```

#### Follow User 

🚨 For follow user is necessary oauth login and write access 🚨 <br>
For follow a user:

```js
twitter
  .followUserId('2244994945', '2244994945')
  .then((data) => console.log(data));
```

#### Unfollow User

🚨 For unfollow user is necessary oauth login and write access 🚨 <br>
For unfollow a user:

```js
twitter
  .unfollowUserId('2244994945', '2244994945')
  .then((data) => console.log(data));
```

#### Follow User By Username

🚨 For this method necessary oauth login, bearer token and write access 🚨 <br>
For unfollow a user by username:

```js
twitter
  .followUsername('TwitterDev', 'TwitterDev')
  .then((data) => console.log(data));
```

#### Unfollow User By Username

🚨 For this method necessary oauth login, bearer token and write access 🚨 <br>
For unfollow a user by username:

```js
twitter
  .unfolowUsername('TwitterDev', 'TwitterDev')
  .then((data) => console.log(data));
```

##### More methods will come...