import { Pool } from 'pg';
import { config } from 'dotenv';
import dbConfigurations from '../../config/dbConfig';

config();

const env = process.env.NODE_ENV;
const connect = dbConfigurations[env];

const { connectionString } = connect;

const pool = new Pool({
  connectionString,
});

export default pool;
