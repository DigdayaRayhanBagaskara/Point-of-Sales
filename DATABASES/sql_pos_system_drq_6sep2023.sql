/*
 Navicat Premium Data Transfer

 Source Server         : rahmad
 Source Server Type    : MySQL
 Source Server Version : 80030 (8.0.30)
 Source Host           : localhost:3306
 Source Schema         : pointofsales

 Target Server Type    : MySQL
 Target Server Version : 80030 (8.0.30)
 File Encoding         : 65001

 Date: 01/09/2023 16:56:31
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for brands_produk
-- ----------------------------
DROP TABLE IF EXISTS `brands_produk`;
CREATE TABLE `brands_produk`  (
  `id_brands_produk` int NOT NULL AUTO_INCREMENT,
  `brand_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `keterangan` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `asal_brand` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `created_at` datetime NULL DEFAULT NULL,
  `updated_at` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id_brands_produk`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of brands_produk
-- ----------------------------
INSERT INTO `brands_produk` VALUES (2, 'sepatu kawat', 'sadsadasdas', 'sadsadas', '2023-08-15 23:49:12', '2023-08-18 23:49:16');
INSERT INTO `brands_produk` VALUES (3, 'indonesia', 'asdadas', 'indonesia', '2023-08-15 23:49:41', '2023-08-15 23:49:46');
INSERT INTO `brands_produk` VALUES (4, 'taiwand', 'kaos handal', 'taiwand', '2023-08-22 23:51:26', '2023-08-31 23:51:29');
INSERT INTO `brands_produk` VALUES (5, 'komputer handle', 'brands yang ternama', 'indonesia', '2023-08-16 23:56:43', '2023-08-31 23:56:46');
INSERT INTO `brands_produk` VALUES (6, 'sadsad', 'sadsad', 'sadsad', '2023-08-31 09:46:31', '2023-08-31 09:46:31');

-- ----------------------------
-- Table structure for discount
-- ----------------------------
DROP TABLE IF EXISTS `discount`;
CREATE TABLE `discount`  (
  `id_discount` int NOT NULL AUTO_INCREMENT,
  `discount_names` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `discount_type` enum('amount','%') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `amount` float NULL DEFAULT NULL,
  `persen` float NULL DEFAULT NULL,
  `expired` datetime NULL DEFAULT NULL,
  `created_at` datetime NULL DEFAULT NULL,
  `updated_at` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id_discount`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of discount
-- ----------------------------

-- ----------------------------
-- Table structure for employee
-- ----------------------------
DROP TABLE IF EXISTS `employee`;
CREATE TABLE `employee`  (
  `id_employee` int NOT NULL AUTO_INCREMENT,
  `id_outlet` int NULL DEFAULT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `agama` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `status` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `alamat` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` datetime NULL DEFAULT NULL,
  `updated_at` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id_employee`) USING BTREE,
  INDEX `id_outlet`(`id_outlet` ASC) USING BTREE,
  CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`id_outlet`) REFERENCES `outlet` (`id_outlet`) ON DELETE RESTRICT ON UPDATE SET NULL
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of employee
-- ----------------------------

-- ----------------------------
-- Table structure for employee_access
-- ----------------------------
DROP TABLE IF EXISTS `employee_access`;
CREATE TABLE `employee_access`  (
  `id_employee_access` int NOT NULL AUTO_INCREMENT,
  `id_employee` int NOT NULL,
  `id_users` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_employee_access`) USING BTREE,
  INDEX `FK_id_employee`(`id_employee` ASC) USING BTREE,
  INDEX `id_users`(`id_users` ASC) USING BTREE,
  CONSTRAINT `employee_access_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `users` (`id_users`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_id_employee` FOREIGN KEY (`id_employee`) REFERENCES `employee` (`id_employee`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of employee_access
-- ----------------------------

-- ----------------------------
-- Table structure for outlet
-- ----------------------------
DROP TABLE IF EXISTS `outlet`;
CREATE TABLE `outlet`  (
  `id_outlet` int NOT NULL AUTO_INCREMENT,
  `nama_outlet` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `tlp` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `alamat` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` datetime NULL DEFAULT NULL,
  `updated_at` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id_outlet`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of outlet
-- ----------------------------
INSERT INTO `outlet` VALUES (3, 'rumbai', '05425485', 'jl rumbai', '2023-08-14 23:48:14', '2023-08-14 23:48:18');
INSERT INTO `outlet` VALUES (4, 'indomaret soekarno hatta', '08746332', 'soekarno hatta', '2023-08-16 23:51:55', '2023-08-23 23:51:59');
INSERT INTO `outlet` VALUES (5, 'rick komputer', '0324832', 'sudirman', '2023-08-30 23:57:28', '2023-08-16 23:57:31');

-- ----------------------------
-- Table structure for produk
-- ----------------------------
DROP TABLE IF EXISTS `produk`;
CREATE TABLE `produk`  (
  `id_produk` int NOT NULL AUTO_INCREMENT,
  `id_outlet` int NULL DEFAULT NULL,
  `id_categories` int NULL DEFAULT NULL,
  `id_brand` int NULL DEFAULT NULL,
  `produk_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `gambar_produk` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `harga_modal` float NULL DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `created_at` datetime NULL DEFAULT NULL,
  `updated_at` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id_produk`) USING BTREE,
  INDEX `FK_outlet_id`(`id_outlet` ASC) USING BTREE,
  INDEX `id_categories`(`id_categories` ASC) USING BTREE,
  INDEX `id_brand`(`id_brand` ASC) USING BTREE,
  CONSTRAINT `FK_outlet_id` FOREIGN KEY (`id_outlet`) REFERENCES `outlet` (`id_outlet`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `produk_ibfk_1` FOREIGN KEY (`id_categories`) REFERENCES `produk_categories` (`id_categories`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `produk_ibfk_2` FOREIGN KEY (`id_brand`) REFERENCES `brands_produk` (`id_brands_produk`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of produk
-- ----------------------------
INSERT INTO `produk` VALUES (1, 3, 4, 2, 'sepatu', 'sepatu.jpg', NULL, 'sadsadasd', '2023-08-09 23:50:46', '2023-08-16 23:50:50');
INSERT INTO `produk` VALUES (2, 5, 8, 5, 'komputer asus', 'komputer.jpg', NULL, 'kompute terkern', '2023-08-23 23:58:30', '2023-08-17 23:58:32');
INSERT INTO `produk` VALUES (7, 3, 6, 2, 'brands ccc', 'brands.jpg', NULL, 'sadsadas', '2023-08-31 13:29:04', '2023-08-31 13:29:04');
INSERT INTO `produk` VALUES (8, 3, 6, 2, 'asdsadasdasd23', 'brands.jpg', NULL, 'sadsadas', '2023-08-31 13:29:40', '2023-08-31 13:29:40');

-- ----------------------------
-- Table structure for produk_categories
-- ----------------------------
DROP TABLE IF EXISTS `produk_categories`;
CREATE TABLE `produk_categories`  (
  `id_categories` int NOT NULL AUTO_INCREMENT,
  `categories_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `keterangan` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `model` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `created_at` datetime NULL DEFAULT NULL,
  `updated_at` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id_categories`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of produk_categories
-- ----------------------------
INSERT INTO `produk_categories` VALUES (4, 'celana panjang', 'celana panjnag mewah', 'branded', '2023-08-23 22:44:37', '2023-08-09 22:44:40');
INSERT INTO `produk_categories` VALUES (6, 'celana pendek', 'celana pendek', 'celana pendek', '2023-08-16 23:53:08', '2023-08-11 23:53:13');
INSERT INTO `produk_categories` VALUES (7, 'kaos kaki', 'kaos kaki', 'kaos kaki', '2023-08-24 23:53:30', '2023-08-17 23:53:34');
INSERT INTO `produk_categories` VALUES (8, 'komputer', 'komputer dengan spek tinggi', 'komputer', '2023-08-23 23:56:04', '2023-08-17 23:56:08');

-- ----------------------------
-- Table structure for produk_variant
-- ----------------------------
DROP TABLE IF EXISTS `produk_variant`;
CREATE TABLE `produk_variant`  (
  `id_produk_variant` int NOT NULL AUTO_INCREMENT,
  `id_produk` int NULL DEFAULT NULL,
  `variant_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `harga_produk` float NULL DEFAULT NULL,
  `sku` char(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `stok` int NOT NULL DEFAULT 0,
  `min_stok` int NOT NULL DEFAULT 0,
  `created_at` datetime NULL DEFAULT NULL,
  `updated_at` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id_produk_variant`) USING BTREE,
  INDEX `id_produk`(`id_produk` ASC) USING BTREE,
  CONSTRAINT `variant_ibfk_1` FOREIGN KEY (`id_produk`) REFERENCES `produk` (`id_produk`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of produk_variant
-- ----------------------------
INSERT INTO `produk_variant` VALUES (2, 2, 'sepatu kaca', 30000, 'sadas23', 10, 15, '2023-08-16 23:54:21', '2023-08-25 23:54:24');
INSERT INTO `produk_variant` VALUES (3, 2, 'sepatu plastik', 20000, 'sada24', 20, 30, '2023-08-25 23:55:25', '2023-08-26 23:55:29');
INSERT INTO `produk_variant` VALUES (4, 2, 'komputer asus warna merah', 200000, 'asdsa324', 40, 50, '2023-08-09 23:59:19', '2023-08-09 23:59:23');

-- ----------------------------
-- Table structure for promo
-- ----------------------------
DROP TABLE IF EXISTS `promo`;
CREATE TABLE `promo`  (
  `id_promo` int NOT NULL AUTO_INCREMENT,
  `promo_type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `id_categories` int NULL DEFAULT NULL,
  `id_produk` int NULL DEFAULT NULL,
  `id_brands_produk` int NULL DEFAULT NULL,
  `id_discount` int NULL DEFAULT NULL,
  `id_produk_variant` int NULL DEFAULT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `expired` datetime NULL DEFAULT NULL,
  `created_at` datetime NULL DEFAULT NULL,
  `updated_at` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id_promo`) USING BTREE,
  INDEX `fk_id_categories`(`id_categories` ASC) USING BTREE,
  INDEX `fk_id_produk`(`id_produk` ASC) USING BTREE,
  INDEX `fk_id_produk_variant`(`id_produk_variant` ASC) USING BTREE,
  INDEX `fk_id_brands_produk`(`id_brands_produk` ASC) USING BTREE,
  INDEX `id_discount`(`id_discount` ASC) USING BTREE,
  CONSTRAINT `fk_id_brands_produk` FOREIGN KEY (`id_brands_produk`) REFERENCES `brands_produk` (`id_brands_produk`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_id_categories` FOREIGN KEY (`id_categories`) REFERENCES `produk_categories` (`id_categories`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_id_produk` FOREIGN KEY (`id_produk`) REFERENCES `produk` (`id_produk`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_id_produk_variant` FOREIGN KEY (`id_produk_variant`) REFERENCES `produk_variant` (`id_produk_variant`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `promo_ibfk_1` FOREIGN KEY (`id_discount`) REFERENCES `discount` (`id_discount`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of promo
-- ----------------------------

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role`  (
  `id_rol` int NOT NULL AUTO_INCREMENT,
  `nama_role` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `create_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_rol`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES (1, 'admin', '2023-08-28 23:45:15', '2023-08-28 23:45:19');
INSERT INTO `role` VALUES (2, 'cashier', '2023-08-16 23:45:30', '2023-08-15 23:45:37');
INSERT INTO `role` VALUES (3, 'super admin', '2023-08-16 23:45:50', '2023-08-24 23:45:55');

-- ----------------------------
-- Table structure for transaksi
-- ----------------------------
DROP TABLE IF EXISTS `transaksi`;
CREATE TABLE `transaksi`  (
  `id_transaksi` int NOT NULL AUTO_INCREMENT,
  `nomor_transaksi` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `id_discount` int NULL DEFAULT NULL,
  `total_harga` float NOT NULL DEFAULT 0,
  `nama_pelanggan` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `total_bayar` float NOT NULL,
  `tgl_transaksi` datetime NOT NULL,
  `created_at` datetime NULL DEFAULT NULL,
  `updated_at` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id_transaksi`) USING BTREE,
  INDEX `id_discount`(`id_discount` ASC) USING BTREE,
  CONSTRAINT `transaksi_ibfk_1` FOREIGN KEY (`id_discount`) REFERENCES `discount` (`id_discount`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of transaksi
-- ----------------------------

-- ----------------------------
-- Table structure for transaksi_detail
-- ----------------------------
DROP TABLE IF EXISTS `transaksi_detail`;
CREATE TABLE `transaksi_detail`  (
  `id_transaksi_detail` int NOT NULL,
  `id_transaksi` int NOT NULL,
  `id_produk_variant` int NOT NULL,
  `total_harga_produk` float NOT NULL,
  `jumlah_produk` int NOT NULL,
  `created_at` datetime NULL DEFAULT NULL,
  `updated_at` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id_transaksi_detail`) USING BTREE,
  INDEX `id_produk`(`id_produk_variant` ASC) USING BTREE,
  INDEX `id_transaksi`(`id_transaksi` ASC) USING BTREE,
  CONSTRAINT `transaksi_detail_ibfk_2` FOREIGN KEY (`id_transaksi`) REFERENCES `transaksi` (`id_transaksi`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `transaksi_detail_ibfk_3` FOREIGN KEY (`id_produk_variant`) REFERENCES `produk_variant` (`id_produk_variant`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of transaksi_detail
-- ----------------------------

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id_users` int NOT NULL AUTO_INCREMENT,
  `id_rol` int NULL DEFAULT NULL,
  `username` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `nohp` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `created_at` datetime NULL DEFAULT NULL,
  `updated_at` datetime NULL DEFAULT NULL,
  `last_login` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id_users`) USING BTREE,
  INDEX `FK_role_id`(`id_rol` ASC) USING BTREE,
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `role` (`id_rol`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 2, 'rere', '123', 'rere@gmail.com', '084525632', '2023-08-30 23:47:05', '2023-08-23 23:47:10', '2023-08-15 23:47:13');

CREATE TABLE `supplier` (
  `id_supplier` int NOT NULL AUTO_INCREMENT,
  `supplier_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `phone_number` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `city` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `state` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `zip_number` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` datetime NULL DEFAULT NULL,
  `updated_at` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id_supplier`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

CREATE TABLE `purchase_order` (
  `id_purchase_order` int NOT NULL AUTO_INCREMENT,
  `id_outlet` int NOT NULL,
  `id_supplier` int NOT NULL,
  `order_number` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `po_date` datetime NOT NULL,
  `status` enum('waiting','complete','cancel') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'waiting',
  `keterangan` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `qty` int NULL,
  `unit_cost` float NULL,
  `total` varchar(255) NULL,
  `created_at` datetime NULL DEFAULT NULL,
  `updated_at` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id_purchase_order`) USING BTREE,
  FOREIGN KEY (`id_supplier`) REFERENCES `supplier` (`id_supplier`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`id_outlet`) REFERENCES `outlet` (`id_outlet`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;


CREATE TABLE `transfer` (
  `id_transfer` int NOT NULL AUTO_INCREMENT,
  `id_outlet_from` int NULL,
  `id_outlet_to` int NULL,
  `id_produk` int NULL,
  `qty_transfer` int NULL,
  `keterangan` varchar(100) NULL,
  `order_number` varchar(50) NULL,
  `created_at` datetime NULL,
  `updated_at` datetime NULL,
  PRIMARY KEY (`id_transfer`) USING BTREE,
  FOREIGN KEY (`id_outlet_from`) REFERENCES `outlet` (`id_outlet`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  FOREIGN KEY (`id_outlet_to`) REFERENCES `outlet` (`id_outlet`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  FOREIGN KEY (`id_produk`) REFERENCES `produk` (`id_produk`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;


CREATE TABLE `adjustment` (
  `id_adjustment` int NOT NULL AUTO_INCREMENT,
  `id_outlet` int NULL,
  `id_produk` int NULL,
  `stok_awal` int NULL,
  `adjustment` int NULL,
  `stok_akhir` int NULL,
  `created_at` datetime NULL DEFAULT NULL,
  `updated_at` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id_adjustment`) USING BTREE,
  FOREIGN KEY (`id_outlet`) REFERENCES `outlet` (`id_outlet`) ON DELETE RESTRICT ON UPDATE SET NULL,
  FOREIGN KEY (`id_produk`) REFERENCES `produk` (`id_produk`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

SET FOREIGN_KEY_CHECKS = 1;
