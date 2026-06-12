const pool = require("../config/db");

const createDriverTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS drivers (
      id SERIAL PRIMARY KEY,
      user_id INTEGER UNIQUE,
      full_name VARCHAR(100),
      vehicle_number VARCHAR(50),
      vehicle_type VARCHAR(50),
      status VARCHAR(20) DEFAULT 'OFFLINE',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
};

module.exports = {
  createDriverTable
};
