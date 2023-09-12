/* eslint-disable no-unused-vars */
import { Button, Input, Typography } from "@material-tailwind/react";
import Table from "../../components/Table";
import Pagination from "../../components/Pagination";
import { useGetListMahasiswaQuery } from "../../redux/services/mahasiswaApi";
import { useState } from "react";

const TABLE_HEAD = [
  {
    name: "NIM",
    cell: (row) => row.nim,
  },
  {
    name: "Nama",
    cell: (row) => row.nama,
  },
  {
    name: "Jenis Kelamin",
    cell: (row) => row.jenis_kelamin,
  },
  {
    name: "Tempat & Tgl Lahir",
    cell: (row) => `${row.tempat_lahir}, ${row.tgl_lahir}`,
  },
  {
    name: "Alamat",
    cell: (row) => row.alamat,
  },
  {
    name: "Action ",
    cell: (row) => (
      <>
        <div className="flex gap-4">
          <Button onClick={() => console.log(row.id)}>Edit</Button>
          <Button color="red" onClick={() => console.log(row.id)}>
            Delete
          </Button>
        </div>
      </>
    ),
  },
];

const Mahasiswa = () => {
  const [params, setParams] = useState({
    keyword: "",
    limit: 5,
    offset: 0,
  });

  const mahasiswaQuery = useGetListMahasiswaQuery({
    keyword: params.keyword,
    limit: params.limit,
    offset: params.offset,
  });

  return (
    <div className="m-4">
      <div>
        <Typography className="text-2xl">Data Mahasiswa</Typography>
      </div>

      <div className="flex flex-row justify-between my-4">
        <Button>Tambah</Button>
        <div className="w-60">
          <Input label="Search.." />
        </div>
      </div>
      <Table head={TABLE_HEAD} rows={mahasiswaQuery.data?.data?.rows} />
      <div className="flex flex-row justify-center my-4">
        <Pagination />
      </div>
    </div>
  );
};

export default Mahasiswa;
