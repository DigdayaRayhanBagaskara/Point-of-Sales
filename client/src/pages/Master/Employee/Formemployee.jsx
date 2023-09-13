import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
  Button,
  Switch,
  Select,
  Option
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { useAddemployeeMutation } from "../../../redux/services/employeeApi";
import { useAddusersMutation } from "../../../redux/services/usersApi";
import { useGetListoutletQuery } from "../../../redux/services/outletApi";
import { useAddemployeeAccessMutation } from "../../../redux/services/employeeAccessApi";

const FormEmployee = ({ cancel }) => {

  const [createEmployee, responseCreateEmployee] = useAddemployeeMutation();
  const [createUser, responseCreateUser] = useAddusersMutation();
  const [createEmployeeAccess, responseCreateEmployeeAccess] = useAddemployeeAccessMutation();
  // const listOutlet = useGetListoutletQuery()

  const [enableAccess, setEnableAccess] = useState(false)
  const [outlet, setOutlet] = useState()
  const [role, setRole] = useState()
  const [formEmployee, setFormEmployee] = useState({
    name: "",
    agama: "",
    status: "",
    alamat: ""
  });
  const [formUser, setFormUser] = useState({
    email: "",
    nohp: "",
    password: "",
    confirmPassword: "",
  });

  const { name, agama, status, alamat } = formEmployee
  const { email, nohp, password, confirmPassword } = formUser

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

  const listRole = [
    {
      "id_rol": 1,
      "nama_role": 'admin'
    },
    {
      "id_rol": 2,
      "nama_role": 'kasir'
    },
  ]

  useEffect(() => {
    if (enableAccess) {
      if (responseCreateEmployee.isSuccess && responseCreateUser.isSuccess) {
        submitEmployeeAccess()
        toast.dismiss()
        toast.success("Data Employee Berhasil Disimpan");
        toast.success("Data User Berhasil Disimpan");
      } else {
        if (responseCreateEmployee.isError) {
          toast.dismiss()
          toast.error("Gagal Menyimpan Data Employee");
        } else if (responseCreateUser.isError) {
          toast.dismiss()
          toast.error("Gagal Menyimpan Data User");
        }
      }
    } else {
      if (responseCreateEmployee.isSuccess) {
        toast.dismiss()
        toast.success("Data Employee Berhasil Disimpan");
        cancel()
      } else if (responseCreateEmployee.isError) {
        toast.dismiss()
        toast.error("Gagal Menyimpan Data Employee");
      }
    }
  }, [responseCreateEmployee, responseCreateUser])

  useEffect(() => {
    // console.log(responseCreateEmployeeAccess)
    if (responseCreateEmployeeAccess.isSuccess) {
      toast.dismiss()
      toast.success("Data Employee Access Berhasil Disimpan");
      cancel()
    } else if (responseCreateEmployeeAccess.isError) {
      toast.dismiss()
      toast.error("Gagal Menyimpan Data Employee Access");
    }
  }, [responseCreateEmployeeAccess])

  const submitEmployeeAccess = async () => {
    const employeeId = responseCreateEmployee.data?.data?.id
    const userId = responseCreateUser.data?.data?.id

    try {
      await createEmployeeAccess({
        "id_employee": employeeId,
        "id_users": userId
      })
    } catch (err) {
      console.error("Error while saving employee access:", err);
    }
  }

  const onSubmit = async () => {
    try {
      if (!outlet || !name && !agama && !status && !alamat) {
        toast.dismiss()
        toast.error("Data Employee Diisi Terlebih Dahulu");
      } else {
        if (enableAccess) {
          if (!email) {
            toast.dismiss()
            toast.error("Email Mohon Diisi Terlebih Dahulu");
          } else if (!role) {
            toast.dismiss()
            toast.error("Role Mohon Dipilih Terlebih Dahulu");
          } else if (!password) {
            toast.dismiss()
            toast.error("Password Mohon Diisi Terlebih Dahulu");
          } else {
            if (password === confirmPassword) {
              await createEmployee({
                "id_outlet": outlet.id_outlet,
                "name": name,
                "agama": agama,
                "status": status,
                "alamat": alamat
              })

              await createUser({
                "id_rol": role?.id_rol,
                "username": email,
                "email": email,
                "nohp": nohp,
                "password": password,
              });
            } else {
              toast.dismiss()
              toast.error("Mohon Periksa Konfirmasi Password Anda");
            }
          }
        } else {
          createEmployee({
            "id_outlet": outlet.id_outlet,
            "name": name,
            "agama": agama,
            "status": status,
            "alamat": alamat
          })
        }
      }
    } catch (err) {
      console.error("Error while saving employee:", err);
    }
  }

  return (
    <>
      <div className="flex justify-center items-center place-content-center h-screen">
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

              {/* FORM EMPLOYEE */}
              <Select label="Outlet">
                {
                  listOutlet.map((value, key) => {
                    return (
                      <Option key={key} onClick={() => setOutlet(value)}>{value.nama_outlet}</Option>
                    )
                  })
                }
              </Select>
              <Input label="Nama" type="text" value={formEmployee.name} onChange={(event) =>
                setFormEmployee({
                  ...formEmployee,
                  name: event.target.value,
                })
              } />
              <Input label="Agama" type="text" value={formEmployee.agama} onChange={(event) =>
                setFormEmployee({
                  ...formEmployee,
                  agama: event.target.value,
                })
              } />
              <Input label="Status" type="text" value={formEmployee.status} onChange={(event) =>
                setFormEmployee({
                  ...formEmployee,
                  status: event.target.value,
                })
              } />
              <Input label="Alamat" type="text" value={formEmployee.alamat} onChange={(event) =>
                setFormEmployee({
                  ...formEmployee,
                  alamat: event.target.value,
                })
              } />
              <Switch label="Employee access" color="blue" onClick={(a) => setEnableAccess(!enableAccess)} defaultChecked={enableAccess} />

              {/* FORM USERS */}
              {
                enableAccess &&
                <>
                  <Select label="Role">
                    {
                      listRole.map((value, key) => {
                        return (
                          <Option key={key} onClick={() => setRole(value)}>{value.nama_role}</Option>
                        )
                      })
                    }
                  </Select>
                  <Input required label="Email" type="text" value={formUser.email} onChange={(event) =>
                    setFormUser({
                      ...formUser,
                      email: event.target.value,
                    })
                  } />
                  <Input label="No. HP" type="number" value={formUser.nohp} onChange={(event) =>
                    setFormUser({
                      ...formUser,
                      nohp: event.target.value,
                    })
                  } />
                  <Input required label="Password" type="password" value={formUser.password} onChange={(event) =>
                    setFormUser({
                      ...formUser,
                      password: event.target.value,
                    })
                  } />
                  <Input required error={password !== confirmPassword} label="Confirm password" type="password" value={formUser.confirmPassword} onChange={(event) =>
                    setFormUser({
                      ...formUser,
                      confirmPassword: event.target.value,
                    })
                  } />
                </>
              }

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

export default FormEmployee;
