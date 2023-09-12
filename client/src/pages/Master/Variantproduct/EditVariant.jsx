/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import "react-toastify/dist/ReactToastify.css";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
  Button,
  Textarea,
} from "@material-tailwind/react";
// import Add data
import { useUpdateproductByIdMutation } from "../../../redux/services/productApi";
import { useUpdatevariantByIdMutation } from "../../../redux/services/variantproductApi";

// import List Select
import { useGetListoutletQuery } from "../../../redux/services/outletApi";
import { useGetListbrandQuery } from "../../../redux/services/brandproductApi";
import { useGetListcategoryQuery } from "../../../redux/services/categoryproductApi";

import { useEffect, useState } from "react";
import PropTypes from "prop-types";

// import Notifikasi
import { toast } from "react-toastify";

const EditVariant = ({ closeEForm, openEForm, onEdit }) => {
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [selectedOutlet, setSelectedOutlet] = useState([]);

  const [formLoginData, setFormLoginData] = useState({
    id_produk: openEForm.id_produk,
    id_categories: openEForm.id_categories,
    id_brand: openEForm.id_brand,
    id_outlet: openEForm.id_outlet,
    produk_name: openEForm.produk_name,
    gambar_produk: openEForm.gambar_produk,
    desc: openEForm.description,
  });

  // List Select
  const { data: categoryData, isLoading } = useGetListcategoryQuery({
    limit: 1000,
  });
  const { data: brandData, bisLoading } = useGetListbrandQuery({
    limit: 1000,
  });
  const { data: outletData, oisLoading } = useGetListoutletQuery({
    limit: 1000,
  });
  useEffect(() => {
    if (!isLoading && Array.isArray(categoryData)) {
      setSelectedCategory(categoryData);
    }
  }, [categoryData, isLoading]);
  useEffect(() => {
    if (!bisLoading && Array.isArray(brandData)) {
      setSelectedBrand(brandData);
    }
  }, [brandData, bisLoading]);
  useEffect(() => {
    if (!oisLoading && Array.isArray(outletData)) {
      setSelectedOutlet(outletData);
    }
  }, [outletData, oisLoading]);

  // Image
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(openEForm.gambar_produk);

  useEffect(() => {
    if (openEForm.gambar_produk) {
      setSelectedImage(true);
    } else {
      setSelectedImage(false);
    }
  }, [openEForm.gambar_produk]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const newImageUrl = URL.createObjectURL(file);

    setSelectedImage(file);
    setImageUrl(newImageUrl);

    setFormLoginData((prevData) => ({
      ...prevData,
      gambar_produk: file,
    }));
  };

  const handleRemoveImage = () => {
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage);
      setSelectedImage(null);
      setImageUrl(null);
      setFormLoginData((prevData) => ({
        ...prevData,
        gambar_produk: "",
      }));
    }
  };
  // Form Variant

  const [variants, setVariants] = useState({
    variant_name: openEForm.variant_name,
    harga_produk: openEForm.harga_produk,
    harga_modal: openEForm.harga_modal,
    sku: openEForm.sku,
    stok: openEForm.stok,
    min_stok: openEForm.min_stok,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVariants((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };
  const handleInputChangeP = (e) => {
    const { name, value } = e.target;
    setFormLoginData((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  // Submit
  const [editProduk] = useUpdateproductByIdMutation();
  const [editVariant] = useUpdatevariantByIdMutation();
  const updateProduct = async () => {
    try {
      const formData = new FormData();
      formData.append("gambar_produk", formLoginData.gambar_produk);
      // Mengirim permintaan pembaruan data produk
      const productUpdateData = {
        id_produk: openEForm.id_produk,
        id_categories: formLoginData.id_categories,
        id_brand: formLoginData.id_brand,
        id_outlet: formLoginData.id_outlet,
        produk_name: formLoginData.produk_name,
        gambar_produk: formData,
        description: formLoginData.desc,
      };

      // Gantilah 'editProduk' dengan fungsi API yang sesuai
      const productResponse = await editProduk(productUpdateData);
      toast.success("Product updated successfully.");
    } catch (error) {
      // Penanganan kesalahan produk
      console.error("Error updating product:", error);
      toast.error("An error occurred while updating the product.");
    }
  };

  const updateVariant = async () => {
    try {
      // Mengirim permintaan pembaruan data variant
      const variantUpdateData = {
        id_produk_variant: openEForm.id_produk_variant,
        variant_name: variants.variant_name,
        harga_produk: variants.harga_produk,
        harga_modal: variants.harga_modal,
        sku: variants.sku,
        stok: variants.stok,
        min_stok: variants.min_stok,
      };

      // Gantilah 'editVariant' dengan fungsi API yang sesuai
      const variantResponse = await editVariant(variantUpdateData);
      toast.success("Variant updated successfully.");
    } catch (error) {
      // Penanganan kesalahan variant
      console.error("Error updating variant:", error);
      toast.error("An error occurred while updating the variant.");
    }
  };
  const submitHandler = async () => {
    try {
      await updateProduct();
      await updateVariant();
      onEdit();
      setFormLoginData({
        id_categories: "",
        id_brand: "",
        id_outlet: "",
        produk_name: "",
        gambar_produk: "",
        desc: "",
      });
      setVariants({
        variant_name: "",
        harga_produk: "",
        harga_modal: "",
        sku: "",
        stok: "",
        min_stok: "",
      });
      closeEForm();
    } catch (error) {
      // Penanganan kesalahan umum
      console.error("Error:", error);
      toast.error("An error occurred.");
    }
  };

  return (
    <>
      <div className="flex justify-center items-center ">
        <Card className="w-full max-w-[94rem]">
          <CardHeader
            color="gray"
            floated={false}
            shadow={false}
            className="m-0 rounded-b-none py-7 px-4 text-left bg-black"
          >
            <Typography variant="h4" color="white" className="ml-2">
              Add Data Product
            </Typography>
          </CardHeader>

          <CardBody className="flex lg:flex-row">
            <div className="lg:w-1/2 p-4">
              {/* Form Sebelah Kiri */}
              <form className="flex flex-col gap-4">
                <div className="flex items-center">
                  <div
                    className={`w-16 h-16 rounded-md shadow-md ${
                      selectedImage ? "" : "border border-gray-300"
                    }`}
                    style={{ position: "relative" }}
                  >
                    {selectedImage && (
                      <img
                        src={imageUrl}
                        alt="Uploaded"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        className="rounded-md"
                      />
                    )}
                    {!selectedImage && (
                      <div
                        className="absolute inset-0 flex items-center justify-center text-gray-400"
                        style={{ fontSize: "0.8rem" }}
                      >
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="flex items-center ml-4 space-x-2">
                    {!selectedImage && (
                      <label
                        htmlFor="upload-input"
                        className="cursor-pointer bg-black text-white py-2 px-4 rounded-md shadow-md transition duration-300 hover:bg-blue-600"
                      >
                        Choose File
                      </label>
                    )}
                    {selectedImage && (
                      <button
                        className="bg-red-600 text-white py-1 px-2 rounded-md shadow-md transition duration-300 hover:bg-red-800"
                        onClick={handleRemoveImage}
                      >
                        Remove Image
                      </button>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="upload-input"
                    />
                  </div>
                </div>
                <Input
                  label="Produk"
                  type="text"
                  value={formLoginData.produk_name}
                  onChange={handleInputChangeP}
                />
                <Textarea
                  label="Dekripsi"
                  type="text"
                  value={formLoginData.desc}
                  onChange={handleInputChangeP}
                />
              </form>
            </div>
            <div className="lg:w-1/2 p-4">
              {/* Form Sebelah Kanan */}
              <form className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <label className="text-sm font-medium">Outlet</label>
                  <select
                    id="id_outlet"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                    value={formLoginData.id_outlet}
                    onChange={handleInputChangeP}
                  >
                    <option value="">Pilih Outlet</option>
                    {Array.isArray(outletData?.data?.rows) ? (
                      outletData.data.rows.map((outlet) => (
                        <option
                          key={outlet.id_outlet}
                          value={String(outlet.id_outlet)}
                        >
                          {outlet.nama_outlet}
                        </option>
                      ))
                    ) : (
                      <option>Data Tidak Tersedia</option>
                    )}
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium">Kategori</label>
                  <select
                    id="id_categories"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                    value={formLoginData.id_categories}
                    onChange={handleInputChangeP}
                  >
                    <option value="">Pilih Kategori</option>
                    {Array.isArray(categoryData?.data?.rows) ? (
                      categoryData.data.rows.map((category) => (
                        <option
                          key={category.id_categories}
                          value={String(category.id_categories)}
                        >
                          {category.categories_name}
                        </option>
                      ))
                    ) : (
                      <option>Data Tidak Tersedia</option>
                    )}
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium">Brand</label>
                  <select
                    id="id_brands_produk"
                    value={formLoginData.id_brand}
                    onChange={handleInputChangeP}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                  >
                    <option value="">Pilih Brands</option>
                    {Array.isArray(brandData?.data?.rows) ? (
                      brandData.data.rows.map((brands) => (
                        <option
                          key={brands.id_brands_produk}
                          value={String(brands.id_brands_produk)}
                        >
                          {brands.brand_name}
                        </option>
                      ))
                    ) : (
                      <option>Data Tidak Tersedia</option>
                    )}
                  </select>
                </div>
              </form>
            </div>
          </CardBody>
          {/* Form Ditengah tengah */}
          {/* Form Penerima Penambahan Variant */}
          <CardBody className="flex flex-col">
            <div className="overflow-x-auto  max-h-[20vh]">
              <div className="flex  grid-cols-7 gap-4 md:gap-4 md:w-auto p-4">
                <Input
                  label="Variant"
                  type="text"
                  name="variant_name"
                  value={variants.variant_name}
                  onChange={handleInputChange}
                />

                <Input
                  label="Harga Produk"
                  type="number"
                  name="harga_produk"
                  value={variants.harga_produk}
                  onChange={handleInputChange}
                />
                <Input
                  label="Harga Modal"
                  type="number"
                  name="harga_modal"
                  value={variants.harga_modal}
                  onChange={handleInputChange}
                />
                <Input
                  label="SKU"
                  type="text"
                  name="sku"
                  value={variants.sku}
                  onChange={handleInputChange}
                />
                <Input
                  label="Stok"
                  type="number"
                  name="stok"
                  value={variants.stok}
                  onChange={handleInputChange}
                />
                <Input
                  label="Min Stok"
                  type="number"
                  name="min_stok"
                  value={variants.min_stok}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </CardBody>
          {/* Footer */}
          <div className="flex justify-end gap-2 p-4">
            <Button
              size="md"
              onClick={closeEForm}
              className="bg-gray-600 hover:bg-red-400"
            >
              Cancel
            </Button>
            <Button
              size="md"
              type="button"
              onClick={submitHandler}
              className="bg-black hover:bg-blue-600 "
            >
              Update
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
};
EditVariant.propTypes = {
  closeForm: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};
export default EditVariant;
