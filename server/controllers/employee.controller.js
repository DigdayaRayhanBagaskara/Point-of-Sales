const { json } = require("body-parser");
const { sequelize } = require("../models/index.js");

// GET untuk menampilkan dataa
const getEmployees = async (req, res) => {
  try {
    const query = 'SELECT * FROM employee;';
    const [employees, metadata] = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    });
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Gagal mendapatkan Employee.' });
  }
};

//GET BY ID untuk GET single dataa
const getEmployeeById = async (req, res) => {
  const { id } = req.params;
  try {
    const query = 'SELECT * FROM employee WHERE id_employee = :id;';
    const [employee, metadata] = await sequelize.query(query, {
      replacements: { id },
      type: sequelize.QueryTypes.SELECT,
    });
    if (employee.length === 0) {
      return res.status(404).json({ error: 'Employee tidak ditemukan.' });
    }
    res.status(200).json(employee[0]);
  } catch (error) {
    res.status(500).json({ error: 'Gagal mendapatkan Employee.' });
  }
};

//STORE untuk insert dataa
const storeEmployee = async (req, res) => {
  try {
    const { name, agama, status, alamat, id_outlet } = req.body;
    const query = `
      INSERT INTO employee (name, agama, status, alamat, id_outlet, created_at, updated_at)
      VALUES (:name, :agama, :status, :alamat, :id_outlet, NOW(), NOW());
    `;
    const [results, metadata] = await sequelize.query(query, {
      replacements: {
        name,
        agama,
        status,
        alamat,
        id_outlet,
      },
      type: sequelize.QueryTypes.INSERT,
    });
    res.status(201).json({ message: 'Employee berhasil dibuat.' });
  } catch (error) {
    res.status(500).json({ error: 'Gagal membuat Employee.' });
  }
};


//UPDATE untuk update data
const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, agama, status, alamat, id_outlet } = req.body;
  try {
    const query = `
      UPDATE employee
      SET name = :name, agama = :agama, status = :status, alamat = :alamat, id_outlet = :id_outlet, updated_at = NOW()
      WHERE id_employee = :id;
    `;
    const [updated, metadata] = await sequelize.query(query, {
      replacements: { id, name, agama, status, alamat, id_outlet },
      type: sequelize.QueryTypes.UPDATE,
    });
    if (updated[0] === 0) {
      return res.status(404).json({ error: 'Employee tidak ditemukan.' });
    }
    res.status(200).json({ message: 'Employee berhasil diperbarui.' });
  } catch (error) {
    res.status(500).json({ error: 'Gagal memperbarui Employee.' });
  }
};

//DESTROY untuk delete data
const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const query = 'DELETE FROM employee WHERE id_employee = :id;';
    const [deleted, metadata] = await sequelize.query(query, {
      replacements: { id },
      type: sequelize.QueryTypes.DELETE,
    });
    if (deleted === 0) {
      return res.status(404).json({ error: 'Employee tidak ditemukan.' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Gagal menghapus Employee.' });
  }
};

module.exports = {
  getEmployees,
  getEmployeeById,
  storeEmployee,
  updateEmployee,
  deleteEmployee,
};