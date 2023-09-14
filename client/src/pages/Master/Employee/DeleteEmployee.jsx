/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Typography, Input, Button } from "@material-tailwind/react";

// Import Delete
import { useDeleteemployeeByIdMutation } from "../../../redux/services/employeeApi";
import { useGetemployeeByIdAccessQuery } from "../../../redux/services/employeeAccessApi";
import { useDeleteusersByIdMutation, useGetusersByIdQuery } from "../../../redux/services/usersApi";

// Import Notifikasi
import { toast } from "react-toastify";

const DeleteEmployee = ({ cancel, data }) => {
    const [password, setPassword] = useState("");

    const [deleteEmployee, responseDelete] = useDeleteemployeeByIdMutation();
    const [deleteUsers, responseDeletusers] = useDeleteusersByIdMutation();
    const employeeAccess = useGetemployeeByIdAccessQuery({
        id: data?.id_employee
    })

    const usersList = useGetusersByIdQuery({
        id: employeeAccess.data?.data[0]?.id_users
    })

    useEffect(() => {
        if (responseDelete.isSuccess) {
            toast.dismiss()
            toast.success("Data Employee Berhasil Dihapus");
            if (usersList?.data?.data[0]?.id_users) {
                onDeleteUsers()
            } else {
                setPassword("")
                cancel()
            }
        } else if (responseDelete.isError) {
            toast.dismiss()
            toast.error(responseDelete.error?.data?.error);
        }
    }, [responseDelete])

    useEffect(() => {
        if (responseDeletusers.isSuccess) {
            toast.dismiss()
            toast.success("Data User Berhasil Dihapus");
            setPassword("");
            cancel();
        } else if (responseDeletusers.isError) {
            toast.dismiss()
            toast.error("Gagal Menghapus Data User");
        }
    }, [responseDeletusers])

    const onDeleteUsers = async () => {
        try {
            await deleteUsers({ id: employeeAccess?.data?.data[0]?.id_users });
        } catch (err) {
            console.error(err, 'ERROR USERS')
        }
    }

    const handleDelete = async () => {
        if (password === "qqq") {
            try {
                await deleteEmployee({ id: data?.id_employee });
            } catch (err) {
                console.error(err, 'ERROR EMPLOYEE')
            }
        } else {
            toast.dismiss()
            toast.error("Password salah. Penghapusan dibatalkan.");
        }
    };
    return (
        <>
            <form className="flex flex-col gap-4 my-4">
                <Input
                    label="Masukkan Password Anda"
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                />
            </form>
            <div className="flex flex-col gap-4 my-4">
                <Button className="bg-gray-600" size="md" onClick={cancel}>
                    Cancel
                </Button>
                <Button className="bg-red-400" size="md" type="button" onClick={handleDelete}>
                    Delete
                </Button>
            </div>
        </>
    );
};

export default DeleteEmployee;
