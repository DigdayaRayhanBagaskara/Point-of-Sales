const dotenv = require("dotenv");
const envFile = process.env.NODE_ENV
  ? `.env.${process.env.NODE_ENV.trim()}`
  : ".env";

dotenv.config({
  path: envFile,
});

const BASE_URL = `${process.env.USE_HTTPS == "true" ? "https" : "http"}://${
  process.env.HOST
}${process.env.PORT == "" ? "" : `:${process.env.PORT}`}`;

let config = {
  BASE_URL: BASE_URL,
  ALLOWED_ORIGIN: ["http://localhost:5173"],
  env: {},
};
for (const property in process.env) {
  config.env[property] = process.env[property];
}

module.exports = config;
