const pool = require("../config/db");

const createPaymentTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS payments (
      id SERIAL PRIMARY KEY,
      ride_id INTEGER,
      user_id INTEGER,
      amount NUMERIC(10,2),
      payment_method VARCHAR(30),
      status VARCHAR(30) DEFAULT 'PENDING',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
};

module.exports = {
  createPaymentTable,
};
