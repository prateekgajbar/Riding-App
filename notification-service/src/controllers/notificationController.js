const pool = require("../config/db");

exports.sendNotification = async (req, res) => {

  try {

    const {
      title,
      message,
      type
    } = req.body;

    const result = await pool.query(
      `
      INSERT INTO notifications
      (
        user_id,
        title,
        message,
        type
      )
      VALUES($1,$2,$3,$4)
      RETURNING *
      `,
      [
        req.user.id,
        title,
        message,
        type
      ]
    );

    res.status(201).json(result.rows[0]);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

};

exports.getNotifications = async (req, res) => {

  try {

    const result = await pool.query(
      `
      SELECT *
      FROM notifications
      WHERE user_id=$1
      ORDER BY id DESC
      `,
      [req.user.id]
    );

    res.json(result.rows);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

};
