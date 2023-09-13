const jwt = require('jsonwebtoken');
const { sequelize } = require('../models/index.js');

const protect = async (req, res, next) => {
  try {
    // console.log('req -->', req)
    let token;

    token = req.cookies.jwt;


    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const query = `SELECT * FROM users WHERE id_users = :userid`;
        const [user] = await sequelize.query(query, {
          replacements: { userid: parseInt(decoded.id) },
          type: sequelize.QueryTypes.SELECT,
        });

        if (user) {
          next();
        }
      } catch (error) {
        //TIDAK ADA TOKEN
        res.status(401).json({ message: 'NOT AUTHORIZED, INVALID TOKEN' });
      }
    } else {
      res.status(401).json({ message: 'NOT AUTHORIZED, NO TOKEN' });
    }
  } catch (error) {
    console.log(error);
  }
};

const testIntercept = async (req, res, next) => {
  console.log('text intercepting')
  next()
}

module.exports = {
  protect,
  testIntercept
}
