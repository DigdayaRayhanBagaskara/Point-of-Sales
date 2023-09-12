/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import PropTypes from "prop-types";
import { Typography, Input, Button } from "@material-tailwind/react";

// Import Delete
import { useDeletevariantByIdMutation } from "../../../redux/services/variantproductApi";
import { deletevariant } from "../../../redux/features/counter/variantSlice";
import { useDispatch } from "react-redux";

// Import Notifikasi
import { toast } from "react-toastify";

const Delete = ({ DeleteOpened, DeleteClose, onEdit }) => {
  const [deleteCates] = useDeletevariantByIdMutation();
  const [password, setPassword] = useState("");
  const [showPasswordError, setShowPasswordError] = useState(false);
  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    const { value } = e.target;
    setPassword(value);
    setShowPasswordError(false);
  };
  const handleDelete = async () => {
    if (password === "qqq") {
      try {
        const variantIdToDelete = DeleteOpened.id_produk_variant; // Use DeleteOpen directly
        await deleteCates({ id_produk_variant: variantIdToDelete });
        dispatch(deletevariant(variantIdToDelete));
        toast.success("Data Berhasil Dihapus");

        onEdit();
        DeleteClose();

        setPassword("");
      } catch (error) {
        console.error("Terjadi kesalahan saat menghapus data:", error);
        toast.error("Terjadi kesalahan saat menghapus data");
      }
    } else {
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
          onChange={handleInputChange}
        />
      </form>
      <div className="flex justify-end gap-2 my-8">
        <Button size="md" onClick={DeleteClose} className="bg-gray-600">
          Cancel
        </Button>
        <Button
          size="md"
          type="button"
          onClick={handleDelete}
          className="bg-red-400"
        >
          Delete
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

Delete.propTypes = {
  DeleteClose: PropTypes.func.isRequired,
  DeleteOpened: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default Delete;
