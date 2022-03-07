## Twitter V2

[![v2](https://img.shields.io/endpoint?url=https%3A%2F%2Ftwbadges.glitch.me%2Fbadges%2Fv2)](https://developer.twitter.com/en/docs/twitter-api)
[![codecov](https://codecov.io/gh/Joao208/v2-twitter/branch/main/graph/badge.svg?token=YK3MIN9SMX)](https://codecov.io/gh/Joao208/v2-twitter)
[![Sonarcloud Status](https://sonarcloud.io/api/project_badges/measure?project=Joao208_v2-twitter&metric=alert_status)](https://sonarcloud.io/dashboard?id=Joao208_v2-twitter)

Twitter api, using [V2](https://developer.twitter.com/en), for use, create new instance of api, no parameter is necessary, but if you don't pass BearerToken, the others params `ConsumerKey, ConsumerSecret, AccessToken, AccessSecret` are necessary, but you can pass all parameters

```js
import TwitterApi from 'v2-twitter'

const twitter = new TwitterApi({
  BearerToken: "",
  ConsumerKey: "",
  ConsumerSecret: "",
  AccessToken: "",
  AccessSecret: "",
});
```
#### Get An User By Username

For get all user information's:, all parameters and fields can be consulted [here](https://developer.twitter.com/en/docs/twitter-api/fields)

```js
twitter
  .getUserByUsername("TwitterDev", ['profile_image_url'])
  .then((data) => console.log(data));

// {
//     "data": {
//         "id": "2244994945",
//         "name": "Twitter Dev",
//         "username": "TwitterDev"
//     }
// }
```

#### Get Many Users For Username

For get all user information's for many users:, all parameters and fields can be consulted [here](https://developer.twitter.com/en/docs/twitter-api/fields)

```js
twitter
  .getUsersByUsername(["TwitterDev"], ['profile_image_url'])
  .then((data) => console.log(data));

// {
//     "data": [
//         {
//             "id": "2244994945",
//             "name": "Twitter Dev",
//             "username": "TwitterDev"
//         }
//     ]
// }
```

#### Get User For UserId

For get all user information's by user id:, all parameters and fields can be consulted [here](https://developer.twitter.com/en/docs/twitter-api/fields)

```js
twitter
  .getUserById('2244994945', ['profile_image_url'])
  .then((data) => console.log(data));

// {
//     "data": {
//         "id": "2244994945",
//         "name": "Twitter Dev",
//         "username": "TwitterDev"
//     }
// }
```

#### Get Many Users For UserId

For get all user information's by user id for many users:, all parameters and fields can be consulted [here](https://developer.twitter.com/en/docs/twitter-api/fields)

```js
twitter
  .getUsersById(['2244994945'], ['profile_image_url'])
  .then((data) => console.log(data));

// {
//     "data": [
//         {
//             "id": "2244994945",
//             "name": "Twitter Dev",
//             "username": "TwitterDev"
//         }
//     ]
// }
```

#### Get Tweet By Id

For get tweet data for tweet id: all parameters and fields can be consulted [here](https://developer.twitter.com/en/docs/twitter-api/fields)

```js
twitter
  .getSingleTweet('2244994945', { tweet: ['text', 'id'] })
  .then((data) => console.log(data));

// {
//     "data": {
//         "id": "1461381489115947010",
//         "text": "There’s so much information in Tweets that @SPDJIndices built a stock index around them.\n\nIntroducing the S&amp;P 500 Twitter Sentiment Index, now measuring conversations &amp; $cashtags on the top positively talked about S&amp;P 500 companies. #YourVoiceYourIndex 👇\n\nhttps://t.co/8aKDXpc94r https://t.co/jiIrBDQb2g"
//     }
// }
```

#### Get Many Tweets by Id

For get tweet data for many tweets id: all parameters and fields can be consulted [here](https://developer.twitter.com/en/docs/twitter-api/fields)

```js
twitter
  .getMultipleTweets('2244994945', { tweet: ['text', 'id'] })
  .then((data) => console.log(data));

// {
//     "data": [
//         {
//             "id": "1461381489115947010",
//             "text": "There’s so much information in Tweets that @SPDJIndices built a stock index around them.\n\nIntroducing the S&amp;P 500 Twitter Sentiment Index, now measuring conversations &amp; $cashtags on the top positively talked about S&amp;P 500 companies. #YourVoiceYourIndex 👇\n\nhttps://t.co/8aKDXpc94r https://t.co/jiIrBDQb2g"
//         }
//     ]
// }
```

#### Get User Timeline By UserId

For get timeline of user by user id: all parameters and fields can be consulted [here](https://developer.twitter.com/en/docs/twitter-api/fields)

```js
twitter
  .getTimelineByUserId('2244994945', { tweet: ['text', 'id'] })
  .then((data) => console.log(data));

// {
//     "data": [
//         {
//             "id": "1461381489115947010",
//             "text": "There’s so much information in Tweets that @SPDJIndices built a stock index around them.\n\nIntroducing the S&amp;P 500 Twitter Sentiment Index, now measuring conversations &amp; $cashtags on the top positively talked about S&amp;P 500 companies. #YourVoiceYourIndex 👇\n\nhttps://t.co/8aKDXpc94r https://t.co/jiIrBDQb2g"
//         }
//     ],
//     "meta": {
//         "oldest_id": "1460323748788072449",
//         "newest_id": "1461381489115947010",
//         "result_count": 10,
//         "next_token": "7140dibdnow9c7btw3z3al3eejvt8u5twuupa4vswh54p"
//     }
// }
```

#### Create new Tweet

🚨 For post/create new Tweet is necessary [oauth](https://developer.twitter.com/en/docs/authentication/overview) login and write access 🚨 <br>
For create new tweet: all parameters and fields can be consulted [here](https://developer.twitter.com/en/docs/twitter-api/fields)

```js
twitter
  .createTweet('2244994945', { tweet: ['text', 'id'] })
  .then((data) => console.log(data));

// {
//     "data": {
//         "id": "1461897194655600647",
//         "text": "Hello!"
//     }
// }
```

#### Delete Tweet by Id

🚨 For delete Tweet is necessary [oauth](https://developer.twitter.com/en/docs/authentication/overview) login and write access 🚨 <br>
For delete tweet:

```js
twitter
  .deleteTweet('2244994945')
  .then((data) => console.log(data));

// {
//     "data": {
//         "deleted": true
//     }
// }
```

#### Get Followers By UserId

For get all followers for user by id: all parameters and fields can be consulted [here](https://developer.twitter.com/en/docs/twitter-api/fields)

```js
twitter
  .getFollowersById('2244994945', { max:10 })
  .then((data) => console.log(data));

// {
//     "data": [
//         {
//             "id": "2244994945",
//             "name": "Twitter Dev",
//             "username": "TwitterDev"
//         }
//     ],
//     "meta": {
//         "result_count": 100,
//         "next_token": "76NGG1H6J79HEZZZ"
//     }
// }
```

#### Follow User 

🚨 For follow user is necessary [oauth](https://developer.twitter.com/en/docs/authentication/overview) login and write access 🚨 <br>
Your id on the left, and id to follow in right <br>
For follow a user:

```js
twitter
  .followUserId('2244994945', '2244994945')
  .then((data) => console.log(data));

// {
//     "data": {
//         "following": true,
//         "pending_follow": false
//     }
// }
```

#### Unfollow User

🚨 For unfollow user is necessary [oauth](https://developer.twitter.com/en/docs/authentication/overview) login and write access 🚨 <br>
Your id on the left, and id to unfollow in right <br>
For unfollow a user:

```js
twitter
  .unfollowUserId('2244994945', '2244994945')
  .then((data) => console.log(data));

// {
//     "data": {
//         "following": false
//     }
// }
```

#### Follow User By Username

🚨 For this method necessary [oauth](https://developer.twitter.com/en/docs/authentication/overview) login, bearer token and write access 🚨 <br>
Your username on the left, and username to follow in right <br>
For unfollow a user by username:

```js
twitter
  .followUsername('TwitterDev', 'TwitterDev')
  .then((data) => console.log(data));

// {
//     "data": {
//         "following": true,
//         "pending_follow": false
//     }
// }
```

#### Unfollow User By Username

🚨 For this method necessary [oauth](https://developer.twitter.com/en/docs/authentication/overview) login, bearer token and write access 🚨 <br>
Your username on the left, and username to unfollow in right <br>
For unfollow a user by username:

```js
twitter
  .unfollowUsername('TwitterDev', 'TwitterDev')
  .then((data) => console.log(data));

// {
//     "data": {
//         "following": false
//     }
// }
```

#### V1.1 API Support

This module does not support previous versions of the Twitter API, however it
works well with the following V1.1 modules

[![NPM](https://nodei.co/npm/twitter.png?compact=true)](https://nodei.co/npm/twitter/)

[![NPM](https://nodei.co/npm/twit.png?compact=true)](https://nodei.co/npm/twit/)

##### More methods will come...
