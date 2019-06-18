/* eslint-disable no-console */
import pool from './index';

pool.on('connect', () => {
  console.log('Connected to the database');
});

const queryText = `


CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(128) NOT NULL,
    lastname VARCHAR(128) NOT NULL,
    email VARCHAR(128) UNIQUE NOT NULL,
    is_admin BOOLEAN DEFAULT false,
    password VARCHAR(124) NOT NULL,
    created_date TIMESTAMP,
    modified_date TIMESTAMP DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS addresses(
    id SERIAL PRIMARY KEY,
    box_number VARCHAR(128) NOT NULL,
    postal_code TEXT NOT NULL,
    town VARCHAR(128) NOT NULL,
    used_by INTEGER REFERENCES users(id),
    created_date TIMESTAMP
);

CREATE TABLE IF NOT EXISTS cars(
  id SERIAL PRIMARY KEY,
  owner INTEGER REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
  price INTEGER NOT NULL,
  model VARCHAR(128) NOT NULL,
  manufacturer VARCHAR(128) NOT NULL,
  state VARCHAR(128) NOT NULL,
  status VARCHAR(128) NOT NULL,
  body_type VARCHAR(128) NOT NULL,
  created_date TIMESTAMP,
  modified_date TIMESTAMP
);

    CREATE TABLE IF NOT EXISTS orders(
      id SERIAL PRIMARY KEY,
      owner INTEGER NOT NULL,
      car_id INTEGER NOT NULL,
      price INTEGER NOT NULL,
      offered_price INTEGER NOT NULL,
      status VARCHAR(128) NOT NULL,
      created_date TIMESTAMP,
      modified_date TIMESTAMP
    );

    
    
    
    
    CREATE TABLE IF NOT EXISTS flags(
        id SERIAL PRIMARY KEY,
        client INTEGER REFERENCES users(id),
        car_id  INTEGER REFERENCES cars(id) NOT NULL,
        reason VARCHAR(128) NOT NULL,
        description VARCHAR(128) NOT NULL,
        created_date TIMESTAMP
        
    );
    `;

pool.query(queryText)
  .then((res) => {
    console.log(res);
    pool.end();
  }).catch((err) => {
    console.log(err);
    pool.end();
  });
