const { json } = require("body-parser");
const moment = require('moment'); // For date formatting
const { sequelize } = require("../models/index.js");

// GET untuk menampilkan dataa
const get = async (req, res) => {
  try {
    const param = req.query;

    let keyword = param?.keyword || ``;
    let limit = parseInt(param?.limit) || 5;
    let offset = parseInt(param?.offset) || 0;
    
    // Start Query untuk menampilkan seluruh data
      let query = `SELECT * FROM employee`;

      if (keyword.length > 0) {
        query += ` 
          WHERE 
            id_employee LIKE $keyword OR
            id_outlet LIKE $keyword OR
            name LIKE $keyword OR
            agama LIKE $keyword OR
            status LIKE $keyword 
        `;
      }

      if (limit > 0) {
        query += ` LIMIT ` + limit;
      }

      if (offset >= 0) {
        query += ` OFFSET ` + offset;
      }

      const [rows] = await sequelize.query(query, {
        bind : { keyword : `%${keyword}%` }
      });
    // End Query untuk menampilkan seluruh data
    
    // Start Query untuk menghitung jumlah seluruh data
      let countQuery = `SELECT COUNT(employee.id_employee) AS count FROM employee`;
      
      if (keyword.length > 0) {
        countQuery += ` 
        WHERE 
        id_employee LIKE $keyword OR
        id_outlet LIKE $keyword OR
        name LIKE $keyword OR
        agama LIKE $keyword OR
        status LIKE $keyword 
    `;
      }
      const [count] = await sequelize.query(countQuery, {
        bind : { keyword : `%${keyword}%` }
      });
    // End Query untuk menghitung jumlah seluruh data
    
    res.status(200).json({
      status: true,
      data: {
        total_row: count[0] ? count[0].count : 0,
        limit: limit,
        offset: offset,
        rows: rows, 
      }
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
      data: [],
    });
  }
};


//GET BY ID untuk GET single dataa
const getById = async (req, res) => {
  try {
    const employeeId = req.params.id;

    let query = `SELECT * FROM employee WHERE id_employee = $id_employee`;
    const [employee] = await sequelize.query(query, {  
      bind: { 
      id_employee : employeeId
    }
      });
  

    if (employee.length > 0) {
      res.status(200).json({
        status: true,
        message: 'MENDAPATKAN DATA pengguna',
        data: employee.map((Idemployee) => ({
          ...Idemployee,
          last_login: moment(Idemployee.last_login).format('YYYY-MM-DD HH:mm:ss'),
        })),
      });
    } else {
      res.status(404).json({
        status: false,
        message: 'DATA pengguna dengan ID ' + employeeId + ' TIDAK DITEMUKAN', // Menggunakan id_users di sini
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

//STORE untuk insert dataa
const store = async (req, res) => {
  try {
    const param = req.body;

    const createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
    const updatedAt = createdAt;
    const lastLogin = createdAt;

    let query = `INSERT INTO employee (
      id_outlet, name, agama, status, alamat, created_at, updated_at
      ) VALUES (
      $id_outlet, $name, $agama, $status, $alamat, $created_at, $updated_at
    )`;

    const [result_id] = await sequelize.query(query, {
      bind: {
        id_outlet: param.id_outlet,
        name: param.name, // Use the hashed password here
        agama: param.agama,
        status: param.status,
        alamat: param.alamat,
        created_at: createdAt,
        updated_at: null,
      },
    });

    return res.status(201).json({
      status: true,
      message: 'ADD employee SUCCESS',
      data: {
        id: result_id,
        ...param,
        updated_at: null,
      },
    });
  } catch (err) {
    console.log(err);
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
    const employeeId  = req.params.id;

    const updateat = moment().format('YYYY-MM-DD HH:mm:ss');
      
    if (employeeId) {
      const query = `UPDATE employee SET  
      id_outlet = $id_outlet, 
      name = $name, 
      agama = $agama,
      status = $status,
      updated_at = $updateAt
      WHERE id_employee = ${parseInt(employeeId)}`;
      
      const [result] = await sequelize.query(query, {
        bind: {
          id_outlet: req.body?.id_outlet,
          name: req.body?.name,
          agama: req.body?.agama,
          status: req.body?.status,
          updateAt: updateat
        }
      });

      if (result.affectedRows > 0) {
        res.status(200).json({
          status: true,
          message: 'UPDATE SUCCESS',
          data: result,
        });
      } else {
        res.status(404).json({
          status: false,
          message: 'UPDATE FAILED',
        });
      }
    } else {
      res.status(500).json({
        status: false,
        message: `NO USER WITH ID ${employeeId}`,
      });
    }
  } catch (err) {
    console.log(err);
    let validationError = JSON.parse(JSON.stringify(err))?.original;

    res.status(500).json({
      status: false,
      message: validationError?.sqlMessage || err.message,
    });
  }
}

//DESTROY untuk delete data
const destroy = async (req, res) => {
  try {
    const employeeId  = req.params.id;

    if (employeeId) {
      const query = `DELETE FROM employee WHERE id_employee = ${employeeId}`;
      const [result] = await sequelize.query(query);

      if (result?.affectedRows > 0) {
        res.status(200).json({
          status: true,
          message: 'SUCCESS DELETE DATA employee',
        });
      } else {
        res.status(404).json({
          status: false,
          message: `NO USER WITH ID ${employeeId}`,
        });
      }
    } else {
      res.status(500).json({
        status: false,
        message: 'INVALID USER ID',
      });
    }
  } catch (err) {
    console.log(err);
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