const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('employee', {
    id_employee: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    agama: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    alamat: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    id_outlet: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'outlet',
        key: 'id_outlet'
      }
    }
  }, {
    sequelize,
    tableName: 'employee',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_employee" },
        ]
      },
      {
        name: "id_outlet",
        using: "BTREE",
        fields: [
          { name: "id_outlet" },
        ]
      },
    ]
  });
};
