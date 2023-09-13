/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Typography, Input, Button } from "@material-tailwind/react";

// Import Delete
import { useDeleterolesByIdMutation } from "../../../redux/services/rolesApi";

// Import Notifikasi
import { toast } from "react-toastify";

const DeleteRoles = ({ cancel, data }) => {
    const [password, setPassword] = useState("");

    const [deleteRole, responseDelete] = useDeleterolesByIdMutation();

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
            await deleteRole({ id: data?.id_rol });
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
                <Button size="lg" type="button" onClick={handleDelete}>
                    Delete
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
        </>
    );
};

export default DeleteRoles;