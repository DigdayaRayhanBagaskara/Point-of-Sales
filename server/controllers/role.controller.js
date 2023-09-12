const { sequelize } = require('../models/index.js');
const moment = require('moment'); // For date formatting
const config = require('../config/config.js')
// const localForage = require('localforage');

// @route     GET /api/users/Role
// @desc      Show All Roles
// @access    Public
const get = async (req, res) => {
  try {
    const param = req.query;
    let keyword = param?.keyword || ``;
    let limit = parseInt(param?.limit) || 5;
    let offset = parseInt(param?.offset) || 0;

    let query = `SELECT * FROM role`;

    if (keyword.length > 0) {
      query += ` 
        WHERE 
          nama_role LIKE '%${keyword}%'
      `;
    }

    if (limit > 0) {
      query += " LIMIT " + limit;
    }

    if (offset >= 0) {
      query += " OFFSET " + offset;
    }

    const [rows] = await sequelize.query(query);
    

    const count = rows.length;
    const data = {
      total_row: count,
      limit: limit,
      offset: offset,
      rows: rows,
    };

    res.status(201).json({
      status: true,
      message: "GET DATA users",
      data: data,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
      data: [],
    });
  }
};
// @route     store /api/users/Role/
// @desc      Show All Roles
// @access    Public
const store = async (req, res) => {
  try {
    const param = req.body;
    
    let createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
    let updatedAt = createdAt;

    let query = `INSERT INTO role (nama_role, create_at, updated_at) VALUES (
      $nama_role, $created_at, $updated_at)`;
    //
    const [result_id] = await sequelize.query(query, {
      bind: {
        nama_role: param.nama_role,
        created_at: createdAt,
        updated_at: null,
      },
    });
    return res.status(201).json({
      status: true,
      message: 'ADD ROLE SUCCESS',
      data: {
        id: result_id,
        ...param,
        created_at: createdAt,
        updated_at: null,
      },
    });

    // const allUsername = users.map(user => {
    //   user.username
    // })

  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
}
// @route     GetByIdRole /api/users/Role/:Id
// @desc      Show All Roles
// @access    Public
const getById = async (req, res) => {
  try {
    const roleId = req.params.id;

    let query = `SELECT * FROM role WHERE id_rol = $id_rol`;
    const [role] = await sequelize.query(query, {  
      bind: { 
      id_rol : roleId
    }
      });
  
    if (role.length > 0) {
      res.status(200).json({
        status: true,
        message: 'MENDAPATKAN DATA pengguna',
        data: role.map((rol) => ({
          ...rol,
          last_login: moment(rol.last_login).format('YYYY-MM-DD HH:mm:ss'),
        })),
      });
    } else {
      res.status(404).json({
        status: false,
        message: 'DATA pengguna dengan ID ' + roleId + ' TIDAK DITEMUKAN', // Menggunakan id_users di sini
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
// @route     UpdateRole /api/users/Role/:id
// @desc      Show All Roles
// @access    Public
const update = async (req, res) => {
  try {
    const roleId  = req.params.id;

    const updateat = moment().format('YYYY-MM-DD HH:mm:ss');

    if (roleId) {
      const query = `UPDATE role SET nama_role = $nama_role,
      updated_at = $updateAt
      WHERE id_rol = ${parseInt(roleId)}`;
      
      const [result] = await sequelize.query(query, {
        bind: {
          nama_role: req.body?.nama_role,
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
        message: `NO USER WITH ID ${roleId}`,
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

// @route     Delete /api/users/Role/:id
// @desc      Show All Roles
// @access    Public
const destroy = async (req, res) => {
  try {
    const roleId  = req.params.id;

    if (roleId) {
      const query = `DELETE FROM role WHERE id_rol = ${roleId}`;
      const [result] = await sequelize.query(query);

      if (result?.affectedRows > 0) {
        res.status(200).json({
          status: true,
          message: 'SUCCESS DELETE DATA role',
        });
      } else {
        res.status(404).json({
          status: false,
          message: `NO ROLE WITH ID ${roleId}`,
        });
      }
    } else {
      res.status(500).json({
        status: false,
        message: 'INVALID role ID',
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
    destroy
  }
