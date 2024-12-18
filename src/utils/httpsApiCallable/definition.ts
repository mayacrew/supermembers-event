import { ApiFunctionConfig, Request } from './common';

export interface ApiFunctionParams {
  getYearEnd2024ByHashId: Request<{}, { hashId: string }, {}>;
}

const apiFunctions: Record<string, ApiFunctionConfig> = {
  getYearEnd2024ByHashId: {
    method: 'get',
    pathTemplate: '/event/2024-year-end-summary',
  },
} as const;

export { apiFunctions };
