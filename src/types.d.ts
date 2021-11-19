export interface ParamsInterface {
  BearerToken?: string;
  ConsumerKey?: string;
  ConsumerSecret?: string;
  AcessToken?: string;
  AcessSecret?: string;
}

export interface Fields {
  user?: Array<string>;
  tweet?: Array<string>;
  expansions?: Array<string>;
  media?: Array<string>;
}
