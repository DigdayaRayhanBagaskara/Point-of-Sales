const { mappingQueryArrayReturn } = require("../helpers/utility.js");
const { sequelize } = require("../models/index.js");
const moment = require("moment");

// GET untuk menghitung Gross Sales
const grossSales = async (req, res) => {
  try {
    const param = req.query;
    const begin_date = moment().startOf("month").format("YYYY-MM-DD");
    const finish_date = moment().endOf("month").format("YYYY-MM-DD");
    // moment(tanggal).format('YYYY-MM-DD');

    let start_date = param?.start_date
      ? moment(param?.start_date).format("YYYY-MM-DD")
      : begin_date;
    let end_date = param?.end_date
      ? moment(param?.end_date).format("YYYY-MM-DD")
      : finish_date;
    let query = `
    SELECT
      SUM(transaksi.total_harga) as gross_sales
    FROM
      transaksi
    WHERE 
      transaksi.tgl_transaksi BETWEEN $start_date AND $end_date
    `;

    let [data] = await sequelize.query(query, {
      bind: { start_date: start_date, end_date: end_date },
    });

    res.status(200).json({
      status: true,
      data: data[0] ? data[0] : (data[0] = { gross_sales: 0 }),
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

// GET untuk menghitung Net Sales
const netSales = async (req, res) => {
  try {
    const param = req.query;
    const begin_date = moment().startOf("month").format("YYYY-MM-DD");
    const finish_date = moment().endOf("month").format("YYYY-MM-DD");
    // moment(tanggal).format('YYYY-MM-DD');

    let start_date = param?.start_date
      ? moment(param?.start_date).format("YYYY-MM-DD")
      : begin_date;
    let end_date = param?.end_date
      ? moment(param?.end_date).format("YYYY-MM-DD")
      : finish_date;
    let query = `
    SELECT
      SUM(transaksi.total_harga - (transaksi_detail.jumlah_produk * produk_variant.harga_modal)) as net_sales
    FROM
      transaksi
    INNER JOIN transaksi_detail ON transaksi_detail.id_transaksi = transaksi.id_transaksi
    INNER JOIN produk_variant ON produk_variant.id_produk_variant = transaksi_detail.id_produk_variant
    WHERE 
      transaksi.tgl_transaksi BETWEEN $start_date AND $end_date
    `;

    let [data] = await sequelize.query(query, {
      bind: { start_date: start_date, end_date: end_date },
    });

    res.status(200).json({
      status: true,
      data: data[0] ? data[0] : (data[0] = { gross_sales: 0 }),
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

// GET untuk menghitung Count Transaction
const countTransaction = async (req, res) => {
  try {
    const param = req.query;
    const begin_date = moment().startOf("month").format("YYYY-MM-DD");
    const finish_date = moment().endOf("month").format("YYYY-MM-DD");
    // moment(tanggal).format('YYYY-MM-DD');

    let start_date = param?.start_date
      ? moment(param?.start_date).format("YYYY-MM-DD")
      : begin_date;
    let end_date = param?.end_date
      ? moment(param?.end_date).format("YYYY-MM-DD")
      : finish_date;
    let query = `
    SELECT
      COUNT(transaksi.id_transaksi) as count_transaction
    FROM
      transaksi
    WHERE 
      transaksi.tgl_transaksi BETWEEN $start_date AND $end_date
    `;

    let [data] = await sequelize.query(query, {
      bind: { start_date: start_date, end_date: end_date },
    });

    res.status(200).json({
      status: true,
      data: data[0] ? data[0] : (data[0] = { gross_sales: 0 }),
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

// GET untuk menampilkan data HOURLY GROSS SALES AMOUNT
const hourlyGrossSalesAmount = async (req, res) => {
  try {
    let query = `
    SELECT
      DATE_FORMAT(transaksi.tgl_transaksi, "%H") AS hour,
      SUM(transaksi.total_harga) AS gross_sales
    FROM
        transaksi
    WHERE 
        DATE_FORMAT(transaksi.tgl_transaksi, "%Y-%m-%d") = CURRENT_DATE()
    GROUP BY
        hour
    ORDER BY
        hour
    `;

    const [rows] = await sequelize.query(query);
    const data = {};

    rows.forEach((item) => {
      data[item.hour] = item.gross_sales;
    });

    res.status(200).json({
      status: true,
      data: data,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

const topItem = async (req, res) => {
  try {
    const param = req.query;
    const begin_date = moment().startOf("month").format("YYYY-MM-DD");
    const finish_date = moment().endOf("month").format("YYYY-MM-DD");
    // moment(tanggal).format('YYYY-MM-DD');

    // let id_outlet = param?.id_outlet;
    let start_date = param?.start_date? moment(param?.start_date).format("YYYY-MM-DD"): begin_date;
    let end_date = param?.end_date? moment(param?.end_date).format("YYYY-MM-DD"): finish_date;
    let limit = parseInt(param?.limit) || 5;
    let offset = parseInt(param?.offset) || 0;

    let query = `
    SELECT
      produk.produk_name,
      produk.gambar_produk,
      COUNT(produk.id_produk) as jumlah
    FROM
      transaksi
    INNER JOIN transaksi_detail ON transaksi_detail.id_transaksi = transaksi.id_transaksi
    INNER JOIN produk_variant ON produk_variant.id_produk_variant = transaksi_detail.id_produk_variant
    INNER JOIN produk ON produk.id_produk = produk_variant.id_produk
    WHERE 
      transaksi.tgl_transaksi BETWEEN $start_date AND $end_date
    GROUP BY
      produk.id_produk
    ORDER BY
      jumlah
    DESC
      `;
    if (limit > 0) {
      query += ` LIMIT ` + limit;
    }

    if (offset >= 0) {
      query += ` OFFSET ` + offset;
    }

    let [data] = await sequelize.query(query, {
      bind: { start_date: start_date, end_date: end_date },
    });

    res.status(200).json({
      status: true,
      data: data,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

const topItemByVolume = async (req, res) => {
  try {
    const param = req.query;
    const begin_date = moment().startOf("month").format("YYYY-MM-DD");
    const finish_date = moment().endOf("month").format("YYYY-MM-DD");
    // moment(tanggal).format('YYYY-MM-DD');

    // let id_outlet = param?.id_outlet;
    let start_date = param?.start_date
      ? moment(param?.start_date).format("YYYY-MM-DD")
      : begin_date;
    let end_date = param?.end_date
      ? moment(param?.end_date).format("YYYY-MM-DD")
      : finish_date;

    let query = `
    SELECT
      produk.produk_name,
      SUM(transaksi_detail.jumlah_produk) as jumlah
    FROM
      transaksi
    INNER JOIN transaksi_detail ON transaksi_detail.id_transaksi = transaksi.id_transaksi
    INNER JOIN produk_variant ON produk_variant.id_produk_variant = transaksi_detail.id_produk_variant
    INNER JOIN produk ON produk.id_produk = produk_variant.id_produk
    WHERE 
      transaksi.tgl_transaksi BETWEEN $start_date AND $end_date
    GROUP BY
      produk.id_produk
    ORDER BY
      jumlah
    DESC
      `;

    let [data] = await sequelize.query(query, {
      bind: { start_date: start_date, end_date: end_date },
    });

    res.status(200).json({
      status: true,
      data: data,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

const topItemBySales = async (req, res) => {
  try {
    const param = req.query;
    const begin_date = moment().startOf("month").format("YYYY-MM-DD");
    const finish_date = moment().endOf("month").format("YYYY-MM-DD");
    // moment(tanggal).format('YYYY-MM-DD');

    // let id_outlet = param?.id_outlet;
    let start_date = param?.start_date? moment(param?.start_date).format("YYYY-MM-DD"): begin_date;
    let end_date = param?.end_date? moment(param?.end_date).format("YYYY-MM-DD"): finish_date;
    let limit = parseInt(param?.limit) || 5;
    let offset = parseInt(param?.offset) || 0;

    let query = `
    SELECT
      produk.produk_name,
      produk.gambar_produk,
      SUM(transaksi.total_harga) as jumlah
    FROM
      transaksi
    INNER JOIN transaksi_detail ON transaksi_detail.id_transaksi = transaksi.id_transaksi
    INNER JOIN produk_variant ON produk_variant.id_produk_variant = transaksi_detail.id_produk_variant
    INNER JOIN produk ON produk.id_produk = produk_variant.id_produk
    WHERE 
      transaksi.tgl_transaksi BETWEEN $start_date AND $end_date
    GROUP BY
      produk.id_produk
    ORDER BY
      jumlah
    DESC
      `;
    if (limit > 0) {
      query += ` LIMIT ` + limit;
    }

    if (offset >= 0) {
      query += ` OFFSET ` + offset;
    }

    let [data] = await sequelize.query(query, {
      bind: { start_date: start_date, end_date: end_date },
    });

    res.status(200).json({
      status: true,
      data: data,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

module.exports = {
  grossSales,
  netSales,
  countTransaction,
  hourlyGrossSalesAmount,
  topItem,
  topItemByVolume,
  topItemBySales,
};
