const Sequelize = require('sequelize');
const { sequelize, db } = require("../models/index.js");
const { mappingQueryArrayReturn } = require("../helpers/utility.js");
const multer = require("multer");
const path = require("path");

//Memindahkan file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      path.parse(file.originalname).name +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });
//END memindahkan file

// GET untuk menampilkan data
const get = async (req, res) => {
  try {
    const param = req.query;
    let id_categories = param?.id_categories || ``;
    let id_brand = param?.id_brand || ``;
    let keyword = param?.keyword || ``;
    let limit = parseInt(param?.limit) || 5;
    let offset = parseInt(param?.offset) || 0;

    let query = ` 
      SELECT 
      produk.*,
      outlet.id_outlet AS 'outlet.id_outlet',
      outlet.nama_outlet AS 'outlet.nama_outlet',
      outlet.tlp AS 'outlet.tlp',
      outlet.created_at AS 'outlet.create_at',
      outlet.updated_at AS 'outlet.updated_at',
      produk_categories.id_categories AS 'produk_categories.id_categories',
      produk_categories.categories_name AS 'produk_categories.categories_name',
      produk_categories.keterangan AS 'produk_categories.keterangan',
      produk_categories.model AS 'produk_categories.model',
      produk_categories.created_at AS 'produk_categories.created_at',
      produk_categories.updated_at AS 'produk_categories.updated_at',
      brands_produk.id_brands_produk AS 'brands_produk.id_brands_produk',
      brands_produk.brand_name AS 'brands_produk.brand_name',
      brands_produk.keterangan AS 'brands_produk.keterangan',
      brands_produk.asal_brand AS 'brands_produk.asal_brand',
      brands_produk.created_at AS 'brands_produk.created_at',
      brands_produk.updated_at AS 'brands_produk.updated_at',
      produk_variant.id_produk AS 'produk_variant.id_produk',
      produk_variant.variant_name AS 'produk_variant.variant_name',
      produk_variant.harga_produk AS 'produk_variant.harga_produk'
      FROM produk 
      LEFT JOIN outlet ON produk.id_outlet = outlet.id_outlet
      LEFT JOIN produk_categories ON produk.id_categories = produk_categories.id_categories
      LEFT JOIN brands_produk ON produk.id_brand = brands_produk.id_brands_produk
      LEFT JOIN produk_variant ON produk.id_produk = produk_variant.id_produk
    `;

    let query_count = `
    SELECT COUNT(produk.id_produk) as count FROM produk LEFT JOIN outlet ON produk.id_outlet = outlet.id_outlet LEFT JOIN produk_categories ON produk.id_categories = produk_categories.id_categories LEFT JOIN brands_produk ON produk.id_brand = brands_produk.id_brands_produk LEFT JOIN produk_variant ON produk.id_produk = produk_variant.id_produk `;



    let queryfilterIdCategories = `WHERE produk_categories.id_categories = $id_categories`;
    let queryfilterIdbrand = `WHERE brands_produk.id_brands_produk = $id_brand`;



    if (keyword.length > 0) {
      let q_keyword = `WHERE produk_name LIKE $keyword`;
      query += q_keyword;
      query_count += q_keyword;
    }

    if (id_categories !== '' ) {
      query += queryfilterIdCategories
    }

    if (id_brand !== '' ) {
      query += queryfilterIdbrand
    }
    
    if (limit > 0) {
      query += " LIMIT " + limit;
    }

    if (offset >= 0) {
      query += " OFFSET " + offset;
    }

    const [x] = await sequelize.query(query, {
      bind: {
        keyword: `%${keyword}%`,
        id_categories: id_categories,
        id_brand: id_brand,
      },
    });


    const [total_rows] = await sequelize.query(query_count, {
      bind: { keyword: `%${keyword}%` },
    });




    const z = await mappingQueryArrayReturn(x);
    let rows = [];
    for (let row of z) {
      if (row.produk_categories.length == 1) {
        row.produk_categories =
          row.produk_categories.length == 0 ? {} : row.produk_categories[0];
      }
      if (row.outlet.length == 1) {
        row.outlet = row.outlet.length == 0 ? {} : row.outlet[0];
      }
      if (row.brands_produk.length == 1) {
        row.brands_produk =
          row.brands_produk.length == 0 ? {} : row.brands_produk[0];
      }

      rows.push(row);
    }

    const count = rows.length;

    res.status(201).json({
      status: true,
      message: "GET DATA PRODUK",
      data: {
        total_row: total_rows[0].count,
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
    const id = req.params?.id;
    let query =
      `SELECT 
      produk.*,
      outlet.id_outlet AS 'outlet.id_outlet',
      outlet.nama_outlet AS 'outlet.nama_outlet',
      outlet.tlp AS 'outlet.tlp',
      outlet.created_at AS 'outlet.create_at',
      outlet.updated_at AS 'outlet.updated_at',
      produk_categories.id_categories AS 'produk_categories.id_categories',
      produk_categories.categories_name AS 'produk_categories.categories_name',
      produk_categories.keterangan AS 'produk_categories.keterangan',
      produk_categories.model AS 'produk_categories.model',
      produk_categories.created_at AS 'produk_categories.created_at',
      produk_categories.updated_at AS 'produk_categories.updated_at',
      brands_produk.id_brands_produk AS 'brands_produk.id_brands_produk',
      brands_produk.brand_name AS 'brands_produk.brand_name',
      brands_produk.keterangan AS 'brands_produk.keterangan',
      brands_produk.asal_brand AS 'brands_produk.asal_brand',
      brands_produk.created_at AS 'brands_produk.created_at',
      brands_produk.updated_at AS 'brands_produk.updated_at',
      produk_variant.id_produk AS 'produk_variant.id_produk',
      produk_variant.variant_name AS 'produk_variant.variant_name',
      produk_variant.harga_produk AS 'produk_variant.harga_produk'
      FROM produk 
      JOIN outlet ON produk.id_outlet = outlet.id_outlet
      JOIN produk_categories ON produk.id_categories = produk_categories.id_categories
      JOIN brands_produk ON produk.id_brand = brands_produk.id_brands_produk 
      LEFT JOIN produk_variant ON produk.id_produk = produk_variant.id_produk WHERE produk.id_produk =` +
      id;
    const [x] = await sequelize.query(query);

    // console.log(z);

    const z = await mappingQueryArrayReturn(x);

    let v = [];
    for (let row of z) {
      if (row.produk_categories.length == 1) {
        row.produk_categories =
          row.produk_categories.length == 0 ? {} : row.produk_categories[0];
      }
      if (row.outlet.length == 1) {
        row.outlet = row.outlet.length == 0 ? {} : row.outlet[0];
      }
      if (row.brands_produk.length == 1) {
        row.brands_produk =
          row.brands_produk.length == 0 ? {} : row.brands_produk[0];
      }

      v.push(row);
    }

    const count = v.length;

    if (v.length > 0) {
      Object.keys(v).forEach(function (key) {
        let rows = v[key];
        res.status(201).json({
          status: true,
          message: "GET DATA PRODUK",
          data: {
            count: count,
            rows: rows,
          },
        });
      });
    } else {
      res.status(404).json({
        status: false,
        message: "DATA PRODUK " + id + " TIDAK DI TEMUKAN",
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
    const gambar_produk = req.body.gambar_produk;
    // ? req.protocol +
    //   "://" +
    //   req.get("host") +
    //   "/uploads/" +
    //   req.body.gambar_produk
    // : "";

    let query = `INSERT INTO produk (
      id_outlet, id_categories, id_brand, produk_name, gambar_produk, description, created_at, updated_at
    ) 
    VALUES (
      $id_outlet, $id_categories, $id_brand, $produk_name, $gambar_produk, $description, NOW(), NOW()
    )`;

    const [result_id] = await sequelize.query(query, {
      bind: param ,
    });

    const insert_variants = param?.variants.map((row) => {
      row.id_produk = result_id;
      return row;
    });

    db.produk_variant.bulkCreate(insert_variants);

    res.status(201).json({
      status: true,
      message: "SUCCESS TAMBAH DATA PRODUK",
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


const update = async (req, res) => {
  try {
  

    const param = req.body;
    const id_variant = req.body.variants[0].id_produk_variant;
    const id = req.params.id;

    let set_update = [];

    for (let item in param) {
      set_update.push(`${item} = $${[item]}` );
    }


    let sq = `SELECT id_produk_variant FROM produk_variant`;

    const select = await sequelize.query(sq, {
      type: Sequelize.QueryTypes.SELECT
    })

    // const arr = [].concat(select)

    param["id_variant_database"] = select;
    // let final = arr.concat(variant);

  //   const arrayToObject = (array) =>
  //   array.reduce((obj, item) => {
  //     obj[item.id_produk_variant] = item
  //     return obj
  //   }, {})
  
  // console.log(arrayToObject(param.variants))
  
  // const newData = param?.body?.id_variant_database?.map(item => {
  //   return {
  //     data: item.id_produk_variant.arrayToObject(param?.body?.id_variant_database)[i]
  //   }
  // })
  
  // console.log(newData)



    // if (set_update.length) {
      
    //   if (variant) {
    //     let query = `UPDATE produk SET ${set_update} WHERE id_produk = $id`;

    //     const [result_id] = await sequelize.query(query, {
    //       bind: { id: id, variant,  ...param},
    //     });


    //     const update_variants = param?.variants.map((row) => {
    //       row.id_produk = result_id;
    //       return row;
    //     });
  
    //     console.log(update);
    
    //     db.produk_variant.bulkCreate(update_variants);
    //   }



    //   res.status(201).json({
    //     status: true,
    //     message: "SUCCESS UBAH DATA BRANDS PRODUK",
    //     data: { id: id, ...param },
    //   });
    // } else {
    //   res.status(500).json({
    //     status: false,
    //     message: "DATA BRANDS PRODUK YANG DITUJU TIDAK ADA",
    //   });
    // }



   

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
    let query = `DELETE FROM produk WHERE id_produk = $id`;

    const [result] = await sequelize.query(query, {
      bind: { id: id },
    });


    if (result?.affectedRows > 0) {
      
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
  get,
  getById,
  store,
  update,
  destroy,
  upload,
};

