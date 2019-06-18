'use strict';

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_index2.default.on('connect', function () {
  console.log('Connected to the database');
}); /* eslint-disable no-console */


var queryText = '\n\n\nCREATE TABLE IF NOT EXISTS users(\n    id SERIAL PRIMARY KEY,\n    firstname VARCHAR(128) NOT NULL,\n    lastname VARCHAR(128) NOT NULL,\n    email VARCHAR(128) UNIQUE NOT NULL,\n    is_admin BOOLEAN DEFAULT false,\n    password VARCHAR(124) NOT NULL,\n    created_date TIMESTAMP,\n    modified_date TIMESTAMP DEFAULT NULL\n);\n\nCREATE TABLE IF NOT EXISTS addresses(\n    id SERIAL PRIMARY KEY,\n    box_number VARCHAR(128) NOT NULL,\n    postal_code TEXT NOT NULL,\n    town VARCHAR(128) NOT NULL,\n    used_by INTEGER REFERENCES users(id),\n    created_date TIMESTAMP\n);\n\nCREATE TABLE IF NOT EXISTS cars(\n  id SERIAL PRIMARY KEY,\n  owner INTEGER REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,\n  price INTEGER NOT NULL,\n  model VARCHAR(128) NOT NULL,\n  manufacturer VARCHAR(128) NOT NULL,\n  state VARCHAR(128) NOT NULL,\n  status VARCHAR(128) NOT NULL,\n  body_type VARCHAR(128) NOT NULL,\n  created_date TIMESTAMP,\n  modified_date TIMESTAMP\n);\n\n    CREATE TABLE IF NOT EXISTS orders(\n      id SERIAL PRIMARY KEY,\n      owner INTEGER NOT NULL,\n      car_id INTEGER NOT NULL,\n      price INTEGER NOT NULL,\n      offered_price INTEGER NOT NULL,\n      status VARCHAR(128) NOT NULL,\n      created_date TIMESTAMP,\n      modified_date TIMESTAMP\n    );\n\n    \n    \n    \n    \n    CREATE TABLE IF NOT EXISTS flags(\n        id SERIAL PRIMARY KEY,\n        client INTEGER REFERENCES users(id),\n        car_id  INTEGER REFERENCES cars(id) NOT NULL,\n        reason VARCHAR(128) NOT NULL,\n        description VARCHAR(128) NOT NULL,\n        created_date TIMESTAMP\n        \n    );\n    ';

_index2.default.query(queryText).then(function (res) {
  console.log(res);
  _index2.default.end();
}).catch(function (err) {
  console.log(err);
  _index2.default.end();
});