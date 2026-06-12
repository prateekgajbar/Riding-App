const pool = require("../config/db");

exports.getProfile = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM user_profiles WHERE user_id=$1",
      [req.user.id]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

exports.createProfile = async (req, res) => {
  try {
    const { full_name, phone, address } = req.body;

    const result = await pool.query(
      `INSERT INTO user_profiles
       (user_id,full_name,phone,address)
       VALUES($1,$2,$3,$4)
       RETURNING *`,
      [
        req.user.id,
        full_name,
        phone,
        address
      ]
    );

    res.status(201).json(result.rows[0]);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};
