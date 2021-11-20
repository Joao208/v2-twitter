"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApi = exports.getArrayFields = exports.checkFields = exports.getParams = exports.returnPromise = void 0;
var axios_1 = __importDefault(require("axios"));
var returnPromise = function (req) {
    return new Promise(function (resolve) {
        req.on("response", function () {
            req.on("data", function (chunk) {
                resolve(JSON.parse(chunk.toString()));
            });
        });
    });
};
exports.returnPromise = returnPromise;
var getParams = function (arrayToCheck, objOfFields, isQueryParams) {
    if (isQueryParams === void 0) { isQueryParams = false; }
    var params = [];
    for (var _i = 0, arrayToCheck_1 = arrayToCheck; _i < arrayToCheck_1.length; _i++) {
        var _a = arrayToCheck_1[_i], fieldName = _a[0], fieldValues = _a[1];
        params.push((params.length || isQueryParams ? "&" : "?") +
            objOfFields[fieldName] +
            "=" +
            fieldValues.join(","));
    }
    return params;
};
exports.getParams = getParams;
var checkFields = function (fields, isQueryParams) {
    var queryInit = isQueryParams ? "&" : "?";
    return (fields === null || fields === void 0 ? void 0 : fields.length) ? "".concat(queryInit, "user.fields=") + fields.join("&") : "";
};
exports.checkFields = checkFields;
var getArrayFields = function (fields) {
    return fields ? Object.entries(fields) : [];
};
exports.getArrayFields = getArrayFields;
var getApi = function (_a) {
    var baseURL = _a.baseURL, BearerToken = _a.BearerToken, objectKeys = _a.objectKeys;
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
    return api;
};
exports.getApi = getApi;
