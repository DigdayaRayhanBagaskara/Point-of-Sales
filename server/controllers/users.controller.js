const { sequelize } = require('../models/index.js');
const moment = require('moment'); // For date formatting
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const localForage = require('localforage');
const config = require('../config/config.js')

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

    let check_user_existence = `SELECT * FROM users WHERE email = :email`;
    const [users] = await sequelize.query(check_user_existence, {
      replacements: { email: param.email },
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
      :id_rol, :username, :password, :email, :nohp, :created_at, :updated_at, :last_login
    )`;

    const [result_id] = await sequelize.query(query, {
      replacements: {
        id_rol: param.id_rol,
        username: param.username,
        password: hashedPassword, // Use the hashed password here
        email: param.email,
        nohp: param.nohp,
        created_at: createdAt,
        updated_at: updatedAt,
        last_login: lastLogin,
      },
    });

    return res.status(201).json({
      status: true,
      message: 'ADD USER SUCCESS',
      data: {
        id: result_id,
        ...param,
        created_at: createdAt,
        updated_at: updatedAt,
        last_login: lastLogin,
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

// @route     GET /api/users/
// @desc      Get All Users
// @access    Private
const get = async (req, res) => {
  try {
    let query = 'SELECT * FROM users';
    //
    const [users] = await sequelize.query(query);

    res.status(200).json({
      status: true,
      message: 'GET DATA Users',
      data: users,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: false,
      // message: err.message,
    });
  }
};

// @route     GET /api/users/:id
// @desc      Get single user profile
// @access    Private
const getById = async (req, res) => {
  try {
    const userId = req.params.id;

    let query = `SELECT * FROM users WHERE id_users = $id_users`;
    const [users] = await sequelize.query(query, {
      bind : {
        id_users : userId
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
    const userId = req.params.id

    // Hash password using bcrypt
    const hashedPassword = await bcrypt.hash(req.body?.password, 10);

    if (userId) {
      const query = `UPDATE users SET id_rol = ${req.body?.id_rol}, username = '${req.body?.username}', password = '${hashedPassword}', email = '${req.body?.email}' WHERE id_users = ${userId}`;
      const [result] = await sequelize.query(query);

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
};

// @route     DELETE /api/users/:id
// @desc      Delete Single User
// @access    Private
const destroy = async (req, res) => {
  try {
    const userId = req.params.id

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

// -----------------------------------------------------------------------------------------------
// @route     POST /api/users/login
// @desc      Login New user
// @access    Public
const login = async (req, res) => {
  // const { username, password } = req.body;

  try {
    // const query = `SELECT * FROM users WHERE username = :username`
    let query = `SELECT * FROM users WHERE username = :username`;

    const [user] = await sequelize.query(query, {
      replacements: { username: req.body?.username },
      type: sequelize.QueryTypes.SELECT,
    });

    if (!user) {
      return res.status(401).json({
        status: false,
        message: 'Invalid username or password',
      });
    }

    // const user = users[0];

    const passwordMatch = await bcrypt.compare(
      req.body?.password,
      user.password
    );

    if (passwordMatch) {
      const token = jwt.sign({ id: user.id_users }, config.env.JWT_SECRET_KEY, {
        expiresIn: '30d',
      });

      // save to cookie
      res.cookie('jwt', token, {
        httpOnly: true,
        secure: config.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      // save to localstorage
      try {
      localforage.setItem('token', token);
      } catch (error) {
        console.log(error);
      }

      res.status(200).json({
        status: true,
        message: 'Login successful',
        token,
        user: {
          idrol: user.id_rol,
          username: user.username,
          email: user.email,
        },
      });
    } else {
      res.status(401).json({
        status: false,
        message: 'Invalid username or password',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: 'An error occurred while logging in',
    });
  }
};

//access role
// Rute yang hanya bisa diakses oleh admin
const adminRoute = async (req, res) => {
  try {
    const query = `
      SELECT * FROM users
      INNER JOIN role ON users.id_rol = role.id_rol
      WHERE users.id_users = :userId AND role.nama_role = 'admin'
    `;
    const [user] = await sequelize.query(query, {
      replacements: { userId: req.user.id },
      type: sequelize.QueryTypes.SELECT,
    });

    if (!user) {
      return res.status(403).json({
        status: false,
        message: 'Unauthorized',
      });
    }

    res.status(200).json({
      status: true,
      message: 'Admin protected route accessed successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: 'An error occurred while accessing admin protected route',
    });
  }
};

const cashierRoute = async (req, res) => {
  try {
    const query = `
      SELECT * FROM users
      INNER JOIN role ON users.id_rol = role.id_rol
      WHERE users.id_users = :userId AND (role.nama_role = 'admin' OR role.nama_role = 'cashier')
    `;
    const [user] = await sequelize.query(query, {
      replacements: { userId: req.user.id },
      type: sequelize.QueryTypes.SELECT,
    });

    if (!user) {
      return res.status(403).json({
        status: false,
        message: 'Unauthorized',
      });
    }

    res.status(200).json({
      status: true,
      message: 'User protected route accessed successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: 'An error occurred while accessing user protected route',
    });
  }
};

// @route     POST /api/users/logout/
// @desc      Logout user
// @access    Private
const logout = async (req, res) => {
  try {
    res.cookie('jwt', '', {
      httpOnly: true,
      expires: new Date(0),
    });

    res.status(200).json({ message: 'USER LOGGED OUT' });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: 'USER FAILED LOGING OUT',
      error,
    });
  }
};

module.exports = {
  get,
  adminRoute,
  cashierRoute,
  login,
  getById,
  store,
  update,
  destroy,
  logout,
};
