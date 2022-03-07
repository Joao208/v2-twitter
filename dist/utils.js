const __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { default: mod };
};
Object.defineProperty(exports, '__esModule', { value: true });
exports.getApi = exports.getArrayFields = exports.checkFields = exports.getParams = exports.returnPromise = void 0;
const axios_1 = __importDefault(require('axios'));

const returnPromise = function (req) {
  return new Promise((resolve) => {
    req.on('response', () => {
      req.on('data', (chunk) => {
        resolve(JSON.parse(chunk.toString()));
      });
    });
  });
};
exports.returnPromise = returnPromise;
const getParams = function (arrayToCheck, objOfFields, isQueryParams) {
  if (isQueryParams === void 0) { isQueryParams = false; }
  const params = [];
  for (let _i = 0, arrayToCheck_1 = arrayToCheck; _i < arrayToCheck_1.length; _i++) {
    const _a = arrayToCheck_1[_i]; const fieldName = _a[0]; const
      fieldValues = _a[1];
    params.push(`${(params.length || isQueryParams ? '&' : '?')
            + objOfFields[fieldName]
    }=${
      fieldValues.join(',')}`);
  }
  return params;
};
exports.getParams = getParams;
const checkFields = function (fields, isQueryParams) {
  const queryInit = isQueryParams ? '&' : '?';
  return (fields === null || fields === void 0 ? void 0 : fields.length) ? ''.concat(queryInit, 'user.fields=') + fields.join('&') : '';
};
exports.checkFields = checkFields;
const getArrayFields = function (fields) {
  return fields ? Object.entries(fields) : [];
};
exports.getArrayFields = getArrayFields;
const getApi = function (_a) {
  const { baseURL } = _a;
  const { BearerToken } = _a;
  const { objectKeys } = _a;
  const api = axios_1.default.create({
    baseURL,
    timeout: 30000,
    headers: { Authorization: 'Bearer '.concat(BearerToken) },
  });
  if (objectKeys.includes('BearerToken')) {
    api.interceptors.request.use((options) => {
      if (!(options === null || options === void 0 ? void 0 : options.headers)) return options;
      options.headers.Authorization = 'Bearer '.concat(BearerToken);
      return options;
    });
  }
  return api;
};
exports.getApi = getApi;
