const pool = require("../config/db");

const createNotificationTable = async () => {

  await pool.query(`
    CREATE TABLE IF NOT EXISTS notifications(
      id SERIAL PRIMARY KEY,
      user_id INTEGER,
      title VARCHAR(255),
      message TEXT,
      type VARCHAR(50),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

};

module.exports = {
  createNotificationTable
};
