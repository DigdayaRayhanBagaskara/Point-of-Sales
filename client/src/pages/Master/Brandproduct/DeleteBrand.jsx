/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { Typography, Input, Button } from "@material-tailwind/react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

// Import Notifikasi
import { toast } from "react-toastify";

// Import Delete
import { useDeletebrandByIdMutation } from "../../../redux/services/brandproductApi";
import { deletebrand } from "../../../redux/features/counter/brandSlice";

const DeleteBrand = ({ DeleteOpened, DeleteClose, onEdit }) => {
  const [deleteBrand] = useDeletebrandByIdMutation();
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
        console.log("Submitting edited Brand:", DeleteOpened);

        const brandIdToDelete = DeleteOpened.id_brands_produk; // Use DeleteOpen directly
        await deleteBrand({ id_brands_produk: brandIdToDelete });
        dispatch(deletebrand(brandIdToDelete));
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
      <form className="flex justify-end gap-2 my-8">
        <Input
          label="Masukkan Password Anda"
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={handleInputChange}
        />
      </form>
      <div className="flex flex-col gap-4 my-4">
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
    </>
  );
};

DeleteBrand.propTypes = {
  DeleteClose: PropTypes.func.isRequired,
  DeleteOpened: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default DeleteBrand;
