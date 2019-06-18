'use strict';

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var queryText = 'DROP TABLE IF EXISTS users, cars, orders ,flags, addresses CASCADE'; /* eslint-disable no-console */


_index2.default.query(queryText).then(function (res) {
  console.log(res);
  _index2.default.end();
}).catch(function (err) {
  console.log(err);
  _index2.default.end();
});

_index2.default.on('remove', function () {
  console.log('Client removed');
  process.exit(0);
});