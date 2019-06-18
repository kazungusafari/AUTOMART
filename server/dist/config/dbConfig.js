'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dotenv = require('dotenv');

(0, _dotenv.config)();

exports.default = {
  development: {
    connectionString: process.env.DEV_DATABASE_URL
  },
  test: {
    connectionString: process.env.TEST_DATABASE_URL
  },
  production: {
    connectionString: process.env.DATABASE_URL
  }
};