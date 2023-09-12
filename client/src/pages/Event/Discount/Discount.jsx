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

import { useDispatch, useSelector } from "react-redux";
import { useGetListdiscountQuery } from "../../../redux/services/discountApi";

import Table from "../../../components/Table";
import FormDiscount from "./FormDiscount";
import EditDiscount from "./EditDiscount";
import Pagination from "../../../components/Pagination";
import {
  setSearchTerm,
  setCurrentPage,
  setdiscount,
} from "../../../redux/features/counter/discountSlice";
import Delete from "./Delete";
import moment from "moment";
const Discount = () => {
  const dispatch = useDispatch();
  const [isFormOpen, setFormOpen] = useState(false);
  const [EdFormOpen, setEdFormOpen] = useState(null);
  const [DeleteOpen, setDeleteOpen] = useState(null);
  const [refreshData, setRefreshData] = useState(false);
  const [isDataFound, setDataFound] = useState(true);
  const searchTerm = useSelector((state) => state.discountSlice.searchTerm);
  // Get Data
  const [params, setParams] = useState({
    keyword: "",
    limit: 5,
    offset: 0,
    searchTerm: "",
  });
  const discountQuery = useGetListdiscountQuery({
    keyword: params.keyword,
    limit: params.limit,
    offset: params.offset,
    searchTerm: searchTerm,
  });
  // Search

  const handleSearch = (e) => {
    const { value } = e.target;
    dispatch(setSearchTerm(value));
    setParams({ ...params, keyword: value, offset: 0 });
  };

  useEffect(() => {
    setDataFound(
      discountQuery.data?.data?.rows &&
        discountQuery.data?.data?.rows.length > 0
    );
  }, [discountQuery.data?.data?.rows]);

  // RefeshPages
  useEffect(() => {
    if (refreshData) {
      discountQuery.refetch();
      setRefreshData(false);
    }
  }, [refreshData, discountQuery]);

  const handleRefreshData = () => {
    setRefreshData(true);
  };
  // Data Head
  const TABLE_HEAD = [
    {
      name: "ID DISKON",
      cell: (row) => row.id_discount,
    },
    {
      name: "NAMA DISKON",
      cell: (row) => row.discount_names,
    },
    {
      name: "DISKON",
      cell: (row) => {
        if (row.discount_type === "amount" && row.persen === 0) {
          return "Rp " + formatAmount(row.amount);
        } else if (row.discount_type === "%" && row.amount === 0) {
          return row.persen + "%";
        } else {
          return 0;
        }
      },
    },
    {
      name: "EXPIRED",
      cell: (row) => moment.utc(row.expired).format("DD-MM-YYYY HH:mm"),
    },
    {
      name: "ACTION",
      cell: (row) => (
        <div className="flex gap-4 justify-center items-center">
          <Button onClick={() => openEForm(row)} color="blue">
            Edit
          </Button>
          <Button color="red" onClick={() => DeleteOpened(row)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];
  function formatAmount(amount) {
    return amount.toLocaleString("id-ID");
  }
  // OPEN FORM & CLOSE FORM
  const openForm = (row) => {
    setFormOpen(true);
  };
  const openEForm = (row) => {
    setEdFormOpen(row);
  };

  const closeForm = () => {
    setFormOpen(false);
  };
  const closeEForm = () => {
    setEdFormOpen(null);
  };
  const DeleteOpened = (row) => {
    setDeleteOpen(row);
  };

  const DeleteClose = () => {
    setDeleteOpen(null);
  };
  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
    setParams({ ...params, offset: (page - 1) * params.limit }); // Update the offset based on the new page
  };
  const counts = useGetListdiscountQuery().data?.data?.count;
  const totalPages = Math.ceil(counts / params.limit);

  return (
    <>
      <div className="ml-2 pt-5s mx-auto mb-auto h-full min-h-[70vh] p-2 md:pr-2">
        <Card className="h-full w-full">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8 flex items-center justify-between gap-8">
              <div>
                <Typography variant="h5" color="blue-gray">
                  Data Discount
                </Typography>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <Button
                  color="blue"
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
                value={searchTerm}
                onChange={(e) => handleSearch(e)} // Panggil fungsi handleSearch
              />
            </div>
          </div>

          {/* Tabel */}
          {isDataFound ? (
            <Table head={TABLE_HEAD} rows={discountQuery.data?.data?.rows} />
          ) : (
            <div className="text-center text-red-500 uppercase">
              Pencarian Tidak Ditemukan
            </div>
          )}
          {/* Pagination */}
          <CardFooter className="flex items-center justify-center border-t border-blue-gray-50 p-4">
            <Pagination
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </CardFooter>
        </Card>
      </div>
      {/* Form Add */}
      {isFormOpen && (
        <div className="fixed inset-0 items-center justify-center bg-black bg-opacity-50">
          <FormDiscount closeForm={closeForm} onEdit={handleRefreshData} />
        </div>
      )}
      {/* FOrm Edit */}
      {EdFormOpen && (
        <div className="fixed inset-0 items-center justify-center bg-black bg-opacity-50">
          <EditDiscount
            closeEForm={() => setEdFormOpen(null)}
            openEForm={EdFormOpen}
            onEdit={handleRefreshData}
          />
        </div>
      )}
      {/* Konfirmasi Delete */}
      {DeleteOpen && (
        <div className="fixed inset-0 items-center justify-center bg-black bg-opacity-50">
          <div className="flex justify-center items-center place-content-center h-[79vh]">
            <Card className="w-full max-w-[24rem]">
              <CardHeader
                color="gray"
                floated={false}
                shadow={false}
                className="m-0 rounded-b-none py-7 px-4 text-left bg-black"
              >
                <Typography variant="h4" color="white" className="ml-2">
                  Hapus Data
                </Typography>
              </CardHeader>

              <CardBody>
                <Delete
                  DeleteClose={() => setDeleteOpen(null)}
                  DeleteOpened={DeleteOpen}
                  onEdit={handleRefreshData}
                />
              </CardBody>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default Discount;
