const axios = require('axios');
export const client = axios.create({baseURL: "http://localhost:5000"})