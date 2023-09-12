const { sequelize, db } = require("../models/index.js");
const { mappingQueryArrayReturn } = require("../helpers/utility.js");

//STORE untuk insert data
const store = async (req, res) => {
  try {
    const param = req.body;

    let query = `INSERT INTO transaksi (
      nomor_transaksi, id_discount, total_harga, nama_pelanggan, total_bayar, tgl_transaksi, created_at, updated_at
    ) 
    VALUES (
      $nomor_transaksi, $id_discount, $total_harga, $nama_pelanggan, $total_bayar, $tgl_transaksi, NOW(), NOW()
    )`;

    const [result_id] = await sequelize.query(query, {
      bind: param,
    });

    let kembalian = param.total_bayar - param.total_harga;
    console.log(kembalian);

    const insertTransaksiDetail = param.transaksiDetail.map((row) => {
      row.id_transaksi = result_id;
      return row;
    });

    db.transaksi_detail.bulkCreate(insertTransaksiDetail);

    res.status(201).json({
      status: true,
      message: "SUCCESS TAMBAH DATA Transaksi",
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

const destroy = async (req, res) => {
  try {
    const param = req.body;
    const id = req.params.id;
    let query = `DELETE FROM transaksi_detail WHERE id_transaksi = $id`;

    const [result] = await sequelize.query(query, {
      bind: { id: id },
    });

    if (result?.affectedRows > 0) {
      let qw = "DELETE FROM transaksi WHERE id_transaksi=$id";
      const [result_idtr] = await sequelize.query(qw, {
        bind: { id: id },
      });
      res.status(201).json({
        status: true,
        message: "SUCCESS DELETE DATA PRODUK",
        data: { id: id },
      });
    } else {
      res.status(404).json({
        status: false,
        message: "DATA PRODUK " + id + " TIDAK DI TEMUKAN",
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
  store,
  destroy,
};
