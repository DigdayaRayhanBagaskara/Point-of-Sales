const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('outlet', {
    id_outlet: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nama_outlet: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    tlp: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    alamat: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'outlet',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_outlet" },
        ]
      },
    ]
  });
};
