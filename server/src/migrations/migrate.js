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
    isAdmin BOOLEAN DEFAULT false,
    password VARCHAR(124) NOT NULL,
    createdDate TIMESTAMP,
    modifiedDate TIMESTAMP DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS addresses(
    id SERIAL PRIMARY KEY,
    boxNumber VARCHAR(128) UNIQUE NOT NULL,
    postalCode TEXT NOT NULL,
    town VARCHAR(128) NOT NULL,
    usedBy INTEGER REFERENCES users(id),
    createdDate TIMESTAMP
);

CREATE TABLE IF NOT EXISTS cars(
  id SERIAL PRIMARY KEY,
  owner INTEGER REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
  price VARCHAR(128) NOT NULL,
  model VARCHAR(128) NOT NULL,
  manufacturer VARCHAR(128) NOT NULL,
  state VARCHAR(128) NOT NULL,
  status VARCHAR(128) NOT NULL,
  bodyType VARCHAR(128) NOT NULL,
  createdDate TIMESTAMP,
  modifiedDate TIMESTAMP
);

    CREATE TABLE IF NOT EXISTS orders(
      id SERIAL PRIMARY KEY,
      owner INTEGER REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
      carId INTEGER REFERENCES cars(id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
      price VARCHAR(128) NOT NULL,
      priceOffered VARCHAR(128) NOT NULL,
      status VARCHAR(128) NOT NULL,
      createdDate TIMESTAMP,
      modifiedDate TIMESTAMP
    );

    
    
    
    CREATE TABLE IF NOT EXISTS flags(
        id SERIAL PRIMARY KEY,
        client INTEGER REFERENCES users(id),
        carId INTEGER REFERENCES cars(id) NOT NULL,
        reason VARCHAR(128) NOT NULL,
        description VARCHAR(128) NOT NULL,
        createdDate TIMESTAMP
        
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
