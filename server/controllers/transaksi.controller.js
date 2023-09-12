const { json } = require("body-parser");
const { sequelize } = require("../models/index.js");

// GET untuk menampilkan data
const get = async (req, res) => {

  res.status(200).json({
    status: true,
    data: {
      count: 15,
      rows: [
        {
          id_transaksi: "1",
          nomor_transaksi: "454353523",
          id_promo: "1",
          jumlah: "2",
          total: "10000",
          id_produk: "1",
        }
      ]
    }
  })
};

//GET BY ID untuk GET single data
const getById = async (req, res) => {
  res.status(200).json(
    {
      status: true,
      data: {
        id_transaksi: "1",
        nomor_transaksi: "454353523",
        id_promo: "1",
        jumlah: "2",
        total: "10000",
        id_produk: "1",
      }
    }
  )
};

//STORE untuk insert data
const store = async (req, res) => { 
  try {

    req.status(201).json(
      {
        status: true,
        data: {
          id_transaksi: "1",
          nomor_transaksi: "454353523",
          id_promo: "1",
          jumlah: "2",
          total: "10000",
          id_produk: "1",
        }
      }
    )
    
  } catch (error) {
    res.status(500).json(
      {
        status :false,
        messasge: error.messasge
      }
    )
  }
};

//UPDATE untuk update data
const update = async (req, res) => {
  try {

    req.status(201).json(
      {
        status: true,
        data: {
          id_transaksi: "1",
          nomor_transaksi: "454353523",
          id_promo: "1",
          jumlah: "2",
          total: "10000",
          id_produk: "1",
        }
      }
    )
    
  } catch (error) {
    res.status(500).json(
      {
        status :false,
        messasge: error.messasge
      }
    )
  }
};

//DESTROY untuk delete data
const destroy = async (req, res) => {
  try {

    req.status(201).json(
      {
        status: true,
        data: {
          id_transaksi: "1",
          nomor_transaksi: "454353523",
          id_promo: "1",
          jumlah: "2",
          total: "10000",
          id_produk: "1",
        }
      }
    )
    
  } catch (error) {
    res.status(500).json(
      {
        status :false,
        messasge: error.messasge
      }
    )
  }
};

module.exports = {
  get,
  getById,
  store,
  update,
  destroy,
};
