import axios from 'axios';

export const postRequest = async (config) => {
  const { url, data, options } = config;
  return axios
    .post(url, data, options)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const putRequest = async (config) => {
  const { url, data, options } = config;
  return axios
    .put(url, data, options)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const getRequest = async (config) => {
  const { url, options } = config;
  return axios
    .get(url, options)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};
