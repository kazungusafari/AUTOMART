'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pg = require('pg');

var _dotenv = require('dotenv');

var _dbConfig = require('../../config/dbConfig');

var _dbConfig2 = _interopRequireDefault(_dbConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _dotenv.config)();

var env = process.env.NODE_ENV;
var connect = _dbConfig2.default[env];

var connectionString = connect.connectionString;


var pool = new _pg.Pool({
  connectionString: connectionString
});

exports.default = pool;