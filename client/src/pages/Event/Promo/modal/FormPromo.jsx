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
  Select,
  Option,
  Textarea,
} from "@material-tailwind/react";
// import Add data
import { useGetListcategoryQuery } from "../../../../redux/services/categoryproductApi";
import {
  useGetListdiscountQuery,
  useGetdiscountByIdQuery,
} from "../../../../redux/services/discountApi";
import { useGetListbrandQuery } from "../../../../redux/services/brandproductApi";
import { useGetListproductQuery } from "../../../../redux/services/productApi";
import { useGetListvariantQuery } from "../../../../redux/services/variantproductApi";
import { useAddpromoMutation } from "../../../../redux/services/promoApi";
import { addpromo } from "../../../../redux/features/counter/promoSlice";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

// import Notifikasi
import { toast } from "react-toastify";
import moment from "moment";

const Formpromo = ({ closeForm, onEdit }) => {
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

  const [formLoginData, setFormLoginData] = useState({
    promo_type: "",
    id_categories: "",
    id_produk: "",
    id_brands_produk: "",
    id_discount: "",
    id_produk_variant: "",
    name: "",
    expired: "",
  });

  const { promo_type, name, expired, id_discount } = formLoginData;

  const [createCategory] = useAddpromoMutation();
  const submitHandler = async () => {
    console.log(submitHandler);
    try {
      if (!promo_type || !name || !expired || !id_discount) {
        toast.error("Data Harus Diisi Terlebih Dahulu");
        return;
      }
      const response = await createCategory({
        promo_type: formLoginData.promo_type,
        id_categories: formLoginData.id_categories || null,
        id_produk: formLoginData.id_produk || null,
        id_brands_produk: formLoginData.id_brands_produk || null,
        id_discount: formLoginData.id_discount,
        id_produk_variant: formLoginData.id_produk_variant || null,
        name: formLoginData.name,
        expired: moment
          .utc(formLoginData.expired)
          .format("YYYY-MM-DD HH:MM:SS"),
      });

      dispatch(addpromo(response)); // Jika response berisi data baru dari server
      onEdit();
      toast.success("Data Berhasil Disimpan");
      // Reset form data setelah berhasil menyimpan
      setFormLoginData({
        promo_type: "",
        id_categories: "",
        id_produk: "",
        id_brands_produk: "",
        id_discount: "",
        id_produk_variant: "",
        name: "",
        expired: "",
      });
      closeForm();
    } catch (error) {
      console.error("Error while saving Promo:", error);
    }
  };
  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    setFormLoginData({
      ...formLoginData,
      showSelect: isChecked, // Menyimpan status checkbox
      // Reset the corresponding fields if the checkbox is unchecked
      id_categories: isChecked ? formLoginData.id_categories : "",
    });
  };

  const [showProdukCheckbox, setShowProdukCheckbox] = useState(false);
  const [showBrandCheckbox, setShowBrandCheckbox] = useState(false);
  const [showVariantCheckbox, setShowVariantCheckbox] = useState(false);

  const handleProdukCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    setShowProdukCheckbox(isChecked);
    // Reset the corresponding field if the checkbox is unchecked
    setFormLoginData({
      ...formLoginData,
      id_produk: isChecked ? formLoginData.id_produk : "",
    });
  };

  const handleBrandCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    setShowBrandCheckbox(isChecked);
    // Reset the corresponding field if the checkbox is unchecked
    setFormLoginData({
      ...formLoginData,
      id_brands_produk: isChecked ? formLoginData.id_brands_produk : "",
    });
  };

  const handleVariantCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    setShowVariantCheckbox(isChecked);
    // Reset the corresponding field if the checkbox is unchecked
    setFormLoginData({
      ...formLoginData,
      id_produk_variant: isChecked ? formLoginData.id_produk_variant : "",
    });
  };

  return (
    <>
      <div className="flex justify-center items-center place-content-center ">
        <Card className="w-full  max-w-[30rem] ">
          <CardHeader
            color="gray"
            floated={false}
            shadow={false}
            className="m-0 rounded-b-none py-8 px-4 text-left bg-black"
          >
            <Typography variant="h4" color="white" className="ml-2">
              Add Data
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
                  value={formLoginData.promo_type}
                  onChange={(event) =>
                    setFormLoginData({
                      ...formLoginData,
                      promo_type: event.target.value,
                    })
                  }
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
                  value={formLoginData.id_discount}
                  onChange={(event) =>
                    setFormLoginData({
                      ...formLoginData,
                      id_discount: event.target.value,
                    })
                  }
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
                      checked={formLoginData.showSelect}
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

                  {formLoginData.showSelect && (
                    <select
                      id="id_categories"
                      value={formLoginData.id_categories}
                      onChange={(event) =>
                        setFormLoginData({
                          ...formLoginData,
                          id_categories: event.target.value,
                        })
                      }
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
                      value={formLoginData.id_produk}
                      onChange={(event) =>
                        setFormLoginData({
                          ...formLoginData,
                          id_produk: event.target.value,
                        })
                      }
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
                      value={formLoginData.id_brands_produk}
                      onChange={(event) =>
                        setFormLoginData({
                          ...formLoginData,
                          id_brands_produk: event.target.value,
                        })
                      }
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
                      value={formLoginData.id_produk_variant}
                      onChange={(event) =>
                        setFormLoginData({
                          ...formLoginData,
                          id_produk_variant: event.target.value,
                        })
                      }
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
                  value={formLoginData.name}
                  onChange={(event) =>
                    setFormLoginData({
                      ...formLoginData,
                      name: event.target.value,
                    })
                  }
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
                  value={formLoginData.expired}
                  onChange={(event) =>
                    setFormLoginData({
                      ...formLoginData,
                      expired: event.target.value,
                    })
                  }
                />
              </div>
            </form>

            <div className="flex justify-end gap-2 my-8">
              <Button
                size="md"
                onClick={closeForm}
                className="bg-gray-600 hover:bg-red-400"
              >
                Cancel
              </Button>
              <Button
                size="md"
                type="button"
                onClick={submitHandler}
                className="bg-black hover:bg-blue-600"
              >
                Save
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
};
Formpromo.propTypes = {
  closeForm: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};
export default Formpromo;
