/* eslint-disable no-unused-vars */
import { Button, Card, CardHeader, CardBody, Typography, CardFooter, Input } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import {
  UserPlusIcon,
  MagnifyingGlassCircleIcon
} from "@heroicons/react/24/solid";
import { useGetListusersQuery, useDeleteusersByIdMutation } from "../../../redux/services/usersApi";
import { toast } from "react-toastify";

import Table from "../../../components/Table";
import Pagination from "../../../components/Pagination";
import FormUsers from "./FormUsers";
import DeleteUsers from "./DeleteUsers";
import EditUsers from "./EditUsers";

const Users = () => {
  const [showModalInsert, setShowModalInsert] = useState(false)
  const [showModalEdit, setShowModalEdit] = useState(false)
  const [showModalDelete, setShowModalDelete] = useState(false)
  const [selectedUser, setSelectedUser] = useState()

  const [params, setParams] = useState({
    keyword: "",
    limit: 5,
    offset: 0,
  });


  const userListData = useGetListusersQuery({
    keyword: params.keyword,
    limit: params.limit,
    offset: params.offset,
  });

  const totalPages = (userListData.data?.data?.total_row === 0 ? 1 : Math.ceil(userListData.data?.data?.total_row / params.limit))

  useEffect(() => {
    if (userListData.isError) {
      toast.dismiss()
      toast.error(userListData.error?.data?.message ? userListData.error?.data?.message : 'Something wrong, please contact the admin');
    }
  }, [userListData])

  const header = [
    {
      name: "Name",
      cell: (row) => row.name,
    },
    {
      name: "Username",
      cell: (row) => row.username,
    },
    {
      name: "Email",
      cell: (row) => row.email,
    },
    {
      name: "No. HP",
      cell: (row) => row.nohp,
    },
    {
      name: "Action ",
      cell: (row) => (
        <>
          <div className="flex justify-center gap-4">
            <Button color="blue" onClick={() => onShowModalEdit(row)}>Edit</Button>
            <Button color="red" onClick={() => onShowModalDelete(row)}>
              Delete
            </Button>
          </div>
        </>
      ),
    },
  ];

  const onShowModalInsert = () => {
    setShowModalInsert(true)
  }
  const closeModalInsert = () => {
    setShowModalInsert(false)
  }
  const onShowModalEdit = (row) => {
    setSelectedUser(row)
    setShowModalEdit(true)
  }
  const closeModalEdit = () => {
    setShowModalEdit(false)
    setSelectedUser()
  }
  const onShowModalDelete = (row) => {
    setSelectedUser(row)
    setShowModalDelete(true)
  }
  const closeModalDelete = () => {
    setShowModalDelete(false)
    setSelectedUser()
  }

  const onPageChange = (value) => {
    setParams({ ...params, offset: ((parseInt(value) - 1) * params.limit) })
  }

  const handleSearch = (e) => {
    const { value } = e.target;
    setParams({ ...params, keyword: value, offset: 0 });
  };

  return (
    <>
      <div className="ml-2 pt-5s mx-auto mb-auto h-full min-h-[70vh] p-2 md:pr-2">
        <Card className="h-full w-full">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8 flex items-center justify-between gap-8">
              <div>
                <Typography variant="h5" color="blue-gray">
                  Data Users
                </Typography>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <Button color="blue" className="flex items-center gap-3" size="sm" onClick={() => onShowModalInsert()}>
                  <UserPlusIcon strokeWidth={2} className="h-4 w-4" />
                  Add Data
                </Button>
              </div>
            </div>
          </CardHeader>

          <div className="flex flex-col items-center justify-between gap-4 md:flex-row m-4 mb-3">
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassCircleIcon className="h-5 w-5" />}
                value={params.keyword}
                onChange={(e) => handleSearch(e)} // Panggil fungsi handleSearch
              />
            </div>
          </div>

          {/* Table */}
          <Table head={header} rows={userListData.isSuccess ? userListData.data?.data?.rows : []} />
          <CardFooter className="flex items-center justify-center border-t border-blue-gray-50 p-4">
            <Pagination totalPages={totalPages} onPageChange={onPageChange} />
          </CardFooter>
        </Card>
      </div>

      {/* FORM INSERT */}
      {
        showModalInsert &&
        <div className="fixed inset-0 items-center justify-center bg-black bg-opacity-50">
          <FormUsers cancel={closeModalInsert} />
        </div>
      }
      {/* FORM EDIT */}
      {
        showModalEdit &&
        <div className="fixed inset-0 items-center justify-center bg-black bg-opacity-50">
          <EditUsers
            cancel={closeModalEdit}
            data={selectedUser}
          />
        </div>
      }
      {/* FORM DELETE */}
      {
        showModalDelete &&
        <div className="fixed inset-0 items-center justify-center bg-black bg-opacity-50">
          <div className="flex justify-center items-center place-content-center h-[79vh]">
            <Card className="w-full max-w-[24rem]">
              <CardHeader
                color="gray"
                floated={false}
                shadow={false}
                className="m-0 grid place-items-center rounded-b-none py-8 px-4 text-center"
              >
                <Typography variant="h4" color="white">
                  Hapus Data
                </Typography>
              </CardHeader>

              <CardBody>
                <DeleteUsers
                  cancel={closeModalDelete}
                  data={selectedUser}
                />
              </CardBody>
            </Card>
          </div>
        </div>
      }
    </>
  );
};

export default Users;
