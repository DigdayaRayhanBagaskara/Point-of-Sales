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
import { useGetListcategoryQuery } from "../../../redux/services/categoryproductApi";

import Table from "../../../components/Table";
import Formcategory from "./FormCategory";
import EditCate from "./EditCate";
import Pagination from "../../../components/Pagination";
import {
  setSearchTerm,
  setCurrentPage,
} from "../../../redux/features/counter/categorySlice";
import Delete from "./Delete";

const Categoryproduct = () => {
  const dispatch = useDispatch();
  const [isFormOpen, setFormOpen] = useState(false);
  const [EdFormOpen, setEdFormOpen] = useState(null);
  const [DeleteOpen, setDeleteOpen] = useState(null);
  const [refreshData, setRefreshData] = useState(false);
  const [isDataFound, setDataFound] = useState(true);
  const searchTerm = useSelector((state) => state.categorySlice.searchTerm);
  // Get Data
  const [params, setParams] = useState({
    keyword: "",
    limit: 5,
    offset: 0,
    searchTerm: "",
  });
  const categoryQuery = useGetListcategoryQuery({
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
      categoryQuery.data?.data?.rows &&
        categoryQuery.data?.data?.rows.length > 0
    );
  }, [categoryQuery.data?.data?.rows]);

  // RefeshPages
  useEffect(() => {
    if (refreshData) {
      categoryQuery.refetch();
      setRefreshData(false);
    }
  }, [refreshData, categoryQuery]);

  const handleRefreshData = () => {
    setRefreshData(!refreshData);
  };
  // Data Head
  const TABLE_HEAD = [
    {
      name: "ID KATEGORI",
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
  const counts = useGetListcategoryQuery().data?.data?.total_row;
  const totalPages = Math.ceil(counts / params.limit);

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
            <Table head={TABLE_HEAD} rows={categoryQuery.data?.data?.rows} />
          ) : (
            <div className="text-center text-red-500 uppercase">
              Pencarian Tidak Ditemukan
            </div>
          )}
          {/* Pagination */}

          <Pagination totalPages={totalPages} onPageChange={handlePageChange} />
        </Card>
      </div>
      {/* Form Add */}
      {isFormOpen && (
        <div className="fixed inset-0 items-center justify-center bg-black bg-opacity-50">
          <Formcategory closeForm={closeForm} onEdit={handleRefreshData} />
        </div>
      )}
      {/* FOrm Edit */}
      {EdFormOpen && (
        <div className="fixed inset-0 items-center justify-center bg-black bg-opacity-50">
          <EditCate
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

export default Categoryproduct;
