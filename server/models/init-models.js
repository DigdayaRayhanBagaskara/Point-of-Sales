var DataTypes = require("sequelize").DataTypes;
var _brands_produk = require("./brands_produk");
var _discount = require("./discount");
var _employee = require("./employee");
var _employee_access = require("./employee_access");
var _outlet = require("./outlet");
var _produk = require("./produk");
var _produk_categories = require("./produk_categories");
var _produk_variant = require("./produk_variant");
var _promo = require("./promo");
var _role = require("./role");
var _transaksi = require("./transaksi");
var _transaksi_detail = require("./transaksi_detail");
var _users = require("./users");

function initModels(sequelize) {
  var brands_produk = _brands_produk(sequelize, DataTypes);
  var discount = _discount(sequelize, DataTypes);
  var employee = _employee(sequelize, DataTypes);
  var employee_access = _employee_access(sequelize, DataTypes);
  var outlet = _outlet(sequelize, DataTypes);
  var produk = _produk(sequelize, DataTypes);
  var produk_categories = _produk_categories(sequelize, DataTypes);
  var produk_variant = _produk_variant(sequelize, DataTypes);
  var promo = _promo(sequelize, DataTypes);
  var role = _role(sequelize, DataTypes);
  var transaksi = _transaksi(sequelize, DataTypes);
  var transaksi_detail = _transaksi_detail(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  produk.belongsTo(brands_produk, {
    as: "id_brand_brands_produk",
    foreignKey: "id_brand",
  });
  brands_produk.hasMany(produk, { as: "produks", foreignKey: "id_brand" });
  promo.belongsTo(brands_produk, {
    as: "id_brands_produk_brands_produk",
    foreignKey: "id_brands_produk",
  });
  brands_produk.hasMany(promo, {
    as: "promos",
    foreignKey: "id_brands_produk",
  });
  promo.belongsTo(discount, {
    as: "id_discount_discount",
    foreignKey: "id_discount",
  });
  discount.hasMany(promo, { as: "promos", foreignKey: "id_discount" });
  transaksi.belongsTo(discount, {
    as: "id_discount_discount",
    foreignKey: "id_discount",
  });
  discount.hasMany(transaksi, { as: "transaksis", foreignKey: "id_discount" });
  employee_access.belongsTo(employee, {
    as: "id_employee_employee",
    foreignKey: "id_employee",
  });
  employee.hasMany(employee_access, {
    as: "employee_accesses",
    foreignKey: "id_employee",
  });
  employee.belongsTo(outlet, {
    as: "id_outlet_outlet",
    foreignKey: "id_outlet",
  });
  outlet.hasMany(employee, { as: "employees", foreignKey: "id_outlet" });
  produk.belongsTo(outlet, { as: "id_outlet_outlet", foreignKey: "id_outlet" });
  outlet.hasMany(produk, { as: "produks", foreignKey: "id_outlet" });
  produk_variant.belongsTo(produk, {
    as: "id_produk_produk",
    foreignKey: "id_produk",
  });
  produk.hasMany(produk_variant, {
    as: "produk_variants",
    foreignKey: "id_produk",
  });
  promo.belongsTo(produk, { as: "id_produk_produk", foreignKey: "id_produk" });
  produk.hasMany(promo, { as: "promos", foreignKey: "id_produk" });
  produk.belongsTo(produk_categories, {
    as: "id_categories_produk_category",
    foreignKey: "id_categories",
  });
  produk_categories.hasMany(produk, {
    as: "produks",
    foreignKey: "id_categories",
  });
  promo.belongsTo(produk_categories, {
    as: "id_categories_produk_category",
    foreignKey: "id_categories",
  });
  produk_categories.hasMany(promo, {
    as: "promos",
    foreignKey: "id_categories",
  });
  promo.belongsTo(produk_variant, {
    as: "id_produk_variant_produk_variant",
    foreignKey: "id_produk_variant",
  });
  produk_variant.hasMany(promo, { as: "promos", foreignKey: "id_produk_variant" });
  employee_access.belongsTo(users, {
    as: "id_users_user",
    foreignKey: "id_users",
  });
  users.hasMany(employee_access, {
    as: "employee_accesses",
    foreignKey: "id_users",
  });

  return {
    sequelize,
    brands_produk,
    discount,
    employee,
    employee_access,
    outlet,
    produk,
    produk_categories,
    produk_variant,
    promo,
    role,
    transaksi,
    transaksi_detail,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
