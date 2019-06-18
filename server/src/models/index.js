import pool from '../migrations';

export default {
  /**
     * Database Queries
     * @param {*} queries the query to be executed
     * @param {*} params data to be used with query
     * @returns { object } Object which is a promise
     *
     */
  query(queries, params) {
    return new Promise((resolve, reject) => {
      pool.query(queries, params)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
