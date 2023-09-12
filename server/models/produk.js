const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "produk",
    {
      id_produk: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      id_outlet: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "outlet",
          key: "id_outlet",
        },
      },
      id_categories: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "produk_categories",
          key: "id_categories",
        },
      },
      id_brand: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "brands_produk",
          key: "id_brands_produk",
        },
      },
      produk_name: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      gambar_produk: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "produk",
      timestamps: true,
      updatedAt: "updated_at",
      createdAt: "created_at",
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id_produk" }],
        },
        {
          name: "FK_outlet_id",
          using: "BTREE",
          fields: [{ name: "id_outlet" }],
        },
        {
          name: "id_categories",
          using: "BTREE",
          fields: [{ name: "id_categories" }],
        },
        {
          name: "id_brand",
          using: "BTREE",
          fields: [{ name: "id_brand" }],
        },
      ],
    }
  );
};
