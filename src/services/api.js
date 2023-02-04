const axios = require("axios");

const randomUser = axios.create({
    baseURL: "https://randomuser.me/"
});

module.exports = randomUser;