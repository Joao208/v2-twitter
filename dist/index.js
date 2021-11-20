"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var request_1 = __importDefault(require("request"));
// TODO realtime https://www.youtube.com/watch?v=PjjjhGW4ceM
var TwitterApi = /** @class */ (function () {
    function TwitterApi(data) {
        var _this = this;
        var BearerToken = data.BearerToken, ConsumerKey = data.ConsumerKey, ConsumerSecret = data.ConsumerSecret, AcessToken = data.AcessToken, AcessSecret = data.AcessSecret;
        var array = [
            "ConsumerKey",
            "ConsumerSecret",
            "AcessToken",
            "AcessSecret",
        ];
        var objectKeys = Object.keys(data);
        if (!objectKeys.includes("BearerToken") && objectKeys !== array) {
            throw new Error("Ao menos um método de login é necessário");
        }
        var baseURL = "https://api.twitter.com/2";
        var api = axios_1.default.create({
            baseURL: baseURL,
            timeout: 30000,
            headers: { Authorization: "Bearer ".concat(BearerToken) },
        });
        if (objectKeys.includes("BearerToken")) {
            api.interceptors.request.use(function (options) {
                if (!(options === null || options === void 0 ? void 0 : options.headers))
                    return options;
                options.headers.Authorization = "Bearer ".concat(BearerToken);
                return options;
            });
        }
        var getParams = function (array, obj, isQueryParams) {
            if (isQueryParams === void 0) { isQueryParams = false; }
            var params = [];
            for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
                var _a = array_1[_i], fieldName = _a[0], fieldValues = _a[1];
                params.push((params.length || isQueryParams ? "&" : "?") +
                    obj[fieldName] +
                    "=" +
                    fieldValues.join(","));
            }
            return params;
        };
        var getPayload = function (params) {
            return __assign({ oauth: {
                    consumer_key: _this.ConsumerKey,
                    consumer_secret: _this.ConsumerSecret,
                    token: _this.AcessToken,
                    token_secret: _this.AcessSecret,
                    timestamp: Math.floor(new Date().getTime() / 1000),
                } }, params);
        };
        var obj = {
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
    TwitterApi.prototype.getUserByUsername = function (username, fields) {
        return __awaiter(this, void 0, void 0, function () {
            var params, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = (fields === null || fields === void 0 ? void 0 : fields.length) ? "?user.fields=" + fields.join("&") : "";
                        return [4 /*yield*/, this.api
                                .get("/users/by/username/".concat(username).concat(params))
                                .catch(function (error) {
                                var _a;
                                throw new Error(JSON.stringify((_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data));
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response === null || response === void 0 ? void 0 : response.data];
                }
            });
        });
    };
    TwitterApi.prototype.getUsersByUsersname = function (usernames, fields) {
        return __awaiter(this, void 0, void 0, function () {
            var params, usernamesFormated, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = (fields === null || fields === void 0 ? void 0 : fields.length) ? "&user.fields=" + fields.join("&") : "";
                        usernamesFormated = usernames.join(",");
                        return [4 /*yield*/, this.api
                                .get("/users/by?usernames=".concat(usernamesFormated).concat(params))
                                .catch(function (error) {
                                var _a;
                                throw new Error(JSON.stringify((_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data));
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response === null || response === void 0 ? void 0 : response.data];
                }
            });
        });
    };
    TwitterApi.prototype.getUserById = function (id, fields) {
        return __awaiter(this, void 0, void 0, function () {
            var params, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = (fields === null || fields === void 0 ? void 0 : fields.length) ? "?user.fields=" + fields.join("&") : "";
                        return [4 /*yield*/, this.api
                                .get("/users/".concat(id).concat(params))
                                .catch(function (error) {
                                var _a;
                                throw new Error(JSON.stringify((_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data));
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response === null || response === void 0 ? void 0 : response.data];
                }
            });
        });
    };
    TwitterApi.prototype.getUsersById = function (id, fields) {
        return __awaiter(this, void 0, void 0, function () {
            var params, ids, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = (fields === null || fields === void 0 ? void 0 : fields.length) ? "&user.fields=" + fields.join("&") : "";
                        ids = id.join(",");
                        return [4 /*yield*/, this.api
                                .get("/users?ids=".concat(ids).concat(params))
                                .catch(function (error) {
                                var _a;
                                throw new Error(JSON.stringify((_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data));
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response === null || response === void 0 ? void 0 : response.data];
                }
            });
        });
    };
    TwitterApi.prototype.getSingleTweet = function (id, fields) {
        return __awaiter(this, void 0, void 0, function () {
            var arrayFields, params, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        arrayFields = fields ? Object.entries(fields) : [];
                        params = this.getParams(arrayFields, this.obj);
                        return [4 /*yield*/, this.api
                                .get("/tweets/".concat(id).concat(params.join("")))
                                .catch(function (error) {
                                var _a;
                                throw new Error(JSON.stringify((_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data));
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response === null || response === void 0 ? void 0 : response.data];
                }
            });
        });
    };
    TwitterApi.prototype.getMultipleTweets = function (id, fields) {
        return __awaiter(this, void 0, void 0, function () {
            var arrayFields, ids, params, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        arrayFields = fields ? Object.entries(fields) : [];
                        ids = id.join(",");
                        params = this.getParams(arrayFields, this.obj, true);
                        return [4 /*yield*/, this.api
                                .get("/tweets?ids=".concat(ids).concat(params.join("")))
                                .catch(function (error) {
                                var _a;
                                throw new Error(JSON.stringify((_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data));
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response === null || response === void 0 ? void 0 : response.data];
                }
            });
        });
    };
    TwitterApi.prototype.getTimelineByUserId = function (id, fields) {
        return __awaiter(this, void 0, void 0, function () {
            var arrayFields, params, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        arrayFields = fields ? Object.entries(fields) : [];
                        params = this.getParams(arrayFields, this.obj);
                        return [4 /*yield*/, this.api
                                .get("/users/".concat(id, "/tweets").concat(params.join("")))
                                .catch(function (error) {
                                var _a;
                                throw new Error(JSON.stringify((_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data));
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response === null || response === void 0 ? void 0 : response.data];
                }
            });
        });
    };
    TwitterApi.prototype.createTweet = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var req;
            return __generator(this, function (_a) {
                req = request_1.default.post(
                // @ts-ignore
                this.getPayload({ body: body, json: true, url: "".concat(this.baseURL, "/tweets") }));
                return [2 /*return*/, new Promise(function (resolve) {
                        req.on("response", function () {
                            req.on("data", function (chunk) {
                                resolve(JSON.parse(chunk.toString()));
                            });
                        });
                    })];
            });
        });
    };
    TwitterApi.prototype.deleteTweet = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var req;
            return __generator(this, function (_a) {
                req = request_1.default.delete(
                // @ts-ignore
                this.getPayload({ url: "".concat(this.baseURL, "/tweets/").concat(id) }));
                return [2 /*return*/, new Promise(function (resolve) {
                        req.on("response", function () {
                            req.on("data", function (chunk) {
                                resolve(JSON.parse(chunk.toString()));
                            });
                        });
                    })];
            });
        });
    };
    TwitterApi.prototype.getFollowersById = function (id, fields) {
        return __awaiter(this, void 0, void 0, function () {
            var arrayFields, params, _i, arrayFields_1, _a, fieldName, fieldValues, obj, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        arrayFields = fields ? Object.entries(fields) : [];
                        params = [];
                        for (_i = 0, arrayFields_1 = arrayFields; _i < arrayFields_1.length; _i++) {
                            _a = arrayFields_1[_i], fieldName = _a[0], fieldValues = _a[1];
                            obj = {
                                pagination: "pagination_token",
                                max: "max_results",
                            };
                            params.push((params.length ? "&" : "?") + obj[fieldName] + "=" + fieldValues);
                        }
                        return [4 /*yield*/, this.api
                                .get("/users/".concat(id, "/followers").concat(params.join("")))
                                .catch(function (error) {
                                var _a;
                                throw new Error(JSON.stringify((_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data));
                            })];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, response === null || response === void 0 ? void 0 : response.data];
                }
            });
        });
    };
    TwitterApi.prototype.followUserId = function (yourId, id) {
        return __awaiter(this, void 0, void 0, function () {
            var req;
            return __generator(this, function (_a) {
                req = request_1.default.post(
                // @ts-ignore
                this.getPayload({
                    body: {
                        target_user_id: id,
                    },
                    json: true,
                    url: "".concat(this.baseURL, "/users/").concat(yourId, "/following"),
                }));
                return [2 /*return*/, new Promise(function (resolve) {
                        req.on("response", function () {
                            req.on("data", function (chunk) {
                                resolve(JSON.parse(chunk.toString()));
                            });
                        });
                    })];
            });
        });
    };
    TwitterApi.prototype.unfollowUserId = function (yourId, id) {
        return __awaiter(this, void 0, void 0, function () {
            var req;
            return __generator(this, function (_a) {
                req = request_1.default.delete(
                // @ts-ignore
                this.getPayload({
                    url: "".concat(this.baseURL, "/users/").concat(yourId, "/following/").concat(id),
                }));
                return [2 /*return*/, new Promise(function (resolve) {
                        req.on("response", function () {
                            req.on("data", function (chunk) {
                                resolve(JSON.parse(chunk.toString()));
                            });
                        });
                    })];
            });
        });
    };
    TwitterApi.prototype.followUsername = function (yourUserName, username) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var userToFollow, yourUser;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.getUserByUsername(username)];
                    case 1:
                        userToFollow = _c.sent();
                        return [4 /*yield*/, this.getUserByUsername(yourUserName)];
                    case 2:
                        yourUser = _c.sent();
                        return [2 /*return*/, this.followUserId((_a = yourUser === null || yourUser === void 0 ? void 0 : yourUser.data) === null || _a === void 0 ? void 0 : _a.id, (_b = userToFollow === null || userToFollow === void 0 ? void 0 : userToFollow.data) === null || _b === void 0 ? void 0 : _b.id)];
                }
            });
        });
    };
    TwitterApi.prototype.unfolowUsername = function (yourUserName, username) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var userToFollow, yourUser;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.getUserByUsername(username)];
                    case 1:
                        userToFollow = _c.sent();
                        return [4 /*yield*/, this.getUserByUsername(yourUserName)];
                    case 2:
                        yourUser = _c.sent();
                        return [2 /*return*/, this.unfollowUserId((_a = yourUser === null || yourUser === void 0 ? void 0 : yourUser.data) === null || _a === void 0 ? void 0 : _a.id, (_b = userToFollow === null || userToFollow === void 0 ? void 0 : userToFollow.data) === null || _b === void 0 ? void 0 : _b.id)];
                }
            });
        });
    };
    return TwitterApi;
}());
exports.default = TwitterApi;
