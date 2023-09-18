const { mappingQueryArrayReturn } = require("../helpers/utility.js");
const { sequelize } = require("../models/index.js");
const moment = require('moment');
const excelJs = require('exceljs');

const salesSummary = async (req, res) => {
  try{
    const param = req.query;

    let start_date = param?.start_date ? moment(param?.start_date).format('YYYY-MM-DD') : moment().startOf("month").format("YYYY-MM-DD");
    let end_date = param?.end_date ? moment(param?.end_date).format('YYYY-MM-DD') : moment().endOf("month").format("YYYY-MM-DD");

    // Start Query untuk menampilkan seluruh data
      let query = `
      SELECT
        SUM(transaksi.total_harga) as gross_sales,
        SUM(discount.amount) as discount,
        SUM(transaksi.total_harga - discount.amount) as net_sales
      FROM
        transaksi
      LEFT JOIN discount ON transaksi.id_discount = discount.id_discount
      WHERE
        transaksi.tgl_transaksi BETWEEN $start_date AND $end_date 
      `;

      const [rows] = await sequelize.query(query, {
        bind : { start_date : start_date, end_date : end_date }
      });
      
    // End Query untuk menampilkan seluruh data

    // Start Query untuk menghitung jumlah seluruh data
      let countQuery = `
        SELECT 
          COUNT(transaksi.id_transaksi) AS count
        FROM 
          transaksi
        LEFT JOIN discount ON transaksi.id_discount = discount.id_discount 
        WHERE
          transaksi.tgl_transaksi BETWEEN $start_date AND $end_date `;

      const [count] = await sequelize.query(countQuery, {
        bind : { start_date : start_date, end_date : end_date }
      });
    // End Query untuk menghitung jumlah seluruh data

    res.status(200).json({
      status: true,
      data: {
        count: count[0] ? count[0].count : 0,
        rows: rows, 
      }
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};
const grossProfit = async (req, res) => {
  try{
    const param = req.query;

    let start_date = param?.start_date ? moment(param?.start_date).format('YYYY-MM-DD') : moment().startOf("month").format("YYYY-MM-DD");
    let end_date = param?.end_date ? moment(param?.end_date).format('YYYY-MM-DD') : moment().endOf("month").format("YYYY-MM-DD");

    // Start Query untuk menampilkan seluruh data
      let query = `
      SELECT
        SUM(transaksi.total_harga) as gross_sales,
        SUM(discount.amount) as discount,
        SUM(transaksi_detail.jumlah_produk * produk_variant.harga_modal) as modal,
        SUM(transaksi.total_harga - discount.amount - (transaksi_detail.jumlah_produk * produk_variant.harga_modal)) as profit
      FROM
        transaksi
      INNER JOIN transaksi_detail ON transaksi_detail.id_transaksi = transaksi.id_transaksi
      INNER JOIN produk_variant ON transaksi_detail.id_produk_variant = produk_variant.id_produk_variant
      LEFT JOIN discount ON transaksi.id_discount = discount.id_discount
      WHERE
        transaksi.tgl_transaksi BETWEEN $start_date AND $end_date 
      `;

      const [rows] = await sequelize.query(query, {
        bind : { start_date : start_date, end_date : end_date }
      });
      
    // End Query untuk menampilkan seluruh data

    // Start Query untuk menghitung jumlah seluruh data
      let countQuery = `
        SELECT 
          COUNT(transaksi.id_transaksi) AS count
        FROM 
          transaksi
        INNER JOIN transaksi_detail ON transaksi_detail.id_transaksi = transaksi.id_transaksi
        INNER JOIN produk_variant ON transaksi_detail.id_produk_variant = produk_variant.id_produk_variant
        LEFT JOIN discount ON transaksi.id_discount = discount.id_discount
        WHERE
          transaksi.tgl_transaksi BETWEEN $start_date AND $end_date `;

      const [count] = await sequelize.query(countQuery, {
        bind : { start_date : start_date, end_date : end_date }
      });
    // End Query untuk menghitung jumlah seluruh data

    res.status(200).json({
      status: true,
      data: {
        count: count[0] ? count[0].count : 0,
        rows: rows, 
      }
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};
const itemSales = async (req, res) => {
  try{
    const param = req.query;

    let start_date = param?.start_date ? moment(param?.start_date).format('YYYY-MM-DD') : moment().startOf("month").format("YYYY-MM-DD");
    let end_date = param?.end_date ? moment(param?.end_date).format('YYYY-MM-DD') : moment().endOf("month").format("YYYY-MM-DD");

    // Start Query untuk menampilkan seluruh data
      let query = `
      SELECT
        produk.produk_name as produk_name,
        SUM(transaksi.total_harga) as gross_sales,
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

      const [rows] = await sequelize.query(query, {
        bind : { start_date : start_date, end_date : end_date }
      });
      
    // End Query untuk menampilkan seluruh data

    // Start Query untuk menghitung jumlah seluruh data
      let countQuery = `
        SELECT 
          COUNT(produk.id_produk) AS count
        FROM
          transaksi
        INNER JOIN transaksi_detail ON transaksi_detail.id_transaksi = transaksi.id_transaksi
        INNER JOIN produk_variant ON produk_variant.id_produk_variant = transaksi_detail.id_produk_variant
        INNER JOIN produk ON produk.id_produk = produk_variant.id_produk
        WHERE
          transaksi.tgl_transaksi BETWEEN $start_date AND $end_date 
        GROUP BY
          produk.id_produk
        `;

      const [count] = await sequelize.query(countQuery, {
        bind : { start_date : start_date, end_date : end_date }
      });
    // End Query untuk menghitung jumlah seluruh data

    res.status(200).json({
      status: true,
      data: {
        count: count[0] ? count[0].count : 0,
        rows: rows, 
      }
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};
const categorySales = async (req, res) => {
  try{
    const param = req.query;

    let start_date = param?.start_date ? moment(param?.start_date).format('YYYY-MM-DD') : moment().startOf("month").format("YYYY-MM-DD");
    let end_date = param?.end_date ? moment(param?.end_date).format('YYYY-MM-DD') : moment().endOf("month").format("YYYY-MM-DD");

    // Start Query untuk menampilkan seluruh data
      let query = `
      SELECT
        produk_categories.categories_name as categories_name,
        SUM(transaksi_detail.jumlah_produk) as jumlah,
        SUM(transaksi.total_harga) as gross_sales
      FROM
        transaksi
      INNER JOIN transaksi_detail ON transaksi_detail.id_transaksi = transaksi.id_transaksi
      INNER JOIN produk_variant ON produk_variant.id_produk_variant = transaksi_detail.id_produk_variant
      INNER JOIN produk ON produk.id_produk = produk_variant.id_produk
      INNER JOIN produk_categories ON produk_categories.id_categories = produk.id_categories
      WHERE
        transaksi.tgl_transaksi BETWEEN $start_date AND $end_date 
      GROUP BY
        produk_categories.id_categories
      ORDER BY
        jumlah
      DESC
      `;

      const [rows] = await sequelize.query(query, {
        bind : { start_date : start_date, end_date : end_date }
      });
      
    // End Query untuk menampilkan seluruh data

    // Start Query untuk menghitung jumlah seluruh data
      let countQuery = `
        SELECT 
          COUNT(produk_categories.id_categories) AS count
        FROM
          transaksi
        INNER JOIN transaksi_detail ON transaksi_detail.id_transaksi = transaksi.id_transaksi
        INNER JOIN produk_variant ON produk_variant.id_produk_variant = transaksi_detail.id_produk_variant
        INNER JOIN produk ON produk.id_produk = produk_variant.id_produk
        INNER JOIN produk_categories ON produk_categories.id_categories = produk.id_categories
        WHERE
          transaksi.tgl_transaksi BETWEEN $start_date AND $end_date 
        GROUP BY
          produk_categories.id_categories
        `;

      const [count] = await sequelize.query(countQuery, {
        bind : { start_date : start_date, end_date : end_date }
      });
    // End Query untuk menghitung jumlah seluruh data

    res.status(200).json({
      status: true,
      data: {
        count: count[0] ? count[0].count : 0,
        rows: rows, 
      }
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};
const brandSales = async (req, res) => {
  try{
    const param = req.query;

    let start_date = param?.start_date ? moment(param?.start_date).format('YYYY-MM-DD') : moment().startOf("month").format("YYYY-MM-DD");
    let end_date = param?.end_date ? moment(param?.end_date).format('YYYY-MM-DD') : moment().endOf("month").format("YYYY-MM-DD");

    // Start Query untuk menampilkan seluruh data
      let query = `
      SELECT
        brands_produk.brand_name as brand_name,
        SUM(transaksi_detail.jumlah_produk) as jumlah,
        SUM(transaksi.total_harga) as gross_sales
      FROM
        transaksi
      INNER JOIN transaksi_detail ON transaksi_detail.id_transaksi = transaksi.id_transaksi
      INNER JOIN produk_variant ON produk_variant.id_produk_variant = transaksi_detail.id_produk_variant
      INNER JOIN produk ON produk.id_produk = produk_variant.id_produk
      INNER JOIN brands_produk ON brands_produk.id_brands_produk = produk.id_brand
      WHERE
        transaksi.tgl_transaksi BETWEEN $start_date AND $end_date 
      GROUP BY
        brands_produk.id_brands_produk
      ORDER BY
        jumlah
      DESC
      `;

      const [rows] = await sequelize.query(query, {
        bind : { start_date : start_date, end_date : end_date }
      });
      
    // End Query untuk menampilkan seluruh data

    // Start Query untuk menghitung jumlah seluruh data
      let countQuery = `
        SELECT 
          COUNT(brands_produk.id_brands_produk) AS count
        FROM
          transaksi
        INNER JOIN transaksi_detail ON transaksi_detail.id_transaksi = transaksi.id_transaksi
        INNER JOIN produk_variant ON produk_variant.id_produk_variant = transaksi_detail.id_produk_variant
        INNER JOIN produk ON produk.id_produk = produk_variant.id_produk
        INNER JOIN brands_produk ON brands_produk.id_brands_produk = produk.id_brand
        WHERE
          transaksi.tgl_transaksi BETWEEN $start_date AND $end_date 
        GROUP BY
          brands_produk.id_brands_produk
        `;

      const [count] = await sequelize.query(countQuery, {
        bind : { start_date : start_date, end_date : end_date }
      });
    // End Query untuk menghitung jumlah seluruh data

    res.status(200).json({
      status: true,
      data: {
        count: count[0] ? count[0].count : 0,
        rows: rows, 
      }
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};
const discountSales = async (req, res) => {
  try{
    const param = req.query;

    let start_date = param?.start_date ? moment(param?.start_date).format('YYYY-MM-DD') : moment().startOf("month").format("YYYY-MM-DD");
    let end_date = param?.end_date ? moment(param?.end_date).format('YYYY-MM-DD') : moment().endOf("month").format("YYYY-MM-DD");

    // Start Query untuk menampilkan seluruh data
      let query = `
      SELECT
        discount.discount_names as discount_names,
        SUM(transaksi_detail.jumlah_produk) as jumlah,
        SUM(transaksi.total_harga) as gross_sales
      FROM
        transaksi
      INNER JOIN transaksi_detail ON transaksi_detail.id_transaksi = transaksi.id_transaksi
      LEFT JOIN discount ON discount.id_discount = transaksi.id_discount
      WHERE
        transaksi.tgl_transaksi BETWEEN $start_date AND $end_date 
      GROUP BY
        discount.id_discount
      ORDER BY
        jumlah
      DESC
      `;

      const [rows] = await sequelize.query(query, {
        bind : { start_date : start_date, end_date : end_date }
      });
      
    // End Query untuk menampilkan seluruh data

    // Start Query untuk menghitung jumlah seluruh data
      let countQuery = `
        SELECT 
          COUNT(discount.id_discount) AS count
        FROM
          transaksi
        INNER JOIN transaksi_detail ON transaksi_detail.id_transaksi = transaksi.id_transaksi
        LEFT JOIN discount ON discount.id_discount = transaksi.id_discount
        WHERE
          transaksi.tgl_transaksi BETWEEN $start_date AND $end_date 
        GROUP BY
          discount.id_discount
        `;

      const [count] = await sequelize.query(countQuery, {
        bind : { start_date : start_date, end_date : end_date }
      });
    // End Query untuk menghitung jumlah seluruh data

    res.status(200).json({
      status: true,
      data: {
        count: count[0] ? count[0].count : 0,
        rows: rows, 
      }
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

module.exports = {
    salesSummary,
    grossProfit,
    itemSales,
    categorySales,
    brandSales,
    discountSales,
};
