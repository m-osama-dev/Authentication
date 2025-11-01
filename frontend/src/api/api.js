// api.js
import axios from 'axios';
const api = axios.create({
  baseURL: 'http://localhost:4000/api',
  withCredentials: true // important to send/receive HttpOnly cookies
});

// store access token in memory
let accessToken = null;
export function setAccessToken(token) { accessToken = token; }
export function getAccessToken() { return accessToken; }

// request interceptor: attach access token
api.interceptors.request.use(cfg => {
  if (accessToken) cfg.headers.Authorization = `Bearer ${accessToken}`;
  return cfg;
});

// response interceptor: try refresh on 401
let isRefreshing = false;
let subscribers = [];

function onRefreshed(token) {
  subscribers.forEach(cb => cb(token));
  subscribers = [];
}

function addSubscriber(cb) {
  subscribers.push(cb);
}

api.interceptors.response.use(
  res => res,
  async err => {
    const original = err.config;
    if (err.response && err.response.status === 401 && !original._retry) {
      if (isRefreshing) {
        // queue the request until token refresh completes
        return new Promise((resolve, reject) => {
          addSubscriber(token => {
            original.headers.Authorization = `Bearer ${token}`;
            resolve(axios(original));
          });
        });
      }

      original._retry = true;
      isRefreshing = true;
      try {
        const r = await api.post('/auth/refresh'); // cookie sent automatically
        const newToken = r.data.accessToken;
        setAccessToken(newToken);
        onRefreshed(newToken);
        isRefreshing = false;
        original.headers.Authorization = `Bearer ${newToken}`;
        return axios(original);
      } catch (refreshErr) {
        isRefreshing = false;
        // redirect to login
        window.location.href = '/login';
        return Promise.reject(refreshErr);
      }
    }
    return Promise.reject(err);
  }
);

export default api;
