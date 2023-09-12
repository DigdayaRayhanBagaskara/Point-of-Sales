const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "produk_variant",
    {
      id_produk_variant: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      variant_name: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      harga_produk: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      harga_modal: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      id_produk: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "produk",
          key: "id_produk",
        },
      },
      sku: {
        type: DataTypes.CHAR(100),
        allowNull: true,
      },
      stok: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      min_stok: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      tableName: "produk_variant",
      timestamps: true,
      updatedAt: "updated_at",
      createdAt: "created_at",
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id_produk_variant" }],
        },
        {
          name: "id_produk",
          using: "BTREE",
          fields: [{ name: "id_produk" }],
        },
      ],
    }
  );
};
