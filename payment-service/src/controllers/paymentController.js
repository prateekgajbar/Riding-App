const pool = require("../config/db");

exports.createPayment = async (req, res) => {
  try {
    const { ride_id, amount, payment_method } = req.body;

    const result = await pool.query(
      `
      INSERT INTO payments
      (ride_id,user_id,amount,payment_method,status)
      VALUES($1,$2,$3,$4,'SUCCESS')
      RETURNING *
      `,
      [
        ride_id,
        req.user.id,
        amount,
        payment_method
      ]
    );

    res.status(201).json(result.rows[0]);

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.getPayments = async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT *
      FROM payments
      WHERE user_id=$1
      ORDER BY id DESC
      `,
      [req.user.id]
    );

    res.json(result.rows);

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
