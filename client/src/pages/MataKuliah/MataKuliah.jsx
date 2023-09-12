import { Button, Input, Typography } from "@material-tailwind/react";
import Table from "../../components/Table";
import Pagination from "../../components/Pagination";

const TABLE_HEAD = [
  {
    key: "nim",
    label: "NIM",
  },
  {
    key: "nama",
    label: "Nama",
  },
  {
    key: "jenis_kelamin",
    label: "Jenis Kelamin",
  },
  {
    key: "tempat_tgl_lahir",
    label: "Tempat & Tgl Lahir",
  },
  {
    key: "alamat",
    label: "Alamat",
  },
];
const TABLE_ROWS = [
  {
    nim: "001",
    nama: "Amir",
    jenis_kelamin: "L",
    tempat_tgl_lahir: "Bandung, 23/04/18",
    alamat: "asdasdasd",
  },
];

const MataKuliah = () => {
  return (
    <div className="m-4">
      <div>
        <Typography className="text-2xl">Data MataKuliah</Typography>
      </div>

      <div className="flex flex-row justify-between my-4">
        <Button>Tambah</Button>
        <div className="w-60">
          <Input label="Search.." />
        </div>
      </div>
      <Table head={TABLE_HEAD} rows={TABLE_ROWS} />
      <div className="flex flex-row justify-center my-4">
        <Pagination />
      </div>
    </div>
  );
};

export default MataKuliah;
