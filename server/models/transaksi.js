const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('transaksi', {
    id_transaksi: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nomor_transaksi: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    id_discount: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'discount',
        key: 'id_discount'
      }
    },
    total_harga: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    nama_pelanggan: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    total_bayar: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    tgl_transaksi: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'transaksi',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_transaksi" },
        ]
      },
      {
        name: "id_discount",
        using: "BTREE",
        fields: [
          { name: "id_discount" },
        ]
      },
    ]
  });
};
