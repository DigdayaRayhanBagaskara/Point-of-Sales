const { json } = require("body-parser");
const { sequelize } = require("../models/index.js");

// GET untuk menampilkan data
const get = async (req, res) => {
  try {
    let query = 'SELECT * FROM employee_access';
    //
    const [employee_access] = await sequelize.query(query);

    res.status(200).json(employee_access);
  } catch (error) {
    res.status(500).json({ error: 'Gagal mendapatkan Employee Access.' });
  }
};

//GET BY ID untuk GET single data
const getById = async (req, res) => {
  const { id } = req.params;
  try {
    let query = `SELECT * FROM employee_access WHERE id_employee = ${id}`;

    const [employee_access] = await sequelize.query(query);

    if (employee_access.length > 0) {
      res.status(200).json({
        status: true,
        message: 'MENDAPATKAN DATA EMPLOYEE ACCESS',
        data: employee_access.map((user) => ({
          ...user,
        })),
      });
    } else {
      res.status(404).json({
        status: false,
        message: 'DATA TIDAK DITEMUKAN', // Menggunakan id_users di sini
      });
    }
  } catch (error) {
    res.status(500).json({ error: 'Gagal mendapatkan Employee Access.' });
  }
};

//STORE untuk insert data
const store = async (req, res) => {
  try {
    const { id_employee, id_users } = req.body;
    const query = `
      INSERT INTO employee_access (id_employee, id_users, created_at, updated_at)
      VALUES (:id_employee, :id_users, NOW(), NOW());
    `;
    const [results, metadata] = await sequelize.query(query, {
      replacements: {
        id_employee,
        id_users,
      },
      type: sequelize.QueryTypes.INSERT,
    });
    res.status(201).json({ message: 'Employee Access berhasil dibuat.' });
  } catch (error) {
    res.status(500).json({ error: 'Gagal membuat Employee Access.' });
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
        status: false,
        messasge: error.messasge
      }
    )
  }
};

//DESTROY untuk delete data
const destroy = async (req, res) => {
  try {
    const userId = parseInt(
      req.params['id']
    );

    if (userId) {
      const query = `DELETE FROM employee_access WHERE id_employee_access = ${userId}`;
      const [result] = await sequelize.query(query);

      if (result?.affectedRows > 0) {
        res.status(200).json({
          status: true,
          message: 'SUCCESS DELETE DATA EMPLOYEE ACCESS',
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
  getById,
  store,
  update,
  destroy,
};
