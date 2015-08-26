var config = {};

config.mongoUri = 'mongodb://localhost:27017/users';
config.cookieMaxAge = 1000 * 60 * 60 *24 * 365;

module.exports = config;