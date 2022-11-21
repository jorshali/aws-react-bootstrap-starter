import * as Axios from 'axios';

import { useLogin } from './useLogin';
import { useStores } from './useStores';

const timeout = 15000;

export function useAxios() {
  const { errorStore } = useStores();
  const { getLoggedUser } = useLogin();

  const errorResponseHandler = (error: Error) => {
    errorStore.handleError(error);

    return Promise.reject(error);
  }

  const createUnauthenticatedAxiosInstance = (config?: Axios.AxiosRequestConfig) => {
    const customConfig = config || {};

    const axios = Axios.default.create({
      ...customConfig,
      timeout
    });
    
    // apply interceptor on response
    axios.interceptors.response.use(
      response => response,
      errorResponseHandler
    );

    return axios;
  }

  const createAxiosInstance = async () => {
    const user = await getLoggedUser();

    const axios = Axios.default.create({
      timeout,
      headers: {
        'Authorization': `Bearer ${user.getJwtToken()}`
      }
    });
    
    // apply interceptor on response
    axios.interceptors.response.use(
      response => response,
      errorResponseHandler
    );

    return axios;
  }

  return {
    createUnauthenticatedAxiosInstance,
    createAxiosInstance
  };
}