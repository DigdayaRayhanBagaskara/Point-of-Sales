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

import { useUpdateemployeeByIdMutation } from "../../../redux/services/employeeApi";
import { useUpdateusersByIdMutation, useGetusersByIdQuery, useDeleteusersByIdMutation, useAddusersMutation } from "../../../redux/services/usersApi";
import { useGetemployeeByIdAccessQuery, useDeleteemployeeByIdAccessMutation, useAddemployeeAccessMutation } from "../../../redux/services/employeeAccessApi";

const EditEmployee = ({ cancel, dataEmployee }) => {

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

    const [access, setAccess] = useState(false)
    const [enableAccess, setEnableAccess] = useState(false)
    const [outlet, setOutlet] = useState(listOutlet.filter(value => value.id_outlet === dataEmployee.id_outlet)[0])
    const [role, setRole] = useState()
    const [firstUpdate, setFirstUpdate] = useState(true)

    const employeeAccess = useGetemployeeByIdAccessQuery({
        id: dataEmployee?.id_employee
    })

    const [createUser, responseCreateUser] = useAddusersMutation();
    const [createEmployeeAccess, responseCreateEmployeeAccess] = useAddemployeeAccessMutation();
    const [deleteUsers, responseDeleteUsers] = useDeleteusersByIdMutation();
    const [deleteEmployeeAccess, responseDeleteEmployeeAccess] = useDeleteemployeeByIdAccessMutation();
    const [updateEmployee, responseUpdateEmployee] = useUpdateemployeeByIdMutation();
    const [updateUser, responseUpdateUser] = useUpdateusersByIdMutation();

    const usersList = useGetusersByIdQuery({
        id: employeeAccess.data?.data[0]?.id_users
    })

    const [formEmployee, setFormEmployee] = useState({
        name: dataEmployee?.name,
        agama: dataEmployee?.agama,
        status: dataEmployee?.status,
        alamat: dataEmployee?.alamat
    });

    const [formUser, setFormUser] = useState({
        email: "",
        nohp: "",
        password: "",
        confirmPassword: "",
    });

    const { name, agama, status, alamat } = formEmployee
    const { email, nohp, password, confirmPassword } = formUser

    useEffect(() => {
        if (employeeAccess.isSuccess) {
            setEnableAccess(true)
            setAccess(true)
        }
    }, [employeeAccess])

    useEffect(() => {
        if (usersList.isSuccess && firstUpdate) {
            setFormUser({
                ...formUser,
                email: usersList.data?.data[0]?.email,
                nohp: usersList.data?.data[0]?.nohp,
            })
            const filterRole = listRole.filter(value => value.id_rol === usersList.data?.data[0]?.id_rol)
            setRole(filterRole[0])
            setFirstUpdate(false)
        } else if (usersList.isError) {
            setEnableAccess(false)
            setAccess(false)
        }
    }, [usersList])

    useEffect(() => {
        if (enableAccess) {
            if (responseUpdateEmployee.isSuccess && responseUpdateUser.isSuccess) {
                toast.dismiss()
                toast.success("Data Employee Berhasil Diupdate");
                toast.success("Data User Berhasil Diupdate");
                cancel()
            } else if (responseUpdateEmployee.isSuccess && responseCreateUser.isSuccess) {
                submitEmployeeAccess()
                toast.dismiss()
                toast.success("Data Employee Berhasil Diupdate");
                toast.success("Data User Berhasil Disimpan");
            } else {
                if (responseUpdateEmployee.isError) {
                    toast.dismiss()
                    toast.error("Gagal Mengupdate Data Employee");
                } else if (responseUpdateUser.isError) {
                    toast.dismiss()
                    toast.error("Gagal Mengupdate Data User");
                } else if (responseCreateUser.isError) {
                    toast.dismiss()
                    toast.error("Gagal Menyimpan Data User");
                }
            }
        } else {
            // console.log(responseUpdateEmployee)
            if (responseUpdateEmployee.isSuccess) {
                toast.dismiss()
                toast.success("Data Employee Berhasil Diupdate");
                cancel()
            } else if (responseUpdateEmployee.isError) {
                toast.dismiss()
                toast.error("Gagal Mengupdate Data Employee");
            }
        }
    }, [responseUpdateEmployee, responseUpdateUser, responseCreateUser])

    const submitEmployeeAccess = async () => {
        const employeeId = dataEmployee?.id_employee
        const userId = responseCreateUser.data?.data?.id

        try {
            await createEmployeeAccess({
                "id_employee": employeeId,
                "id_users": userId
            })
            cancel()
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
                            await updateEmployee({
                                "id": dataEmployee?.id_employee,
                                "id_outlet": outlet.id_outlet,
                                "name": name,
                                "agama": agama,
                                "status": status,
                                "alamat": alamat
                            })

                            if (access) {
                                await updateUser({
                                    "id": employeeAccess.data?.data[0]?.id_users,
                                    "id_rol": role?.id_rol,
                                    "username": email,
                                    "email": email,
                                    "nohp": nohp,
                                    "password": password,
                                });
                            } else {
                                await createUser({
                                    "id_rol": role?.id_rol,
                                    "username": email,
                                    "email": email,
                                    "nohp": nohp,
                                    "password": password,
                                });
                            }
                        } else {
                            toast.dismiss()
                            toast.error("Mohon Periksa Konfirmasi Password Anda");
                        }
                    }
                } else {
                    updateEmployee({
                        "id": dataEmployee?.id_employee,
                        "id_outlet": outlet.id_outlet,
                        "name": name,
                        "agama": agama,
                        "status": status,
                        "alamat": alamat
                    })
                    if (access) {
                        await deleteUsers({ id: employeeAccess.data?.data[0]?.id_users });
                        await deleteEmployeeAccess({ id: employeeAccess.data?.data[0]?.id_employee_access });
                    }
                }
            }
        } catch (err) {
            console.error("Error while saving user:", err);
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
                            <Select label="Outlet" value={outlet?.nama_outlet}>
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
                            <Switch label="Employee access" color="blue" onClick={(a) => setEnableAccess(!enableAccess)} checked={enableAccess} />

                            {
                                enableAccess &&
                                <>
                                    <Select label="Role" value={role?.nama_role}>
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
                                    <Input required label="No. HP" type="number" value={formUser.nohp} onChange={(event) =>
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

                        </form>
                        <div className="flex justify-end gap-2">
                            <Button className="bg-gray-800 hover:bg-red-400" size="md" onClick={cancel}>
                                Cancel
                            </Button>
                            <Button className="bg-black hover:bg-blue-600" size="md" type="button" onClick={onSubmit}>
                                Update
                            </Button>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </>
    );
};

export default EditEmployee;
