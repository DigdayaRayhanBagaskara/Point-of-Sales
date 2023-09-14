/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Button, Card, CardHeader, Typography, CardFooter, CardBody, Input, Select, Option} from "@material-tailwind/react";
import {
  UserPlusIcon,
  MagnifyingGlassCircleIcon
} from "@heroicons/react/24/solid";
import { toast } from "react-toastify";

import Table from "../../../components/Table";
import { useGetListemployeeQuery } from "../../../redux/services/employeeApi";
import Pagination from "../../../components/Pagination";
import EditEmployee from "./EditEmployee";
import FormEmployee from "./Formemployee";
import DeleteEmployee from "./DeleteEmployee";

const Employee = () => {

  const [showModalInsert, setShowModalInsert] = useState(false)
  const [showModalEdit, setShowModalEdit] = useState(false)
  const [showModalDelete, setShowModalDelete] = useState(false)
  const [selectedUser, setSelectedUser] = useState()
  const [textSearch, setTextSearch] = useState('')
  const [outlet, setOutlet] = useState()

  const listOutlet = [
    {
      "id_outlet": 3,
      "nama_outlet": 'rumbai'
    },
    {
      "id_outlet": 4,
      "nama_outlet": 'indomaret soekarno hatta'
    },
    {
      "id_outlet": 5,
      "nama_outlet": 'rick komputer'
    },
  ]

  const [params, setParams] = useState({
    keyword: "",
    limit: 5,
    offset: 0,
    filter: ""
  });

  const employeeListData = useGetListemployeeQuery({
    keyword: params.keyword,
    limit: params.limit,
    offset: params.offset,
    filter: params.filter
  });

  const totalPages = (employeeListData.data?.data?.total_row === 0 ? 1 : Math.ceil(employeeListData.data?.data?.total_row / params.limit))

  useEffect(() => {
    if (employeeListData.isError) {
      toast.dismiss()
      toast.error(employeeListData.error?.data?.message ? employeeListData.error?.data?.message : 'Something wrong, please contact the admin');
    }
  }, [employeeListData])

  const header = [
    {
      name: "Nama",
      cell: (row) => row.name,
    },
    {
      name: "Agama",
      cell: (row) => row.agama,
    },
    {
      name: "Status",
      cell: (row) => row.status,
    },
    {
      name: "Alamat",
      cell: (row) => row.alamat,
    },
    {
      name: "Outlet",
      cell: (row) => listOutlet[listOutlet.findIndex((value) => value.id_outlet === row.id_outlet)]?.nama_outlet,
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
    setParams({ ...params, keyword: value, offset: 0, filter: "" });
    setTextSearch(value)
    setOutlet()
  };

  const onChangeOutlet = (value) => {
    setParams({ ...params, filter: value.id_outlet, offset: 0, keyword: "" });
    setOutlet(value)
    setTextSearch('')
  }

  return (
    <>
      <div className="ml-2 pt-5s mx-auto mb-auto h-full min-h-[70vh] p-2 md:pr-2">
        <Card className="h-full w-full">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8 flex items-center justify-between gap-8">
              <div>
                <Typography variant="h5" color="blue-gray">
                  Data Employee
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

          <div className="flex flex-col items-center justify-between md:flex-row m-4 mb-3">
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassCircleIcon className="h-5 w-5" />}
                value={textSearch}
                onChange={(e) => handleSearch(e)} // Panggil fungsi handleSearch
              />
            </div>
          </div>

          <div className="flex flex-col items-center justify-between md:flex-row m-4 mb-3">
            <div className="w-full md:w-72">
              <Select label="Filter Outlet" value={outlet?.nama_outlet}>
                {
                  listOutlet.map((value, key) => {
                    return (
                      <Option key={key} onClick={() => onChangeOutlet(value)}>{value.nama_outlet}</Option>
                    )
                  })
                }
              </Select>
            </div>
          </div>

          {/* TABLE */}
          <Table head={header} rows={employeeListData.isSuccess ? employeeListData?.data?.data?.rows : []} />
          <CardFooter className="flex items-center justify-center border-t border-blue-gray-50 p-4">
            <Pagination totalPages={totalPages} onPageChange={onPageChange} />
          </CardFooter>
        </Card>
      </div>

      {/* FORM INSERT */}
      {
        showModalInsert &&
        <div className="fixed inset-0 items-center justify-center bg-black bg-opacity-50">
          <FormEmployee cancel={closeModalInsert} />
        </div>
      }

      {
        showModalEdit &&
        <div className="fixed inset-0 items-center justify-center bg-black bg-opacity-50">
          <EditEmployee cancel={closeModalEdit} dataEmployee={selectedUser} />
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
                <DeleteEmployee
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

export default Employee;
