const pool = require("../config/db");

exports.createRide = async (req,res)=>{

  try{

    const {
      pickup,
      destination,
      fare
    } = req.body;

    const result = await pool.query(
      `
      INSERT INTO rides
      (
        rider_id,
        pickup,
        destination,
        fare
      )
      VALUES($1,$2,$3,$4)
      RETURNING *
      `,
      [
        req.user.id,
        pickup,
        destination,
        fare
      ]
    );

    res.status(201).json(
      result.rows[0]
    );

  }catch(err){

    res.status(500).json({
      error:err.message
    });

  }

};

exports.acceptRide = async (req,res)=>{

  try{

    const { rideId } = req.params;

    const result = await pool.query(
      `
      UPDATE rides
      SET
      driver_id=$1,
      status='ACCEPTED'
      WHERE id=$2
      RETURNING *
      `,
      [
        req.user.id,
        rideId
      ]
    );

    res.json(result.rows[0]);

  }catch(err){

    res.status(500).json({
      error:err.message
    });

  }

};

exports.startRide = async (req,res)=>{

  try{

    const { rideId } = req.params;

    const result = await pool.query(
      `
      UPDATE rides
      SET status='STARTED'
      WHERE id=$1
      RETURNING *
      `,
      [rideId]
    );

    res.json(result.rows[0]);

  }catch(err){

    res.status(500).json({
      error:err.message
    });

  }

};

exports.completeRide = async (req,res)=>{

  try{

    const { rideId } = req.params;

    const result = await pool.query(
      `
      UPDATE rides
      SET status='COMPLETED'
      WHERE id=$1
      RETURNING *
      `,
      [rideId]
    );

    res.json(result.rows[0]);

  }catch(err){

    res.status(500).json({
      error:err.message
    });

  }

};

exports.getRideHistory = async (req,res)=>{

  try{

    const result = await pool.query(
      `
      SELECT *
      FROM rides
      WHERE rider_id=$1
      ORDER BY id DESC
      `,
      [req.user.id]
    );

    res.json(result.rows);

  }catch(err){

    res.status(500).json({
      error:err.message
    });

  }

};
