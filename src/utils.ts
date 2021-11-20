import axios from "axios";
import { Fields, FieldsFollowers } from "./types";

const returnPromise = (req: any) => {
  return new Promise((resolve) => {
    req.on("response", () => {
      req.on("data", (chunk: Buffer) => {
        resolve(JSON.parse(chunk.toString()));
      });
    });
  });
};

const getParams = (
  arrayToCheck: Array<[string, Array<string>]>,
  objOfFields: { [key: string]: string },
  isQueryParams: boolean = false
) => {
  const params = [];

  for (const [fieldName, fieldValues] of arrayToCheck) {
    params.push(
      (params.length || isQueryParams ? "&" : "?") +
        objOfFields[fieldName] +
        "=" +
        fieldValues.join(",")
    );
  }

  return params;
};

const checkFields = (fields?: Array<string>, isQueryParams?: boolean) => {
  const queryInit = isQueryParams ? "&" : "?";

  return fields?.length ? `${queryInit}user.fields=` + fields.join("&") : "";
};

const getArrayFields = (fields?: Fields | FieldsFollowers) => {
  return fields ? Object.entries(fields) : [];
};

const getApi = ({
  baseURL,
  BearerToken,
  objectKeys,
}: {
  baseURL: string;
  BearerToken?: string;
  objectKeys: Array<string>;
}) => {
  const api = axios.create({
    baseURL,
    timeout: 30000,
    headers: { Authorization: `Bearer ${BearerToken}` },
  });

  if (objectKeys.includes("BearerToken")) {
    api.interceptors.request.use((options) => {
      if (!options?.headers) return options;

      options.headers.Authorization = `Bearer ${BearerToken}`;

      return options;
    });
  }

  return api;
};

export { returnPromise, getParams, checkFields, getArrayFields, getApi };
