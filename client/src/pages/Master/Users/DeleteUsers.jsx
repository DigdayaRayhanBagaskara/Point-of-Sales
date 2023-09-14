/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { Typography, Input, Button } from "@material-tailwind/react";

// Import Delete
import { useDeleteusersByIdMutation } from "../../../redux/services/usersApi";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

// Import Notifikasi
import { toast } from "react-toastify";

const DeleteUsers = ({ cancel, data }) => {
    const [password, setPassword] = useState("");

    const [deleteUsers, responseDelete] = useDeleteusersByIdMutation();

    useEffect(() => {
        if (responseDelete.isSuccess) {
            toast.dismiss()
            toast.success("Data Berhasil Dihapus");
            setPassword("");
            cancel();
        } else if (responseDelete.isError) {
            toast.dismiss()
            toast.error(responseDelete.error?.data?.message);
        }
    }, [responseDelete])

    const handleDelete = async () => {
        if (password === "qqq") {
            await deleteUsers({ id: data.id_users });
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

export default DeleteUsers;
