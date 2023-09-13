import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { useAddusersMutation } from "../../../redux/services/usersApi";

const FormUsers = ({ cancel }) => {

  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    nohp: "",
    password: ""
  });

  const { nama, email, nohp, password } = formData

  const [createUser, responseCreateUser] = useAddusersMutation();

  useEffect(() => {
    console.log(responseCreateUser)
    if (responseCreateUser.isSuccess) {
      toast.dismiss()
      toast.success("Data Berhasil Disimpan");
      cancel()
    } else if (responseCreateUser.isError) {
      toast.dismiss()
      toast.error(responseCreateUser.error?.data?.message);
    }
  }, [responseCreateUser])

  const onSubmit = async () => {
    try {
      if (!nama && !email && !nohp) {
        toast.dismiss()
        toast.error("Data Harus Diisi Terlebih Dahulu");
      } else {
        createUser({
          "id_rol": 2,
          "username": nama,
          "password": password,
          "email": email,
          "nohp": nohp
        });
      }
    } catch (err) {
      console.error("Error while saving user:", err);
    }
  }
  return (
    <>
      <div className="flex justify-center items-center place-content-center h-[79vh]">
        <Card className="w-full max-w-[24rem]">
          <CardHeader
            color="gray"
            floated={false}
            shadow={false}
            className="m-0 grid place-items-center rounded-b-none py-8 px-4 text-center"
          >
            <Typography variant="h4" color="white">
              Add Data
            </Typography>
          </CardHeader>
          <CardBody>
            <form className="flex flex-col gap-4 my-4">
              <Input label="Nama" type="text" value={formData.nama} onChange={(event) =>
                setFormData({
                  ...formData,
                  nama: event.target.value,
                })
              } />
              <Input label="Email" type="email" value={formData.email} onChange={(event) =>
                setFormData({
                  ...formData,
                  email: event.target.value,
                })
              } />
              <Input label="No. HP" type="number" value={formData.nohp} onChange={(event) =>
                setFormData({
                  ...formData,
                  nohp: event.target.value,
                })
              } />
              <Input label="Password" type="password" value={formData.password} onChange={(event) =>
                setFormData({
                  ...formData,
                  password: event.target.value,
                })
              } />
              <Button size="lg" type="button" onClick={onSubmit}>
                Save
              </Button>
            </form>
            <div className="flex flex-col gap-4 my-4">
              <Button size="lg" onClick={cancel}>
                Cancel
              </Button>
            </div>

            <Typography
              variant="small"
              color="gray"
              className="mt-2 flex items-center justify-center gap-2 font-normal opacity-60"
            >
              &copy; copyright 2023
            </Typography>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default FormUsers;
