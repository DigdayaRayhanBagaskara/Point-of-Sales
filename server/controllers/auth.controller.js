const { sequelize } = require('../models/index.js');
const moment = require('moment');
const config = require('../config/config.js')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const localForage = require('localforage');

// -----------------------------------------------------------------------------------------------
// @route     POST /api/auth/login
// @desc      Login New user
// @access    Public

const login = async (req, res) => {
    // const { username, password } = req.body;
  
    try {
      // const query = `SELECT * FROM users WHERE username = :username`
      let query = `SELECT * FROM users WHERE username = :username OR email = :username OR nohp = :username`;
  
      const [user] = await sequelize.query(query, {
        replacements: { username: req.body?.username },
        type: sequelize.QueryTypes.SELECT,
      });

      console.log('user --> ', !user)

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

      // const passwordMatch = req.body?.password === user.password
  
      if (passwordMatch) {
        try {
          // add last login when user has logged in
          const lastLogin = moment().format('YYYY-MM-DD HH:mm:ss');
          const query1 = 'SELECT id_users FROM users WHERE username = $userName OR email = $userName OR nohp = $userName'
          let [result] = await sequelize.query(query1, {
            bind: { userName: req.body?.username }
          });
          console.log('result', result[0])

          const updatequery = `UPDATE users SET last_login = $lastlogin WHERE id_users = ${result[0].id_users}`;
          
          let [result1] = await sequelize.query(updatequery, {
            bind: {
              lastlogin: lastLogin
            }
          });
          
        } catch (error) {
          res.status(400).json({ message: 'ERROR ADDING LAST LOGIN' })
        }

        const token = jwt.sign({ id: user.id_users }, config.env.JWT_SECRET_KEY, {
          expiresIn: '30d',
        });
  
        // save to cookie
        res.cookie('jwt', token, {
          httpOnly: true,
          secure: config.env.NODE_ENV !== 'development',
          sameSite: 'strict',
          maxAge: 24 * 60 * 60 * 1000,
        });
  
        // save to localstorage
        // try {
        // localForage.setItem('token', token);
        // } catch (error) {
        //   console.log(error);
        // }
  
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
    login,
    logout,
  }