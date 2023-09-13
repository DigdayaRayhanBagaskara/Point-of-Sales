/* eslint-disable no-unused-vars */
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
import TableDetail from "./component/TableDetail";

const Detail = ({ closeDForm, openDForm }) => {
  // Data Head
  const TABLE_HEAD = [
    {
      name: "NAMA VARIANT",
      cell: (row) => row.variant_name,
    },
    {
      name: "HARGA PRODUK",
      cell: (row) => row.harga_produk,
    },
    {
      name: "HARGA MODAL",
      cell: (row) => row.harga_modal,
    },
    {
      name: "SKU",
      cell: (row) => row.sku,
    },
    {
      name: "MINIMAL STOK",
      cell: (row) => row.min_stok,
    },
    {
      name: "STOK",
      cell: (row) => row.stok,
    },
  ];

  return (
    <>
      <div className="flex justify-center items-center place-content-center h-[79vh]">
        <Card className="w-full max-w-[55rem]">
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
                  ID Produk:
                </label>
                <span className="text-gray-800 pl-2">
                  {openDForm.id_produk}
                </span>
              </div>
              <div className="flex items-center ">
                <label className="text-gray-600 font-semibold">Produk :</label>
                <span className="text-gray-800 pl-2">
                  {openDForm.produk_name}
                </span>
              </div>
              <label className="text-gray-600 font-semibold">Variant :</label>
              <div className="grid grid-flow-row items-center overflow-y-auto max-h-[20vh]">
                <span className="text-gray-800 pl-2">
                  <TableDetail head={TABLE_HEAD} rows={[openDForm]} />
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
