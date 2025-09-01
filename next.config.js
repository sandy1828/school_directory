// next.config.js
module.exports = {
  reactStrictMode: true,
  webpack(config) {
    config.resolve.alias["@@"] = __dirname;
    return config;
  },
};
