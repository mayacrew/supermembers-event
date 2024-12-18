export interface ApiFunctionConfig {
  method: 'get' | 'post' | 'put' | 'patch' | 'delete';
  pathTemplate: string;
}

export interface Request<Query, Params, Body> {
  queries?: Query;
  params?: Params;
  body?: Body;
}
