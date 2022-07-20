import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();
const { Pool } = pg;

const database = new Pool({
    connectionString: process.env.DATABASE_URL
});

export default database;