const { mappingQueryArrayReturn } = require("../helpers/utility.js");
const { sequelize } = require("../models/index.js");
const moment = require("moment");

const salesReport = async (req, res) => {
  try{
    const param = req.query;
    const dateNow = moment().format("YYYY-MM-DD");
    // moment(tanggal).format('YYYY-MM-DD');

    let keyword = param?.keyword || "";
    let limit = parseInt(param?.limit) || 5;
    let offset = parseInt(param?.offset) || 0;
    let startDate = param?.start_date
      ? moment(param?.start_date).format("YYYY-MM-DD")
      : dateNow;
    let endDate = param?.end_date
      ? moment(param?.end_date).format("YYYY-MM-DD")
      : dateNow;

    // Start Query untuk menampilkan seluruh data
    let query = `
      SELECT
        transaksi.*, 
        discount.id_discount AS 'discount.id_discount' ,
        discount.discount_names AS 'discount.discount_names' ,
        discount.discount_type AS 'discount.discount_type' ,
        discount.amount AS 'discount.amount' ,
        discount.persen AS 'discount.persen' ,
        discount.expired AS 'discount.expired' ,
        transaksi_detail.id_transaksi_detail AS 'transaksi_detail.id_transaksi_detail' ,
        transaksi_detail.id_transaksi AS 'transaksi_detail.id_transaksi' ,
        transaksi_detail.id_produk AS 'transaksi_detail.id_produk' ,
        transaksi_detail.total_harga_produk AS 'transaksi_detail.total_harga_produk' ,
        transaksi_detail.jumlah_produk AS 'transaksi_detail.jumlah_produk',
        produk.id_produk AS 'transaksi_detail.produk_id_produk',
        produk.id_outlet AS 'transaksi_detail.produk_id_outlet',
        produk.id_categories AS 'transaksi_detail.produk_id_categories',
        produk.id_brand AS 'transaksi_detail.produk_id_brand',
        produk.produk_name AS 'transaksi_detail.produk_produk_name',
        produk.gambar_produk AS 'transaksi_detail.produk_gambar_produk',
        produk.desc AS 'transaksi_detail.produk_produk.desc'
      FROM
        transaksi
      INNER JOIN transaksi_detail ON transaksi_detail.id_transaksi = transaksi.id_transaksi
      INNER JOIN produk ON produk.id_produk = transaksi_detail.id_produk
      LEFT JOIN discount ON transaksi.id_discount = discount.id_discount
      WHERE
        transaksi.tgl_transaksi BETWEEN $startDate AND $endDate 
      `;

    if (keyword.length > 0) {
      query += ` 
        AND (
        transaksi.nomor_transaksi LIKE $keyword OR
        transaksi.nama_pelanggan LIKE $keyword OR
        produk.produk_name LIKE $keyword
        )`;
    }

    if (limit > 0) {
      query += " LIMIT " + limit;
    }

    if (offset >= 0) {
      query += " OFFSET " + offset;
    }

    const [x] = await sequelize.query(query, {
      bind: { startDate: startDate, endDate: endDate, keyword: `%${keyword}%` },
    });

    const z = await mappingQueryArrayReturn(x);
    let rows = [];
    for (let row of z) {
      if (row.discount.length == 1) {
        row.discount = row.discount.length == 0 ? {} : row.discount[0];
      }
      if (row.transaksi_detail.length == 1) {
        row.transaksi_detail =
          row.transaksi_detail.length == 0 ? {} : row.transaksi_detail[0];
      }
      rows.push(row);
    }
    // End Query untuk menampilkan seluruh data

    // Start Query untuk menghitung jumlah seluruh data
    let countQuery = `
        SELECT 
          COUNT(transaksi.id_transaksi) AS count
        FROM transaksi 
        INNER JOIN transaksi_detail ON transaksi_detail.id_transaksi = transaksi.id_transaksi
        INNER JOIN produk ON produk.id_produk = transaksi_detail.id_produk
        WHERE
          transaksi.tgl_transaksi BETWEEN $startDate AND $endDate `;
    if (keyword.length > 0) {
      countQuery += ` 
        AND (
          transaksi.nomor_transaksi LIKE $keyword OR
          transaksi.nama_pelanggan LIKE $keyword OR
          produk.produk_name LIKE $keyword
        )`;
    }
    const [count] = await sequelize.query(countQuery, {
      bind: { startDate: startDate, endDate: endDate, keyword: `%${keyword}%` },
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
    });
  }
};

module.exports = {
    salesReport,
};
