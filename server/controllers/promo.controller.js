const { mappingQueryArrayReturn } = require("../helpers/utility.js");
const { sequelize } = require("../models/index.js");

// GET untuk menampilkan data
const get = async (req, res) => {
  try {
    const param = req.query;

    let keyword = param?.keyword || ``;
    let limit = parseInt(param?.limit) || 5;
    let offset = parseInt(param?.offset) || 0;

    // Start Query untuk menampilkan seluruh data
      let query = `
        SELECT
          promo.*, 
          produk_categories.id_categories AS 'produk_categories.id_categories' ,
          produk_categories.categories_name AS 'produk_categories.categories_name' ,
          produk_categories.keterangan AS 'produk_categories.keterangan' ,
          produk_categories.model AS 'produk_categories.model' ,
          produk.id_outlet AS 'produk.id_outlet' ,
          produk.id_categories AS 'produk.id_categories' ,
          produk.id_brand AS 'produk.id_brand' ,
          produk.produk_name AS 'produk.produk_name' ,
          produk.gambar_produk AS 'produk.gambar_produk' ,
          produk.description AS 'produk.description' ,
          brands_produk.id_brands_produk AS 'brands_produk.id_brands_produk' ,
          brands_produk.brand_name AS 'brands_produk.brand_name' ,
          brands_produk.keterangan AS 'brands_produk.keterangan' ,
          brands_produk.asal_brand AS 'brands_produk.asal_brand' ,
          discount.id_discount AS 'discount.id_discount' ,
          discount.discount_names AS 'discount.discount_names' ,
          discount.discount_type AS 'discount.discount_type' ,
          discount.amount AS 'discount.amount' ,
          discount.persen AS 'discount.persen' ,
          discount.expired AS 'discount.expired' ,
          produk_variant.id_produk_variant AS 'produk_variant.id_produk_variant' ,
          produk_variant.id_produk AS 'produk_variant.id_produk' ,
          produk_variant.variant_name AS 'produk_variant.variant_name' ,
          produk_variant.harga_produk AS 'produk_variant.harga_produk' ,
          produk_variant.sku AS 'produk_variant.sku' ,
          produk_variant.stok AS 'produk_variant.stok' ,
          produk_variant.min_stok AS 'produk_variant.min_stok' ,
          outlet.id_outlet AS 'produk.outlet_id_outlet' ,
          outlet.nama_outlet AS 'produk.outlet_nama_outlet' ,
          outlet.tlp AS 'produk.outlet_tlp' ,
          outlet.alamat AS 'produk.outlet_alamat' 
        FROM
          promo
        INNER JOIN discount ON promo.id_discount = discount.id_discount
        LEFT JOIN produk_categories ON promo.id_categories = produk_categories.id_categories
        LEFT JOIN produk ON promo.id_produk = produk.id_produk
        LEFT JOIN brands_produk ON promo.id_brands_produk = brands_produk.id_brands_produk
        LEFT JOIN produk_variant ON promo.id_produk_variant = produk_variant.id_produk_variant
        LEFT JOIN outlet ON produk.id_outlet = outlet.id_outlet
      `;

      if (keyword.length > 0) {
        query += ` 
        WHERE 
        promo.name LIKE $keyword OR
        discount.discount_names LIKE $keyword OR
        produk_categories.categories_name LIKE $keyword OR
        brands_produk.brand_name LIKE $keyword OR
        outlet.nama_outlet LIKE $keyword OR
        produk.produk_name LIKE $keyword 
        `;
      }

      if (limit > 0) {
        query += ` LIMIT ` + limit;
      }

      if (offset >= 0) {
        query += ` OFFSET ` + offset;
      }

      const [x] = await sequelize.query(query, {
        bind : { keyword : `%${keyword}%` }
      });
      const z = await mappingQueryArrayReturn(x);
      let rows = [];
      for (let row of z) {
        if(row.discount.length == 1){
          row.discount = row.discount.length == 0 ? {} : row.discount[0];
        }
        if(row.produk.length == 1){
          row.produk = row.produk.length == 0 ? {} : row.produk[0];
        }
        if(row.produk_categories.length == 1){
          row.produk_categories = row.produk_categories.length == 0 ? {} : row.produk_categories[0];
        }
        if(row.produk_variant.length == 1){
          row.produk_variant = row.produk_variant.length == 0 ? {} : row.produk_variant[0];
        }
        if(row.brands_produk.length == 1){
          row.brands_produk = row.brands_produk.length == 0 ? {} : row.brands_produk[0];
        }
        rows.push(row);
      }
    // End Query untuk menampilkan seluruh data

    // Start Query untuk menghitung jumlah seluruh data
      let countQuery = `
        SELECT 
          COUNT(promo.id_promo) AS count
        FROM 
          promo 
        INNER JOIN discount ON promo.id_discount = discount.id_discount
        LEFT JOIN produk_categories ON promo.id_categories = produk_categories.id_categories
        LEFT JOIN produk ON promo.id_produk = produk.id_produk
        LEFT JOIN brands_produk ON promo.id_brands_produk = brands_produk.id_brands_produk
        LEFT JOIN produk_variant ON promo.id_produk_variant = produk_variant.id_produk_variant
        LEFT JOIN outlet ON produk.id_outlet = outlet.id_outlet 
      `;
      if (keyword.length > 0) {
        countQuery += ` 
        WHERE 
          promo.name LIKE $keyword OR
          discount.discount_names LIKE $keyword OR
          produk_categories.categories_name LIKE $keyword OR
          brands_produk.brand_name LIKE $keyword OR
          outlet.nama_outlet LIKE $keyword OR
          produk.produk_name LIKE $keyword 
        `;
      }
      const [count] = await sequelize.query(countQuery, {
        bind : { keyword : `%${keyword}%` }
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

//GET BY ID untuk GET single data
const getById = async (req, res) => {
  try {
    const id_promo = req.params?.id;

    // Start Query untuk menampilkan seluruh data
      let query = `
        SELECT
          promo.*, 
          produk_categories.id_categories AS 'produk_categories.id_categories' ,
          produk_categories.categories_name AS 'produk_categories.categories_name' ,
          produk_categories.keterangan AS 'produk_categories.keterangan' ,
          produk_categories.model AS 'produk_categories.model' ,
          produk.id_outlet AS 'produk.id_outlet' ,
          produk.id_categories AS 'produk.id_categories' ,
          produk.id_brand AS 'produk.id_brand' ,
          produk.produk_name AS 'produk.produk_name' ,
          produk.gambar_produk AS 'produk.gambar_produk' ,
          produk.description AS 'produk.description' ,
          brands_produk.id_brands_produk AS 'brands_produk.id_brands_produk' ,
          brands_produk.brand_name AS 'brands_produk.brand_name' ,
          brands_produk.keterangan AS 'brands_produk.keterangan' ,
          brands_produk.asal_brand AS 'brands_produk.asal_brand' ,
          discount.id_discount AS 'discount.id_discount' ,
          discount.discount_names AS 'discount.discount_names' ,
          discount.discount_type AS 'discount.discount_type' ,
          discount.amount AS 'discount.amount' ,
          discount.persen AS 'discount.persen' ,
          discount.expired AS 'discount.expired' ,
          produk_variant.id_produk_variant AS 'produk_variant.id_produk_variant' ,
          produk_variant.id_produk AS 'produk_variant.id_produk' ,
          produk_variant.variant_name AS 'produk_variant.variant_name' ,
          produk_variant.harga_produk AS 'produk_variant.harga_produk' ,
          produk_variant.sku AS 'produk_variant.sku' ,
          produk_variant.stok AS 'produk_variant.stok' ,
          produk_variant.min_stok AS 'produk_variant.min_stok' ,
          outlet.id_outlet AS 'produk.outlet_id_outlet' ,
          outlet.nama_outlet AS 'produk.outlet_nama_outlet' ,
          outlet.tlp AS 'produk.outlet_tlp' ,
          outlet.alamat AS 'produk.outlet_alamat' 
        FROM
          promo
        INNER JOIN discount ON promo.id_discount = discount.id_discount
        LEFT JOIN produk_categories ON promo.id_categories = produk_categories.id_categories
        LEFT JOIN produk ON promo.id_produk = produk.id_produk
        LEFT JOIN brands_produk ON promo.id_brands_produk = brands_produk.id_brands_produk
        LEFT JOIN produk_variant ON promo.id_produk_variant = produk_variant.id_produk_variant
        LEFT JOIN outlet ON produk.id_outlet = outlet.id_outlet
        WHERE 
          id_promo = $id_promo
      `;

      const [x] = await sequelize.query(query, {
        bind : {id_promo : id_promo}
      });
      const z = await mappingQueryArrayReturn(x);
      let data = [];
      for (let row of z) {
        if(row.discount.length == 1){
          row.discount = row.discount.length == 0 ? {} : row.discount[0];
        }
        if(row.produk.length == 1){
          row.produk = row.produk.length == 0 ? {} : row.produk[0];
        }
        if(row.produk_categories.length == 1){
          row.produk_categories = row.produk_categories.length == 0 ? {} : row.produk_categories[0];
        }
        if(row.produk_variant.length == 1){
          row.produk_variant = row.produk_variant.length == 0 ? {} : row.produk_variant[0];
        }
        if(row.brands_produk.length == 1){
          row.brands_produk = row.brands_produk.length == 0 ? {} : row.brands_produk[0];
        }
        data.push(row);
      }
    // Start Query untuk menampilkan seluruh data
    
    if (data.length > 0) {
      res.status(200).json({
        status: true,
        data: data[0],
      });
    } else {
      res.status(404).json({
        status: false,
        message: `DATA PROMO ${id_promo} TIDAK DI TEMUKAN`,
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

    let query = `INSERT INTO promo (
      promo_type,id_categories,id_produk,id_produk_variant,name,id_brands_produk,expired,created_at,updated_at
      )
      VALUES
      (
        $promo_type,$id_categories,$id_produk,$id_produk_variant,$name,$id_brands_produk,$expired,NOW(),NOW()
      )`;

    const [result_id] = await sequelize.query(query, {
      bind: param,
    });
    res.status(200).json({
      status: true,
      data: { id_promo: result_id, ...param },
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
    const id_promo = req.params.id;

    let set_update = [];

    for (let item in param) {
      set_update.push(`${item} = $${item}`);
    }

    if (set_update.length) {
      set_update.push(`updated_at = NOW()`);
      let query = `UPDATE promo SET ${set_update.join(`,`)} WHERE id_promo = $id_promo`;

      const [result_id] = await sequelize.query(query, {
        bind: { id_promo: id_promo, ...param },
      });

      res.status(200).json({
        status: true,
        data: { id_promo: id_promo, ...param },
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
    const id_promo = req.params?.id;
    let query = `DELETE FROM promo WHERE id_promo = $id_promo`;

    const [result] = await sequelize.query(query, {
      bind: { id_promo: id_promo },
    });

    if (result?.affectedRows > 0) {
      res.status(200).json({
        status: true,
        data: { id_promo: id_promo },
      });
    } else {
      res.status(404).json({
        status: false,
        message: `DATA PROMO ${id_promo} TIDAK DI TEMUKAN`,
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
