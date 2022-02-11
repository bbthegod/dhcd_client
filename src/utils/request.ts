import axios, { AxiosResponse } from 'axios';
import { BASE_URL } from 'constants/config';

function parseJSON(response: AxiosResponse) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.data;
}

export async function request(payload) {
  try {
    let instance = axios.create({ baseURL: BASE_URL });
    instance.interceptors.request.use(
      config => config,
      error => Promise.reject(error),
    );
    instance.interceptors.response.use(
      response => response,
      error => Promise.reject(error),
    );
    const response = await instance(payload);
    return { response: parseJSON(response), error: undefined };
  } catch (error) {
    return { response: undefined, error };
  }
}
