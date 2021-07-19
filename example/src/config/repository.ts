import React from 'reactn';
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Repository } from 'react3l-common';
import { GlobalState, globalState } from '../app/global-state';

/**
 * @type {AxiosRequestConfig}
 */
export const httpConfig: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
};

/**
 * Transform request
 *
 * @param config {AxiosRequestConfig}
 */
Repository.requestInterceptor = (
  config: AxiosRequestConfig
): AxiosRequestConfig => {
  const { token } = React.getGlobal<GlobalState>();

  try {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
      Cookie: `Token=${token}`,
    };

    // Object.assign(config.headers, {
    //   'X-EndUserProfileId': `${globalState.user.endUserProfiles[0].id}`,
    // });
  } catch (error) {}

  if (config.data instanceof FormData) {
    config.headers['Content-Type'] = 'multipart/form-data';
    return config;
  }

  if (typeof config.data === 'object') {
    config.headers['Content-Type'] = 'application/json';
    config.data = JSON.stringify(config.data);
  }

  return config;
};

/**
 * Transform response data
 *
 * @param response {AxiosResponse}
 */
Repository.responseInterceptor = (
  response: AxiosResponse
): AxiosResponse | Promise<AxiosResponse> => {
  return response;
};

/**
 * Handle request error
 *
 * @param error {AxiosError}
 *
 * @throws {AxiosError}
 */
Repository.errorInterceptor = async (error: AxiosError) => {
  if (error?.response?.status) {
    switch (error.response.status) {
      case 401:
        break;

      case 502:
        break;
    }
  }

  throw error;
};
