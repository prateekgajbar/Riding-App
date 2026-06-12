const pool = require("../config/db");

exports.updateLocation = async (req, res) => {
  try {

    const {
      latitude,
      longitude
    } = req.body;

    const result = await pool.query(
      `
      INSERT INTO locations
      (
        user_id,
        latitude,
        longitude
      )
      VALUES($1,$2,$3)
      RETURNING *
      `,
      [
        req.user.id,
        latitude,
        longitude
      ]
    );

    res.status(201).json(result.rows[0]);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }
};

exports.getLocation = async (req, res) => {
  try {

    const result = await pool.query(
      `
      SELECT *
      FROM locations
      WHERE user_id=$1
      ORDER BY id DESC
      LIMIT 1
      `,
      [req.params.userId]
    );

    res.json(result.rows[0]);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }
};
