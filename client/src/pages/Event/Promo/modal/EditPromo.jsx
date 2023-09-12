/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
// Import Edit Data
import { useUpdatepromoByIdMutation } from "../../../../redux/services/promoApi";
import { updatepromo } from "../../../../redux/features/counter/promoSlice";
import { useGetListbrandQuery } from "../../../../redux/services/brandproductApi";
import { useGetListproductQuery } from "../../../../redux/services/productApi";
import { useGetListvariantQuery } from "../../../../redux/services/variantproductApi";
import { useGetListcategoryQuery } from "../../../../redux/services/categoryproductApi";

import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

// import Notifikasi
import { toast } from "react-toastify";
import { useGetListdiscountQuery } from "../../../../redux/services/discountApi";
import moment from "moment";

const EditPromo = ({ closeEForm, openEForm, onEdit }) => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [discount, setDiscount] = useState([]);
  const [produk, setProduk] = useState([]);
  const [brand, setBrand] = useState([]);
  const [variant, setVariant] = useState([]);
  const { data: categoryData, isLoading } = useGetListcategoryQuery({
    limit: 1000,
  });
  const { data: discountData, disLoading } = useGetListdiscountQuery({
    limit: 1000,
  });
  const { data: produkData, pisLoading } = useGetListproductQuery({
    limit: 1000,
  });
  const { data: brandData, bisLoading } = useGetListbrandQuery({
    limit: 1000,
  });
  const { data: variantData, visLoading } = useGetListvariantQuery({
    limit: 1000,
  });
  const [editedCategory, setEditedCategory] = useState({
    id_promo: openEForm.id_promo,
    promo_type: openEForm.promo_type,
    id_categories: openEForm.id_categories,
    id_produk: openEForm.id_produk,
    id_brands_produk: openEForm.id_brands_produk,
    id_discount: openEForm.id_discount,
    id_produk_variant: openEForm.id_produk_variant,
    name: openEForm.name,
    expired: moment.utc(openEForm.expired).format("YYYY-MM-DD HH:MM:SS"),
  });
  console.log(openEForm);
  const [isShowSelectChecked, setIsShowSelectChecked] = useState(
    openEForm.id_categories !== null
  );
  const [showProdukCheckbox, setShowProdukCheckbox] = useState(
    openEForm.id_produk !== null
  );
  const [showBrandCheckbox, setShowBrandCheckbox] = useState(
    openEForm.id_brands_produk !== null
  );
  const [showVariantCheckbox, setShowVariantCheckbox] = useState(
    openEForm.id_produk_variant !== null
  );
  useEffect(() => {
    if (!isLoading && Array.isArray(categoryData)) {
      setCategories(categoryData);
    }
  }, [categoryData, isLoading]);
  useEffect(() => {
    if (!disLoading && Array.isArray(discountData)) {
      setDiscount(discountData);
    }
  }, [discountData, disLoading]);
  useEffect(() => {
    if (!pisLoading && Array.isArray(produkData)) {
      setProduk(produkData);
    }
  }, [produkData, pisLoading]);
  useEffect(() => {
    if (!bisLoading && Array.isArray(brandData)) {
      setBrand(brandData);
    }
  }, [brandData, bisLoading]);
  useEffect(() => {
    if (!visLoading && Array.isArray(variantData)) {
      setVariant(variantData);
    }
  }, [variantData, visLoading]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  const [editCategory] = useUpdatepromoByIdMutation();

  const submitHandler = async () => {
    try {
      console.log("Submitting edited category:", editedCategory);
      const fieldsToNull = [
        "id_categories",
        "id_produk",
        "id_brands_produk",
        "id_produk_variant",
      ];
      const editedCategoryWithNulls = { ...editedCategory };

      fieldsToNull.forEach((field) => {
        if (editedCategoryWithNulls[field] === "") {
          editedCategoryWithNulls[field] = null;
        }
      });
      const response = await editCategory({
        ...editedCategoryWithNulls,
      });

      const updatedCategory = response.data;
      dispatch(updatepromo(updatedCategory));

      onEdit();
      toast.success("Data Berhasil Diubah");

      closeEForm();
    } catch (error) {
      console.error("Error while saving category:", error);
    }
  };
  const [originalData, setOriginalData] = useState({ ...openEForm });
  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    setIsShowSelectChecked(isChecked);

    if (isChecked) {
      setEditedCategory({ ...originalData });
    } else {
      setEditedCategory({
        ...editedCategory,
        id_categories: "",
      });
    }
  };

  const handleProdukCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    setShowProdukCheckbox(isChecked);

    if (isChecked) {
      setEditedCategory({ ...originalData });
    } else {
      setEditedCategory({
        ...editedCategory,
        id_produk: "",
      });
    }
  };

  const handleBrandCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    setShowBrandCheckbox(isChecked);

    if (isChecked) {
      setEditedCategory({ ...originalData });
    } else {
      setEditedCategory({
        ...editedCategory,
        id_brands_produk: "",
      });
    }
  };

  const handleVariantCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    setShowVariantCheckbox(isChecked);

    if (isChecked) {
      setEditedCategory({ ...originalData });
    } else {
      setEditedCategory({
        ...editedCategory,
        id_produk_variant: "",
      });
    }
  };

  return (
    <>
      <div className="flex justify-center items-center place-content-center h-[79vh]">
        <Card className="w-full  max-w-[30rem] ">
          <CardHeader
            color="gray"
            floated={false}
            shadow={false}
            className="m-0 rounded-b-none py-7 px-4 text-left bg-black"
          >
            <Typography variant="h4" color="white" className="ml-2">
              Edit Data
            </Typography>
          </CardHeader>
          <CardBody>
            <form className="w-full max-w-md mx-auto space-y-6">
              <div>
                <label
                  htmlFor="promo_type"
                  className="block text-base font-normal pb-2"
                >
                  Tipe Promo
                </label>
                <Input
                  id="promo_type"
                  name="promo_type"
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 "
                  placeholder="Tipe Promo"
                  value={editedCategory.promo_type}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label
                  htmlFor="id_discount"
                  className="block text-base font-normal"
                >
                  Discount
                </label>
                <select
                  id="id_discount"
                  name="id_discount"
                  value={editedCategory.id_discount}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                >
                  <option value="">Pilih Discount</option>
                  {Array.isArray(discountData?.data?.rows) ? (
                    discountData.data.rows.map((discount) => (
                      <option
                        key={discount.id_discount}
                        value={String(discount.id_discount)}
                      >
                        {discount.discount_names}
                      </option>
                    ))
                  ) : (
                    <option>Data Tidak Tersedia</option>
                  )}
                </select>
              </div>

              <div className="flex space-x-4">
                <div className="w-1/2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={isShowSelectChecked}
                      onChange={handleCheckboxChange}
                      className="mr-2 leading-tight"
                    />
                    <label
                      htmlFor="id_categories"
                      className="block text-base font-normal"
                    >
                      Kategori
                    </label>
                  </div>

                  {isShowSelectChecked && (
                    <select
                      id="id_categories"
                      name="id_categories"
                      value={editedCategory.id_categories}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
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
                  )}
                </div>

                <div className="w-1/2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={showProdukCheckbox}
                      onChange={handleProdukCheckboxChange}
                      className="mr-2 leading-tight"
                    />
                    <label
                      htmlFor="id_produk"
                      className="block text-base font-normal"
                    >
                      Produk
                    </label>
                  </div>
                  {showProdukCheckbox && (
                    <select
                      id="id_produk"
                      name="id_produk"
                      value={editedCategory.id_produk}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                    >
                      <option value="">Pilih Produk</option>
                      {Array.isArray(produkData?.data?.rows) ? (
                        produkData.data.rows.map((produk) => (
                          <option
                            key={produk.id_produk}
                            value={String(produk.id_produk)}
                          >
                            {produk.produk_name}
                          </option>
                        ))
                      ) : (
                        <option>Data Tidak Tersedia</option>
                      )}
                    </select>
                  )}
                </div>
              </div>

              <div className="flex space-x-4">
                <div className="w-1/2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={showBrandCheckbox}
                      onChange={handleBrandCheckboxChange}
                      className="mr-2 leading-tight"
                    />
                    <label
                      htmlFor="id_brands_produk"
                      className="block text-base font-normal"
                    >
                      Brand
                    </label>
                  </div>
                  {showBrandCheckbox && (
                    <select
                      id="id_brands_produk"
                      name="id_brands_produk"
                      value={editedCategory.id_brands_produk}
                      onChange={handleInputChange}
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
                  )}
                </div>

                <div className="w-1/2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={showVariantCheckbox}
                      onChange={handleVariantCheckboxChange}
                      className="mr-2 leading-tight"
                    />
                    <label
                      htmlFor="id_produk_variant"
                      className="block text-base font-normal"
                    >
                      Variant
                    </label>
                  </div>
                  {showVariantCheckbox && (
                    <select
                      id="id_produk_variant"
                      name="id_produk_variant"
                      value={editedCategory.id_produk_variant}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                    >
                      <option value="">Pilih Variant</option>
                      {Array.isArray(variantData?.data?.rows) ? (
                        variantData.data.rows.map((variant) => (
                          <option
                            key={variant.id_produk_variant}
                            value={String(variant.id_produk_variant)}
                          >
                            {variant.variant_name}
                          </option>
                        ))
                      ) : (
                        <option>Data Tidak Tersedia</option>
                      )}
                    </select>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block text-base font-normal pb-2"
                >
                  Nama Promo
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 "
                  placeholder="Nama Promo"
                  value={editedCategory.name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor="expired"
                  className="block text-base font-normal"
                >
                  Expired
                </label>
                <Input
                  id="expired"
                  name="expired"
                  type="datetime-local"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                  value={moment
                    .utc(editedCategory.expired)
                    .format("YYYY-MM-DDTHH:mm")}
                  onChange={handleInputChange}
                />
              </div>
            </form>
            <div className="flex justify-end gap-2 my-8">
              <Button
                size="md"
                onClick={closeEForm}
                className="bg-gray-800 hover:bg-red-400"
              >
                Cancel
              </Button>
              <Button
                size="md"
                type="button"
                onClick={submitHandler}
                className="bg-black hover:bg-blue-600"
              >
                Update
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

EditPromo.propTypes = {
  closeEForm: PropTypes.func.isRequired,
  openEForm: PropTypes.object,
};

export default EditPromo;
