const { sequelize } = require("../models/index.js");

// GET untuk menampilkan data
const get = async (req, res) => {
  try {
    const param = req.query;
    let keyword = param?.keyword || ``;
    let limit = parseInt(param?.limit) || 5;
    let offset = parseInt(param?.offset) || 0;

    let query = `SELECT 
    produk_categories.id_categories,
    produk_categories.categories_name,
    produk_categories.keterangan,
    produk_categories.model,
    produk_categories.created_at,
    produk_categories.updated_at 
    FROM produk_categories
    `;

    if (keyword.length > 0) {
      query += ` 
        WHERE 
          produk_categories.categories_name LIKE $keyword
        `;
    }

    if (limit > 0) {
      query += " LIMIT " + limit;
    }

    if (offset >= 0) {
      query += " OFFSET " + offset;
    }

    const [rows] = await sequelize.query(query, {
      bind: { keyword: `%${keyword}%` },
    });
    const count = rows.length;
    const data = {
      total_row: count,
      rows: rows,
    };

    res.status(201).json({
      status: true,
      message: "GET DATA KATEGORI",
      data: data,
    });
  } catch (err) {
    res.status(500).json(
      {
        status: false,
        message: err.message,
        data: []});
      }
};

//GET BY ID untuk GET single data
const getById = async (req, res) => {
  try {
    const id = req.params?.id;
    let query = "SELECT * FROM produk_categories WHERE id_categories = " + id;
    const [x] = await sequelize.query(query);

    const count = x.length;

    // const data = {
    //   total_row: count,
    //   rows: rows,
    // };

    if (x.length > 0) {
      Object.keys(x).forEach(function (key) {
        var rows = x[key];

        res.status(201).json({
          status: true,
          message: "GET DATA KATEGORI BERDASARKAN ID BRANDS PRODUK",
          count: count,
          data: rows,
        });
      });
    } else {
      res.status(404).json({
        status: false,
        message: "DATA KATEGORI " + id + " TIDAK DI TEMUKAN",
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

    let query = `INSERT INTO produk_categories (
      categories_name, keterangan, model, created_at, updated_at
    ) 
    VALUES (
      $categories_name, $keterangan, $model, NOW(), NOW() 
    )`;

    const [result_id] = await sequelize.query(query, {
      bind: param,
    });

    res.status(201).json({
      status: true,
      message: "SUCCESS TAMBAH DATA KATEGORI",
      data: { id: result_id, ...param },
    });
  } catch (err) {
    let validationError = JSON.parse(JSON.stringify(err))?.original;

    res.status(500).json({
      status: false,
      message: validationError?.sqlMessage || err.message,
      data: [],
    });
  }
};

//UPDATE untuk update data
const update = async (req, res) => {
  try {
    const param = req.body;
    const id = req.params.id;

    let set_update = [];

    for (let item in param) {
      set_update.push(`${item} = $${item}`);
    }

    set_update.push(`updated_at = NOW()`);

    if (set_update.length) {
      let query = `UPDATE produk_categories SET ${set_update} WHERE id_categories = $id`;

      const [result_id] = await sequelize.query(query, {
        bind: { id: id, ...param },
      });

      res.status(201).json({
        status: true,
        message: "SUCCESS UBAH DATA produk_categories",
        data: { id: id, ...param },
      });
    } else {
      res.status(500).json({
        status: false,
        message: "DATA produk_categories YANG DITUJU TIDAK ADA",
      });
    }
  } catch (err) {
    let validationError = JSON.parse(JSON.stringify(err))?.original;

    res.status(500).json({
      status: false,
      message: validationError?.sqlMessage || err.message,
      data: [],
    });
  }
};

//DESTROY untuk delete data
const destroy = async (req, res) => {
  try {
    const id = req.params.id;
    let query = `DELETE FROM produk_categories WHERE id_categories = $id`;

    const [result] = await sequelize.query(query, {
      bind: { id: id },
    });

    if (result?.affectedRows > 0) {
      res.status(201).json({
        status: true,
        message: "SUCCESS DELETE DATA KATEGORI",
        data: { id: id },
      });
    } else {
      res.status(404).json({
        status: false,
        message: "DATA KATEGORI " + id + " TIDAK DI TEMUKAN",
      });
    }
  } catch (err) {
    let validationError = JSON.parse(JSON.stringify(err))?.original;

    res.status(500).json({
      status: false,
      message: validationError?.sqlMessage || err.message,
      data: [],
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
