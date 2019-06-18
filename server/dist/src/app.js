'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _dotenv = require('dotenv');

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

require('babel-polyfill');

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _ErrorHandler = require('./middlewares/ErrorHandler');

var _ErrorHandler2 = _interopRequireDefault(_ErrorHandler);

var _swaggerDocs = require('./swaggerDocs');

var _swaggerDocs2 = _interopRequireDefault(_swaggerDocs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _dotenv.config)();

var app = (0, _express2.default)();
var port = process.env.PORT || 3000;

app.use((0, _cors2.default)());
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({
  extended: true
}));

(0, _swaggerDocs2.default)(app);

app.use('/api', _routes2.default);
app.use('*', function (req, res) {
  return res.status(404).json({
    status: 404,
    error: 'Page Not Found'
  });
});

app.use(_ErrorHandler2.default.sendError);
app.listen(port, function () {
  console.log('Listening from port ' + port);
});

exports.default = app;