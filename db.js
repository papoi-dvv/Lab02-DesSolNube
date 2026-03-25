const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://usuario:password@localhost:5432/lab02nube',
  ssl: process.env.DATABASE_URL ? {
    rejectUnauthorized: false
  } : false
});

module.exports = pool;