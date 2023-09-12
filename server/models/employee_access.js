const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('employee_access', {
    id_employee_access: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_employee: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'employee',
        key: 'id_employee'
      }
    },
    id_users: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id_users'
      }
    }
  }, {
    sequelize,
    tableName: 'employee_access',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_employee_access" },
        ]
      },
      {
        name: "FK_id_employee",
        using: "BTREE",
        fields: [
          { name: "id_employee" },
        ]
      },
      {
        name: "id_users",
        using: "BTREE",
        fields: [
          { name: "id_users" },
        ]
      },
    ]
  });
};
