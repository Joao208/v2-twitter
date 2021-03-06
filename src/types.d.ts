export interface ParamsInterface {
  BearerToken?: string
  ConsumerKey?: string
  ConsumerSecret?: string
  AccessToken?: string
  AccessSecret?: string
}

export interface Fields {
  user?: Array<string>
  tweet?: Array<string>
  expansions?: Array<string>
  media?: Array<string>
}

export interface BodyTwitter {
  text: string
}

export interface FieldsFollowers {
  pagination?: string
  max?: number
}
