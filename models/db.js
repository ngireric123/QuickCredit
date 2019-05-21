import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => { console.log('the Database is connected...'); });

export default pool;
