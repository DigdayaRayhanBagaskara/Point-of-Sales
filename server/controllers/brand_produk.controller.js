const { mappingQueryArrayReturn } = require("../helpers/utility.js");
const { sequelize } = require("../models/index.js");

// GET untuk menampilkan data
const get = async (req, res) => {
  try {
    const param = req.query;
    let keyword = param?.keyword || ``;
    let limit = parseInt(param?.limit) || 5;
    let offset = parseInt(param?.offset) || 0;

    let query = "SELECT * FROM brands_produk";
    let query_count = `SELECT COUNT(id_brands_produk) as count FROM brands_produk `;

    if (keyword.length > 0) {
      let q_keyword = ` WHERE brand_name LIKE $keyword `;
      query += q_keyword;
      query_count += q_keyword;
    }
    if (limit > 0) {
      query += " LIMIT " + limit;
    }

    if (offset >= 0) {
      query += " OFFSET " + offset;
    }

    const [x] = await sequelize.query(query, {
      bind: { keyword: `%${keyword}%` },
    });
    
    const [total_rows] = await sequelize.query(query_count, {
      bind: { keyword: `%${keyword}%` },
    });
    const z = await mappingQueryArrayReturn(x);

    let rows = [];
    for (let row of z) {
      if (row.brands_produk <= 1) {
        row.brands_produk =
          row.brands_produk.length == 0 ? {} : row.brands_produk;
      }
      // console.log(row);
      rows.push(row);
    }

    const data = {
      total_row: total_rows[0].count,
      limit: limit,
      offset: offset,
      rows: rows,
    };

    res.status(201).json({
      status: true,
      message: "GET DATA BRANDS PRODUK",
      data: data,
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
    const id = req.params?.id;
    let query = "SELECT * FROM brands_produk WHERE id_brands_produk = " + id;
    const [x] = await sequelize.query(query);

    const count = x.length;

    if (x.length > 0) {
      Object.keys(x).forEach(function (key) {
        var rows = x[key];

        res.status(201).json({
          status: true,
          message: "GET DATA brands produk BERDASARKAN ID BRANDS PRODUK",
          count: count,
          data: rows,
        });
      });
    } else {
      res.status(404).json({
        status: false,
        message: "DATA brands produk " + id + " TIDAK DI TEMUKAN",
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

    let query = `INSERT INTO brands_produk (
      brand_name, keterangan, asal_brand, created_at, updated_at
    ) 
    VALUES (
      $brand_name, $keterangan, $asal_brand, NOW(), NOW()
    )`;

    const [result_id] = await sequelize.query(query, {
      bind: param,
    });

    res.status(201).json({
      status: true,
      message: "SUCCESS TAMBAH DATA BRANDS PRODUK",
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

    if (set_update.length) {
      let query = `UPDATE brands_produk SET ${set_update} WHERE id_brands_produk = $id`;

      const [result_id] = await sequelize.query(query, {
        bind: { id: id, ...param },
      });

      res.status(201).json({
        status: true,
        message: "SUCCESS UBAH DATA BRANDS PRODUK",
        data: { id: id, ...param },
      });
    } else {
      res.status(500).json({
        status: false,
        message: "DATA BRANDS PRODUK YANG DITUJU TIDAK ADA",
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
    let query = `DELETE FROM brands_produk WHERE id_brands_produk = $id`;

    const [result] = await sequelize.query(query, {
      bind: { id: id },
    });

    if (result?.affectedRows > 0) {
      res.status(201).json({
        status: true,
        message: "SUCCESS DELETE DATA BRANDS PRODUK",
        data: { id: id },
      });
    } else {
      res.status(404).json({
        status: false,
        message: "DATA BRANDS PRODUK " + id + " TIDAK DI TEMUKAN",
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
