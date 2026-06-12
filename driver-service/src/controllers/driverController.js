const pool = require("../config/db");

exports.registerDriver = async (req, res) => {
  try {
    const {
      full_name,
      vehicle_number,
      vehicle_type
    } = req.body;

    const result = await pool.query(
      `INSERT INTO drivers
      (user_id,full_name,vehicle_number,vehicle_type)
      VALUES($1,$2,$3,$4)
      RETURNING *`,
      [
        req.user.id,
        full_name,
        vehicle_number,
        vehicle_type
      ]
    );

    res.status(201).json(result.rows[0]);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

exports.getDriver = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM drivers WHERE user_id=$1",
      [req.user.id]
    );

    res.json(result.rows);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const result = await pool.query(
      `UPDATE drivers
       SET status=$1
       WHERE user_id=$2
       RETURNING *`,
      [
        status,
        req.user.id
      ]
    );

    res.json(result.rows[0]);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};
