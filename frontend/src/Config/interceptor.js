import axios from 'axios';

export const authBaseUrl = 'https://api.gethikma.com/web/';
export const baseUrl = 'https://api.gethikma.com/main/';
export const socketUrl = 'https://api.gethikma.com/';

// export const authBaseUrl = 'http://10.40.5.53:4041/api/';
// export const baseUrl = 'http://10.40.5.53:4040/api/';
// export const socketUrl = 'http://10.40.5.53:4042/';

// axios interceptor
export const interceptor = (providedURL) => {
  axios.defaults.baseURL = providedURL || baseUrl;
  axios.interceptors.request.use(
    function (config) {
      return config;
    },
    function (error) {
      return Promise.reject(error);
    },
  );
  axios.interceptors.response.use(
    function (response) {
      // console.log('response', response)
      return response;
    },
    function (error) {
      return Promise.reject(error);
    },
  );
};