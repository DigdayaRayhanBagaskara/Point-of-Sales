const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('discount', {
    id_discount: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    discount_names: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    discount_type: {
      type: DataTypes.ENUM('amount','%'),
      allowNull: true
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    persen: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    expired: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'discount',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_discount" },
        ]
      },
    ]
  });
};
