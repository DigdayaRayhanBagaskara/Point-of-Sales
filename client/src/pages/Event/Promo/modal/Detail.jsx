/* eslint-disable react/prop-types */

import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
// Import Edit Data

import PropTypes from "prop-types";

const Detail = ({ closeDForm, openDForm }) => {
  console.log(openDForm.produk_categories.categories_name);
  return (
    <>
      <div className="flex justify-center items-center ">
        <Card className="w-full max-w-[30rem]">
          <CardHeader
            color="gray"
            floated={false}
            shadow={false}
            className="m-0 rounded-b-none py-7 px-4 text-left bg-black"
          >
            <Typography variant="h4" color="white" className="ml-2">
              Detail Data
            </Typography>
          </CardHeader>
          <CardBody>
            <div className="flex flex-col gap-4 my-4">
              <div className="flex items-center">
                <label className="text-gray-600 font-semibold">
                  ID Promo :
                </label>
                <span className="text-gray-800 pl-2">{openDForm.id_promo}</span>
              </div>
              <div className="flex items-center">
                <label className="text-gray-600 font-semibold">
                  Tipe Promo :
                </label>
                <span className="text-gray-800 pl-2">
                  {openDForm.promo_type}
                </span>
              </div>
              <div className="flex items-center">
                <label className="text-gray-600 font-semibold">
                  Discount :
                </label>
                <span className="text-gray-800 pl-2">
                  {openDForm.discount.discount_names}
                </span>
              </div>
              <div className="flex items-center">
                <label className="text-gray-600 font-semibold">
                  Kategori :
                </label>
                <span className="text-gray-800 pl-2">
                  {openDForm.produk_categories.categories_name ||
                    "Data tidak tersedia"}
                </span>
              </div>
              <div className="flex items-center">
                <label className="text-gray-600 font-semibold">Produk :</label>
                <span className="text-gray-800 pl-2">
                  {openDForm.produk.produk_name || "Data tidak tersedia"}
                </span>
              </div>
              <div className="flex items-center">
                <label className="text-gray-600 font-semibold">
                  Brand Produk :
                </label>
                <span className="text-gray-800 pl-2">
                  {openDForm.brands_produk.brand_name || "Data tidak tersedia"}
                </span>
              </div>
              <div className="flex items-center">
                <label className="text-gray-600 font-semibold">Variant :</label>
                <span className="text-gray-800 pl-2">
                  {openDForm.produk_variant.variant_name ||
                    "Data tidak tersedia"}
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-2 my-8">
              <Button
                size="md"
                onClick={closeDForm}
                className="bg-gray-800 hover:bg-red-400"
              >
                Close
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

Detail.propTypes = {
  closeDForm: PropTypes.func.isRequired,
  openDForm: PropTypes.object,
};

export default Detail;
