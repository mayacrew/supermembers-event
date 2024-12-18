import axios from 'axios';
import { buildQueryString } from '../index';
import { ApiFunctionParams, apiFunctions } from './definition';

async function httpsApiCallable<
  T extends keyof typeof apiFunctions & keyof ApiFunctionParams
>(
  functionName: T,
  funcParams: ApiFunctionParams[T]
): Promise<{ success: boolean; data: any; error: any }> {
  const config = apiFunctions[functionName];
  const { params = {}, body = {}, queries = {} } = funcParams;
  const url = config.pathTemplate.replace(
    /\$\{params\.(\w+)\}/g,
    (_, p1) => params[p1 as keyof typeof params]
  );

  const queryString = buildQueryString(queries);

  try {
    const result = await axios({
      method: config.method,
      url: `${import.meta.env.VITE_BASE_URL}${url}${
        queryString ? `?${queryString}` : ''
      }`,
      data: config.method !== 'get' ? body : undefined,
    });
    return {
      success: result.data.success,
      data: result.data.data,
      error: result.data.error,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return {
          success: error.response.data.success,
          data: error.response.data.data,
          error: error.response.data.error,
        };
      } else if (error.request) {
        console.error('No response:', error.request);
        return {
          success: false,
          data: null,
          error: {
            code: 'NETWORK_ERROR',
            message: 'request not responded',
          },
        };
      } else {
        console.error('An unexpected error occurred (network):', error);
        return {
          success: false,
          data: null,
          error: {
            code: 'INTERNAL_SERVER_ERROR',
            message: 'An unexpected error occurred (network)',
          },
        };
      }
    } else {
      console.error('An unexpected error occurred:', error);
      return {
        success: false,
        data: null,
        error: {
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An unexpected error occurred',
        },
      };
    }
  }
}
export default httpsApiCallable;
