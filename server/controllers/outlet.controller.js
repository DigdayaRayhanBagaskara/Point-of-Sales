const { json } = require("body-parser");
const moment = require('moment'); // For date formatting
const { sequelize } = require("../models/index.js");

// GET untuk menampilkan data
const get = async (req, res) => {
    try {
        let query = 'SELECT * FROM outlet';
        //
        const [outlet] = await sequelize.query(query);

        res.status(200).json(outlet);
    } catch (error) {
        res.status(500).json({ error: 'Gagal mendapatkan Outlet.' });
    }
};

//GET BY ID untuk GET single data
const getById = async (req, res) => {
    const { id } = req.params;
    try {
        let query = `SELECT * FROM outlet WHERE id_outlet = ${id}`;

        const [outlet] = await sequelize.query(query);

        if (outlet.length > 0) {
            res.status(200).json({
                status: true,
                message: 'MENDAPATKAN DATA OUTLET',
                data: outlet.map((res) => ({
                    ...res,
                })),
            });
        } else {
            res.status(404).json({
                status: false,
                message: 'OUTLET TIDAK DITEMUKAN', // Menggunakan id_users di sini
            });
        }
    } catch (error) {
        res.status(500).json({ error: 'Gagal mendapatkan Employee Access.' });
    }
};

//STORE untuk insert data
const store = async (req, res) => {
    try {
        const { nama_outlet, tlp, alamat } = req.body;
        const query = `
      INSERT INTO outlet (nama_outlet, tlp, alamat, created_at, updated_at)
      VALUES (:nama_outlet, :tlp, :alamat, NOW(), NOW());
    `;
        const [results, metadata] = await sequelize.query(query, {
            replacements: {
                nama_outlet,
                tlp,
                alamat
            },
            type: sequelize.QueryTypes.INSERT,
        });
        res.status(201).json({ message: 'Outlet berhasil dibuat.' });
    } catch (error) {
        res.status(500).json({ error: 'Gagal membuat Outlet.' });
    }
};

//UPDATE untuk update data
const update = async (req, res) => {
    try {
        const id_outlet = req.params.id;
        console.log(id_outlet)

        const updateAt = moment().format('YYYY-MM-DD HH:mm:ss');

        if (id_outlet) {
            const query = `UPDATE outlet SET  
          nama_outlet = $nama_outlet, 
          tlp = $tlp,
          alamat = $alamat,
          updated_at = $updateAt
          WHERE id_outlet = ${parseInt(id_outlet)}`;

            const [result] = await sequelize.query(query, {
                bind: {
                    nama_outlet: req.body?.nama_outlet,
                    tlp: req.body?.tlp,
                    alamat: req.body?.alamat,
                    updateAt: updateAt
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
                message: `NO USER WITH ID ${id_outlet}`,
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

//DESTROY untuk delete data
const destroy = async (req, res) => {
    try {
        const id_outlet = parseInt(
            req.params['id']
        );

        if (id_outlet) {
            const query = `DELETE FROM outlet WHERE id_outlet = ${id_outlet}`;
            const [result] = await sequelize.query(query);

            if (result?.affectedRows > 0) {
                res.status(200).json({
                    status: true,
                    message: 'SUCCESS DELETE DATA EMPLOYEE ACCESS',
                });
            } else {
                res.status(404).json({
                    status: false,
                    message: `NO USER WITH ID ${id_outlet}`,
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
