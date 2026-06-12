const pool = require("../config/db");

const createRideTable = async () => {

  await pool.query(`
    CREATE TABLE IF NOT EXISTS rides(
      id SERIAL PRIMARY KEY,
      rider_id INTEGER,
      driver_id INTEGER,
      pickup TEXT,
      destination TEXT,
      fare NUMERIC(10,2),
      status VARCHAR(30) DEFAULT 'REQUESTED',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

};

module.exports = {
  createRideTable
};
