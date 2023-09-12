const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('promo', {
    id_promo: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    promo_type: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    id_categories: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'produk_categories',
        key: 'id_categories'
      }
    },
    id_produk: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'produk',
        key: 'id_produk'
      }
    },
    id_produk_variant: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'produk_variant',
        key: 'id_produk_variant'
      }
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    id_brands_produk: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'brands_produk',
        key: 'id_brands_produk'
      }
    },
    expired: {
      type: DataTypes.DATE,
      allowNull: true
    },
    id_discount: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'discount',
        key: 'id_discount'
      }
    }
  }, {
    sequelize,
    tableName: 'promo',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_promo" },
        ]
      },
      {
        name: "fk_id_categories",
        using: "BTREE",
        fields: [
          { name: "id_categories" },
        ]
      },
      {
        name: "fk_id_produk",
        using: "BTREE",
        fields: [
          { name: "id_produk" },
        ]
      },
      {
        name: "fk_id_produk_variant",
        using: "BTREE",
        fields: [
          { name: "id_produk_variant" },
        ]
      },
      {
        name: "fk_id_brands_produk",
        using: "BTREE",
        fields: [
          { name: "id_brands_produk" },
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
