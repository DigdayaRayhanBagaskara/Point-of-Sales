import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Input,
    Button,
    Alert,
    Select,
    Option
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { useUpdateusersByIdMutation } from "../../../redux/services/usersApi";
import { useGetListrolesQuery } from "../../../redux/services/rolesApi";

const EditUsers = ({ cancel, data }) => {
    const rolesList = useGetListrolesQuery()

    const [listRole, setListRole] = useState([])
    const [role, setRole] = useState()
    const [formData, setFormData] = useState({
        id_users: data?.id_users,
        nama: data?.username,
        email: data?.email,
        nohp: data?.nohp,
        password: '__PASSWORD__'
    });

    const { id_users, nama, email, nohp, password } = formData

    const [updateUser, responseUpdate] = useUpdateusersByIdMutation();

    useEffect(() => {
        if (rolesList.isSuccess) {
            setListRole(rolesList.data?.data?.rows)
            setRole(rolesList.data?.data?.rows.filter(value => value.id_rol === data?.id_rol)[0])
        }
    }, [rolesList])

    useEffect(() => {
        if (responseUpdate.isSuccess) {
            toast.dismiss()
            toast.success("Data Berhasil Disimpan");
            cancel()
        } else if (responseUpdate.isError) {
            toast.dismiss()
            toast.error(responseUpdate.error?.data?.message);
        }
    }, [responseUpdate])

    const onSubmit = async () => {
        try {
            if (!nama && !email && !nohp && !role) {
                toast.dismiss()
                toast.error("Data Harus Diisi Terlebih Dahulu");
            } else {
                await updateUser({
                    "id": id_users,
                    "id_rol": role.id_rol,
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
                            Edit Data
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
                            <Input onFocus={() => {
                                if (formData.password === '__PASSWORD__') {
                                    setFormData({
                                        ...formData,
                                        password: "",
                                    })
                                }
                            }} label="Password" type="password" value={formData.password} onChange={(event) =>
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
                                Update
                            </Button>
                        </div>

                    </CardBody>
                </Card>
            </div>
        </>
    );
};

export default EditUsers;
