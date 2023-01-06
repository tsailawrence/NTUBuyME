import axios from 'axios';

const API_ROOT =
  process.env.NODE_ENV === "production"
    ? "/api"
    : "http://localhost:4000/api";

export const instance = axios.create({ baseURL: API_ROOT });

const WS_URL =
  process.env.NODE_ENV === "production"
    ? window.location.origin.replace(/^http/, "ws")
    : "ws://localhost:8080";

export const ws = new WebSocket(WS_URL);
