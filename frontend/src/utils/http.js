const axios = require('axios');
export const client = axios.create({baseURL: "http://localhost:5000"})
export const ingredient = axios.create({baseURL: "http://localhost:5000"})
export const recipe = axios.create({baseURL: "http://localhost:5000"})