
/**
 *
 * @class Response
 */
class Response {
  /**
     * Return a formatted object
     * @static
     * @param {Object} obj the car object
     * @param {object} res the HTTP response object
     * @returns { Object } Returns a formatted Object
     * @memberof Response
     */
  static customResponse(message, obj, res, httpCode) {
    const data = {};
    // eslint-disable-next-line no-return-assign
    Object.keys(obj).forEach((e) => {
      if (e !== 'password' && e !== 'address') {
        data[e] = obj[e];
      }
    });

    return res.status(httpCode).json({
      message,
      status: res.statusCode,
      data: {
        ...data,
      },
    });
  }


  /**
   * @static
   * @method errorResponse
   * @memberof Response
   * @param {object} res the HTTP response object
   * @param {string} errorMsg user object
   * @param {integer} httpCode the HTTP status code
   * @return {object} return status code and error message
   */
  static errorResponse(res, errorMsg, httpCode) {
    return res.status(httpCode).send({
      status: res.statusCode,
      error: errorMsg,
    });
  }
}

export default Response;
