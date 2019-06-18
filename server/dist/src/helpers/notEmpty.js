'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Function to check if value is empty
 * @param {string} value
 * @param {string} msg
 * @return {(error|bool)} returns error or true
 */
var notEmpty = function notEmpty(value, msg) {
  if (value === '') {
    throw new Error(msg);
  }

  return true;
};

exports.default = notEmpty;