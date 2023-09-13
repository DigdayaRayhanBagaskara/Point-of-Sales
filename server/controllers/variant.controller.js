const { sequelize } = require("../models/index.js");

// GET untuk menampilkan data
const get = async (req, res) => {
  try {
    const param = req.query;

    let limit = parseInt(param?.limit) || 5;
    let offset = parseInt(param?.offset) || 0;

    let query = "SELECT * FROM produk_variant LEFT JOIN produk ON produk_variant.id_produk = produk.id_produk";

    if (limit > 0) {
      query += " LIMIT " + limit;
    }

    if (offset >= 0) {
      query += " OFFSET " + offset;
    }

    const [rows] = await sequelize.query(query);
   


    const data = {
      total_row: 0,
      limit: limit,
      offset: offset,
      rows: rows,
    };

    res.status(201).json({
      status: true,
      message: "GET DATA VARIANT",
      data: data,
      produk: rows.map((v, i) => {
        return v.produk_name;
      })
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
    let query = "SELECT * FROM produk_variant LEFT JOIN produk ON produk_variant.id_produk = produk.id_produk WHERE produk_variant.id_variant = " + id;
    const [data] = await sequelize.query(query);

    if (data.length > 0) {
      res.status(201).json({
        status: true,
        message: "GET DATA VARIANT BERDASARKAN ID VARIANT",
        data: data,
        produk: data.map((v) => {
          return v.produk_name;
        })
      });
    } else {
      res.status(404).json({
        status: false,
        message: "DATA VARIANT " + id + " TIDAK DI TEMUKAN",
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

    let query = `INSERT INTO produk_variant (
      id_produk, variant_name, harga_produk, sku, stok, min_stok, created_at, updated_at
    ) 
    VALUES (
      $id_produk, $variant_name, $harga_produk, $sku, $stok, $min_stok, NOW(), NOW()
    )`;

    const [result_id] = await sequelize.query(query, {
      bind: param,
    });

    res.status(201).json({
      status: true,
      message: "SUCCESS TAMBAH DATA VARIANT",
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
      let query = `UPDATE produk_variant SET ${set_update} WHERE id_variant = $id`;

      const [result_id] = await sequelize.query(query, {
        bind: { id: id, ...param },
      });

      res.status(201).json({
        status: true,
        message: "SUCCESS UBAH DATA VARIANT",
        data: { id: id, ...param },
      });
    } else {
      res.status(500).json({
        status: false,
        message: "DATA VARIANT YANG DITUJU TIDAK ADA",
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
    let query = `DELETE FROM produk_variant WHERE id_variant = $id`;

    const [result] = await sequelize.query(query, {
      bind: { id: id },
    });

    if (result?.affectedRows > 0) {
      res.status(201).json({
        status: true,
        message: "SUCCESS DELETE DATA VARIANT",
        data: { id: id },
      });
    } else {
      res.status(404).json({
        status: false,
        message: "DATA VARIANT " + id + " TIDAK DI TEMUKAN",
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
