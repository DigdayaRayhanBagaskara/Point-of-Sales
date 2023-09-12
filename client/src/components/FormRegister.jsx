/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { Button, Input } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useGetMahasiswaByIdQuery } from "../redux/services/mahasiswaApi";
const FormRegister = () => {
  const [status, setstatus] = useState("uninitialized");
  const [formdata, setFormData] = useState({
    id: 1,
    nim: "",
    nama: "",
    jenis_kelamin: "",
    tempat_lahir: "",
    tgl_lahir: "",
    alamat: "",
  });

  const mahasiswaQuery = useGetMahasiswaByIdQuery(
    {
      id: formdata?.id,
    },
    {
      skip: !formdata?.id,
    }
  );

  const clearForm = () => {
    setFormData({
      ...formdata,
      nim: "",
      nama: "",
      jenis_kelamin: "",
      tempat_lahir: "",
      tgl_lahir: "",
      alamat: "",
    });
  };

  useEffect(() => {
    if (mahasiswaQuery.isLoading) setstatus("loading");
    if (mahasiswaQuery.isFetching) setstatus("fetching");
    if (mahasiswaQuery.isError) {
      clearForm();
      setstatus(
        mahasiswaQuery?.error?.error || mahasiswaQuery?.error?.data?.message
      );
    }
    if (mahasiswaQuery.isSuccess) setstatus("success");
  }, [mahasiswaQuery]);

  useEffect(() => {
    if (!mahasiswaQuery.isFetching && mahasiswaQuery.isSuccess) {
      console.log(mahasiswaQuery?.data?.data, "mahasiswaQuery");
      const data = mahasiswaQuery?.data?.data;
      setFormData({
        id: data.id,
        nim: data.nim,
        nama: data.nama,
        jenis_kelamin: data.jenis_kelamin,
        tempat_lahir: data.tempat_lahir,
        tgl_lahir: data.tgl_lahir,
        alamat: data.alamat,
      });
    }
  }, [mahasiswaQuery.isSuccess, mahasiswaQuery.isFetching]);

  return (
    <form className="border-2 m-4">
      {status}
      <Input
        label="id"
        type="text"
        name="id"
        id="id"
        value={formdata.id}
        onChange={(e) => setFormData({ formdata, id: e.target.value })}
      />
      <h1 className="text-2xl my-2">FORM MAHASISWA </h1>
      <div className="flex flex-col gap-4">
        <Input
          label="nim"
          type="text"
          name="nim"
          id="nim"
          value={formdata.nim}
          onChange={(e) => setFormData({ formdata, nim: e.target.value })}
        />
        <Input
          label="Name"
          type="text"
          name="nama"
          id="nama"
          value={formdata.name}
          onChange={(e) => setFormData({ formdata, name: e.target.value })}
        />
        <Input
          label="jenis_kelamin"
          type="text"
          name="jenis_kelamin"
          id="jenis_kelamin"
          value={formdata.jenis_kelamin}
          onChange={(e) =>
            setFormData({ formdata, jenis_kelamin: e.target.value })
          }
        />
        <Input
          label="tempat_lahir"
          type="text"
          name="tempat_lahir"
          id="tempat_lahir"
          value={formdata.tempat_lahir}
          onChange={(e) =>
            setFormData({ formdata, tempat_lahir: e.target.value })
          }
        />
        <Input
          label="tgl_lahir"
          type="date"
          name="tgl_lahir"
          id="tgl_lahir"
          value={formdata.tgl_lahir}
          onChange={(e) => setFormData({ formdata, tgl_lahir: e.target.value })}
        />
        <Input
          label="alamat"
          type="text"
          name="alamat"
          id="alamat"
          value={formdata.alamat}
          onChange={(e) => setFormData({ formdata, alamat: e.target.value })}
        />
      </div>
      <Button type="button" onClick={console.log("x")} className="mt-4">
        {" "}
        Submit{" "}
      </Button>
    </form>
  );
};

export default FormRegister;
