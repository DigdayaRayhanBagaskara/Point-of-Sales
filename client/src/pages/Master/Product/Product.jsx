/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import {
  MagnifyingGlassCircleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import Table from "../../../components/Table";
import FormProduct from "./FormProduct";
import EditProduct from "./EditProduct";
import Pagination from "../../../components/Pagination";
import {
  useDeleteproductByIdMutation,
  useGetListproductQuery,
} from "../../../redux/services/productApi";
import { deleteProduct } from "../../../redux/features/counter/productSlice";

const Product = () => {
  const dispatch = useDispatch();
  const [isFormOpen, setFormOpen] = useState(false);
  const [EdFormOpen, setEdFormOpen] = useState(null);
  const [refreshData, setRefreshData] = useState(false);
  const [DOpen, setDOpen] = useState(null);
  const [params, setParams] = useState({
    keyword: "",
    limit: 5,
    offset: 0,
  });

  const categoryQuery = useGetListproductQuery({
    keyword: params.keyword,
    limit: params.limit,
    offset: params.offset,
  });

  useEffect(() => {
    if (refreshData) {
      categoryQuery.refetch();
      setRefreshData(false);
    }
  }, [refreshData, categoryQuery]);

  const handleRefreshData = () => {
    setRefreshData(true);
  };

  const [deleteproduct] = useDeleteproductByIdMutation();

  const handleDelete = async (productId) => {
    const confirmPassword = window.prompt(
      "Enter password to confirm deletion:"
    );

    if (confirmPassword === "qqq") {
      try {
        await deleteproduct(productId);
        dispatch(deleteProduct(deleteproduct));
        toast.success("Data Berhasil Dihapus");
        setRefreshData(true);
        DeleteClose();
      } catch (error) {
        console.error("Terjadi kesalahan saat menghapus data:", error);
        toast.error("Terjadi kesalahan saat menghapus data");
      }
    } else {
      toast.error("Password salah. Penghapusan dibatalkan.");
    }
  };

  const DeleteOpen = (row) => {
    setDOpen(row);
  };

  const DeleteClose = () => {
    setDOpen(null);
  };

  const TABLE_HEAD = [
    {
      name: "ID PRODUCT",
      cell: (row) => row.id_categories,
    },
    {
      name: "NAMA KATEGORI",
      cell: (row) => row.categories_name,
    },
    {
      name: "KETERANGAN",
      cell: (row) => row.keterangan,
    },
    {
      name: "MODEL",
      cell: (row) => row.model,
    },
    {
      name: "ACTION",
      cell: (row) => (
        <div className="flex gap-4 justify-center items-center">
          <Button onClick={() => openForm(row)}>Edit</Button>
          <Button color="red" onClick={() => handleDelete(row)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const openForm = (row) => {
    setFormOpen(true);
    setEdFormOpen(row);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEdFormOpen(null);
  };

  return (
    <>
      <div className="ml-2 pt-5s mx-auto mb-auto h-full min-h-[70vh] p-2 md:pr-2">
        <Card className="h-full w-full">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8 flex items-center justify-between gap-8">
              <div>
                <Typography variant="h5" color="blue-gray">
                  Data Categories
                </Typography>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <Button
                  className="flex items-center gap-3"
                  size="sm"
                  onClick={() => setFormOpen(true)}
                >
                  <UserPlusIcon strokeWidth={2} className="h-4 w-4" />
                  <span className="flex items-center">Add Data</span>
                </Button>
              </div>
            </div>
          </CardHeader>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row m-4 mb-3">
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassCircleIcon className="h-5 w-5" />}
              />
            </div>
          </div>
          <Table head={TABLE_HEAD} rows={categoryQuery.data?.data?.rows} />
          <CardFooter className="flex items-center justify-center border-t border-blue-gray-50 p-4">
            <Pagination />
          </CardFooter>
        </Card>
      </div>
      {isFormOpen && (
        <div className="fixed inset-0 items-center justify-center bg-black bg-opacity-50">
          <FormProduct closeForm={closeForm} onEdit={handleRefreshData} />
        </div>
      )}
      {EdFormOpen && (
        <div className="fixed inset-0 items-center justify-center bg-black bg-opacity-50">
          <EditProduct
            closeForm={closeForm}
            EdFormOpen={EdFormOpen}
            onEdit={handleRefreshData}
          />
        </div>
      )}
    </>
  );
};

export default Product;
