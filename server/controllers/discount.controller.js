const { sequelize } = require("../models/index.js");

// GET untuk menampilkan data
const get = async (req, res) => {
  try {
    const param = req.query;

    let keyword = param?.keyword || ``;
    let limit = parseInt(param?.limit) || 5;
    let offset = parseInt(param?.offset) || 0;

    // Start Query untuk menampilkan seluruh data
    let query = `SELECT * FROM discount`;

    if (keyword.length > 0) {
      query += ` 
          WHERE 
            id_discount LIKE $keyword OR
            discount_names LIKE $keyword OR
            discount_type LIKE $keyword OR
            amount LIKE $keyword OR
            persen LIKE $keyword OR
            expired LIKE $keyword 
        `;
    }

    if (limit > 0) {
      query += ` LIMIT ` + limit;
    }

    if (offset >= 0) {
      query += ` OFFSET ` + offset;
    }

    const [rows] = await sequelize.query(query, {
      bind: { keyword: `%${keyword}%` },
    });
    // End Query untuk menampilkan seluruh data

    // Start Query untuk menghitung jumlah seluruh data
    let countQuery = `SELECT COUNT(discount.id_discount) AS count FROM discount`;

    if (keyword.length > 0) {
      countQuery += ` 
          WHERE 
            id_discount LIKE $keyword OR
            discount_names LIKE $keyword OR
            discount_type LIKE $keyword OR
            amount LIKE $keyword OR
            persen LIKE $keyword OR
            expired LIKE $keyword 
        `;
    }
    const [count] = await sequelize.query(countQuery, {
      bind: { keyword: `%${keyword}%` },
    });
    // End Query untuk menghitung jumlah seluruh data

    res.status(200).json({
      status: true,
      data: {
        count: count[0] ? count[0].count : 0,
        limit: limit,
        offset: offset,
        rows: rows,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
      data: [],
    });
  }
};

//GET BY ID untuk GET single data
const getById = async (req, res) => {
  try {
    const id_discount = req.params?.id;
    let query = `SELECT * FROM discount WHERE id_discount = $id_discount`;
    const [data] = await sequelize.query(query, {
      bind: { id_discount: id_discount },
    });

    if (data.length > 0) {
      res.status(200).json({
        status: true,
        data: data,
      });
    } else {
      res.status(404).json({
        status: false,
        message: `DATA DISCOUNT ${id_discount} TIDAK DI TEMUKAN`,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

//STORE untuk insert data
const store = async (req, res) => {
  try {
    const param = req.body;

    let query = `INSERT INTO discount (
        discount_names,discount_type,amount,persen,expired,created_at,updated_at
      )
      VALUES
      (
        $discount_names,$discount_type,$amount,$persen,$expired,NOW(),NOW()
      )`;

    const [result_id] = await sequelize.query(query, {
      bind: param,
    });
    res.status(200).json({
      status: true,
      data: { id_discount: result_id, ...param },
    });
  } catch (err) {
    let validationError = JSON.parse(JSON.stringify(err))?.original;
    res.status(500).json({
      status: false,
      message: validationError?.sqlMessage || err.message,
    });
  }
};

//UPDATE untuk update data
const update = async (req, res) => {
  try {
    const param = req.body;
    const id_discount = req.params?.id;

    let set_update = [];

    for (let item in param) {
      set_update.push(`${item} = $${item}`);
    }

    if (set_update.length) {
      set_update.push(`updated_at = NOW()`);
      let query = `UPDATE discount SET ${set_update.join(
        `,`
      )} WHERE id_discount = $id_discount`;

      const [result_id] = await sequelize.query(query, {
        bind: { id_discount: id_discount, ...param },
      });

      res.status(200).json({
        status: true,
        data: { id_discount: id_discount, ...param },
      });
    } else {
      res.status(500).json({
        status: false,
        message: `TIDAK ADA UPDATE DATA`,
      });
    }
  } catch (err) {
    let validationError = JSON.parse(JSON.stringify(err))?.original;
    res.status(500).json({
      status: false,
      message: validationError?.sqlMessage || err.message,
    });
  }
};

//DESTROY untuk delete data
const destroy = async (req, res) => {
  try {
    const id_discount = req.params?.id;
    let query = `DELETE FROM discount WHERE id_discount = $id_discount`;

    const [result] = await sequelize.query(query, {
      bind: { id_discount: id_discount },
    });

    if (result?.affectedRows > 0) {
      res.status(200).json({
        status: true,
        data: { id_discount: id_discount },
      });
    } else {
      res.status(404).json({
        status: false,
        message: `DATA DISCOUNT ${id_discount} TIDAK DI TEMUKAN`,
      });
    }
  } catch (error) {
    let validationError = JSON.parse(JSON.stringify(err))?.original;
    res.status(500).json({
      status: false,
      message: validationError?.sqlMessage || err.message,
    });
  }
};

module.exports = {
  get,
  getById,
  store,
  update,
  destroy,
};
