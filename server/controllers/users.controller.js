const { sequelize } = require('../models/index.js');
const moment = require('moment'); // For date formatting
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config.js')
// const localForage = require('localforage');



/*----------------------------------------------------------------
| @route     |    GET  -  POST  -  PUT  -  DELETE
------------------------------------------------------------------
| @desc      |    task that each endpoint is assigned for
------------------------------------------------------------------
| @access    |    public
             |    private --> require an access token and jWTtoken
------------------------------------------------------------------
  */

// @route     POST /api/users/
// @desc      Register new user
// @access    Public
const store = async (req, res) => {
  try {
    const param = req.body;

    let check_user_existence = `SELECT * FROM users WHERE email = $email`;
    const [users] = await sequelize.query(check_user_existence, {
      bind: { email: param.email },
      type: sequelize.QueryTypes.SELECT,
    });

    if (users) {
      return res.status(400).json({ message: 'USER IS ALREADY EXIST' });
    }

    // Hash password using bcrypt
    const hashedPassword = await bcrypt.hash(param.password, 10);

    const createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
    const updatedAt = createdAt;
    const lastLogin = createdAt;

    let query = `INSERT INTO users (
      id_rol, username, password, email, nohp, created_at, updated_at, last_login
    ) VALUES (
      $id_rol, $username, $password, $email, $nohp, $created_at, $updated_at, $last_login
    )`;

    const [result_id] = await sequelize.query(query, {
      bind: {
        id_rol: param.id_rol,
        username: param.username,
        password: hashedPassword, // Use the hashed password here
        email: param.email,
        nohp: param.nohp,
        created_at: createdAt,
        updated_at: null,
        last_login: null,
      },
    });

    return res.status(201).json({
      status: true,
      message: 'ADD USER SUCCESS',
      data: {
        id: result_id,
        ...param,
        created_at: createdAt,
        updated_at: null,
        last_login: null,
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

// @route     GET api/users?keyword=&limit=5&offset=0
// @desc      Get aksjdhfkasdjhfkasjdhfkasjdhf
// @access    Public
const get = async (req, res) => {
  try {
    const param = req.query;

    let keyword = param?.keyword || ``;
    let limit = parseInt(param?.limit) || 5;
    let offset = parseInt(param?.offset) || 0;
    
    // Start Query untuk menampilkan seluruh data
      let query = `SELECT * FROM users`;

      if (keyword.length > 0) {
        query += ` 
          WHERE 
            username LIKE $keyword OR
            email LIKE $keyword OR
            nohp LIKE $keyword 
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
      let countQuery = `SELECT COUNT(users.id_users) AS count FROM users`;
      
      if (keyword.length > 0) {
        countQuery += ` 
        WHERE 
            username LIKE $keyword OR
            email LIKE $keyword OR
            nohp LIKE $keyword 
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


// @route     GET /api/users/:id
// @desc      Get single user profile
// @access    Private
const getById = async (req, res) => {
  try {
    const userId = req.params.id;

    let query = `SELECT * FROM users WHERE id_users = $id_user`;
    const [users] = await sequelize.query(query, {  
      bind: { 
      id_user : userId
    }
      });
  

    if (users.length > 0) {
      res.status(200).json({
        status: true,
        message: 'MENDAPATKAN DATA pengguna',
        data: users.map((user) => ({
          ...user,
          last_login: moment(user.last_login).format('YYYY-MM-DD HH:mm:ss'),
        })),
      });
    } else {
      res.status(404).json({
        status: false,
        message: 'DATA pengguna dengan ID ' + userId + ' TIDAK DITEMUKAN', // Menggunakan id_users di sini
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

// @route     PUT /api/users/:id
// @desc      Update Single User
// @access    Private
const update = async (req, res) => {
  try {
    const userId  = req.params.id;

    // let query = `SELECT * FROM users WHERE id_users = :iduser`;
    // const [user] = await sequelize.query(query, {
    //   replacements: { iduser: userId }
    // });

    // Hash password using bcrypt
    const hashedPassword = await bcrypt.hash(req.body?.password, 10);
    const updateat = moment().format('YYYY-MM-DD HH:mm:ss');
      
    // let query = `SELECT * FROM ${targetTable} WHERE ${targetColumn} = :idrole`;
    // const result = await sequelize.query(query, {
    //   replacements: { idrole: parseInt(_ID) }
    // });

    let query;

    if (req.body?.password === '__PASSWORD__') {
      query = `UPDATE users SET id_rol = $idrole, 
      username = $userName, 
      email = $email,
      nohp = $nohp,
      updated_at = $updateAt
      WHERE id_users = ${parseInt(userId)}`;
    } else
     {
      query = `UPDATE users SET id_rol = $idrole, 
      username = $userName, 
      password = $pass, 
      email = $email,
      nohp = $nohp,
      updated_at = $updateAt
      WHERE id_users = ${parseInt(userId)}`;
    }

    if (userId) {
      
      const [result] = await sequelize.query(query, {
        bind: {
          idrole: req.body?.id_rol,
          userName: req.body?.username,
          pass: hashedPassword,
          email: req.body?.email,
          nohp: req.body?.nohp,
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
        message: `NO USER WITH ID ${userId}`,
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


// @route     DELETE /api/users/:id
// @desc      Delete Single User
// @access    Private
const destroy = async (req, res) => {
  try {
    const userId  = req.params.id;

    if (userId) {
      const query = `DELETE FROM users WHERE id_users = ${userId}`;
      const [result] = await sequelize.query(query);

      if (result?.affectedRows > 0) {
        res.status(200).json({
          status: true,
          message: 'SUCCESS DELETE DATA users',
        });
      } else {
        res.status(404).json({
          status: false,
          message: `NO USER WITH ID ${userId}`,
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
  // getByIdRole,
  getById,
  store,
  // storeRole,
  update,
  // deleteRole,
  // updateRole,
  destroy
  // showRole
}
