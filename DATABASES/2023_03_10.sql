ALTER TABLE produk
DROP COLUMN harga_modal;


ALTER TABLE produk_variant
ADD harga_modal FLOAT;