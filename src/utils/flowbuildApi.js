require('dotenv').config();
const axios = require('axios');

const flowbuildApi = axios.create({
  baseURL: process.env.FLOWBUILD_URL,
  headers: { 'Authorization': `Bearer ${process.env.FLOWBUILD_TOKEN}`}
});

module.exports = {
  flowbuildApi
}