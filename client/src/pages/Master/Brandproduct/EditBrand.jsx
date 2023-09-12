/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
  Button,
  Textarea,
} from "@material-tailwind/react";
// Import Edit Data
import { useUpdatebrandByIdMutation } from "../../../redux/services/brandproductApi";
import { updatebrand } from "../../../redux/features/counter/brandSlice";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

// import Notifikasi
import { toast } from "react-toastify";

const Editbrand = ({ closeEForm, openEForm, onEdit }) => {
  const dispatch = useDispatch();
  const [editedBrand, setEditedBrand] = useState({
    id_brands_produk: openEForm.id_brands_produk,
    brand_name: openEForm.brand_name,
    keterangan: openEForm.keterangan,
    asal_brand: openEForm.asal_brand,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedBrand((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };
  const [editBrand] = useUpdatebrandByIdMutation();
  const submitHandler = async () => {
    try {
      console.log("Submitting edited Brand:", editedBrand);

      const response = await editBrand({
        ...editedBrand,
      });

      const updatedBrand = response.data; // Use the API response data here
      dispatch(updatebrand(updatedBrand));

      onEdit();
      toast.success("Data Berhasil Diubah");

      closeEForm();
    } catch (error) {
      console.error("Error while saving Brand:", error);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center place-content-center ">
        <Card className="w-full  max-w-[30rem] ">
          <CardHeader
            color="gray"
            floated={false}
            shadow={false}
            className="m-0 rounded-b-none py-7 px-4 text-left bg-black"
          >
            <Typography variant="h4" color="white" className="ml-2">
              Edit Data
            </Typography>
          </CardHeader>
          <CardBody>
            <form className="flex flex-col gap-9 my-4">
              <Input
                label="Nama Brand"
                id="brand_name"
                name="brand_name"
                type="text"
                value={editedBrand.brand_name}
                onChange={handleInputChange}
              />
              <Textarea
                label="Keterangan"
                id="keterangan"
                name="keterangan"
                type="text"
                value={editedBrand.keterangan}
                onChange={handleInputChange}
              />
              <Input
                label="Asal Brand"
                id="asal_brand"
                name="asal_brand"
                type="text"
                value={editedBrand.asal_brand}
                onChange={handleInputChange}
              />
            </form>
            <div className="flex justify-end gap-2 my-8">
              <Button
                size="md"
                onClick={closeEForm}
                className="bg-gray-800 hover:bg-red-400"
              >
                Cancel
              </Button>
              <Button
                size="md"
                type="button"
                onClick={submitHandler}
                className="bg-black hover:bg-blue-600"
              >
                Update
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

Editbrand.propTypes = {
  closeEForm: PropTypes.func.isRequired,
  openEForm: PropTypes.object,
};

export default Editbrand;
