import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
  Button,
  Select,
  Option
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { useAddusersMutation } from "../../../redux/services/usersApi";
import { useGetListrolesQuery } from "../../../redux/services/rolesApi";

const FormUsers = ({ cancel }) => {
  const [createUser, responseCreateUser] = useAddusersMutation();
  const rolesList = useGetListrolesQuery()

  const [listRole, setListRole] = useState([])
  const [role, setRole] = useState()
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    nohp: "",
    password: ""
  });
  
  const { name, username, email, nohp, password } = formData

  useEffect(() => {
    if (rolesList.isSuccess) {
      setListRole(rolesList.data?.data?.rows)
    }
  }, [rolesList])

  useEffect(() => {
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
      if (!name && !username && !email && !nohp) {
        toast.dismiss()
        toast.error("Data Harus Diisi Terlebih Dahulu");
      } else {
        createUser({
          "id_rol": role.id_rol,
          "name": name,
          "username": username,
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
              <Select label="Role" value={role?.nama_role}>
                {
                  listRole.map((value, key) => {
                    return (
                      <Option key={key} onClick={() => setRole(value)}>{value?.nama_role}</Option>
                    )
                  })
                }
              </Select>
              <Input label="Name" type="text" value={formData.name} onChange={(event) =>
                setFormData({
                  ...formData,
                  name: event.target.value,
                })
              } />
              <Input label="Username" type="text" value={formData.username} onChange={(event) =>
                setFormData({
                  ...formData,
                  username: event.target.value,
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
            </form>

            <div className="flex justify-end gap-2">
              <Button className="bg-gray-800 hover:bg-red-400" size="md" onClick={cancel}>
                Cancel
              </Button>
              <Button className="bg-black hover:bg-blue-600" size="md" type="button" onClick={onSubmit}>
                Save
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default FormUsers;
