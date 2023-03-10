import axios from "axios";

export const API = axios.create({
  baseURL: "https://private-anon-1007403a9b-halfwineaid.apiary-proxy.com",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};
