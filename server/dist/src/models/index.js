'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _migrations = require('../migrations');

var _migrations2 = _interopRequireDefault(_migrations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  /**
     * Database Queries
     * @param {*} queries the query to be executed
     * @param {*} params data to be used with query
     * @returns { object } Object which is a promise
     *
     */
  query: function query(queries, params) {
    return new Promise(function (resolve, reject) {
      _migrations2.default.query(queries, params).then(function (res) {
        resolve(res);
      }).catch(function (err) {
        reject(err);
      });
    });
  }
};