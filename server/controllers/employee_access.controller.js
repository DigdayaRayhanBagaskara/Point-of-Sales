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
          id_employee_access: "1",
          id_employee: "popi pipopo",
          createAt: "2023-08-24T19:00:35.000Z",
          updatedAt: "2023-08-24T19:00:35.000Z",
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
          id_employee_access: "1",
          id_employee: "popi pipopo",
          createAt: "2023-08-24T19:00:35.000Z",
          updatedAt: "2023-08-24T19:00:35.000Z",
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
          id_employee_access: "1",
          id_employee: "popi pipopo",
          createAt: "2023-08-24T19:00:35.000Z",
          updatedAt: "2023-08-24T19:00:35.000Z",
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
          id_employee_access: "1",
          id_employee: "popi pipopo",
          createAt: "2023-08-24T19:00:35.000Z",
          updatedAt: "2023-08-24T19:00:35.000Z",
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
          id_employee_access: "1",
          id_employee: "popi pipopo",
          createAt: "2023-08-24T19:00:35.000Z",
          updatedAt: "2023-08-24T19:00:35.000Z",
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
