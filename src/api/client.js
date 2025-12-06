// src/api/client.js
import axios from 'axios';

// This is our Axios instance pointing to json-server
export const api = axios.create({
  baseURL: 'http://localhost:4000', // json-server base URL
});
