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
import { useUpdatecategoryByIdMutation } from "../../../redux/services/categoryproductApi";
import { updateCategory } from "../../../redux/features/counter/categorySlice";

import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

// import Notifikasi
import { toast } from "react-toastify";

const EditCate = ({ closeEForm, openEForm, onEdit }) => {
  const dispatch = useDispatch();
  const [editedCategory, setEditedCategory] = useState({
    id_categories: openEForm.id_categories,
    categories_name: openEForm.categories_name,
    keterangan: openEForm.keterangan,
    model: openEForm.model,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };
  const [editCategory] = useUpdatecategoryByIdMutation();
  const submitHandler = async () => {
    try {
      console.log("Submitting edited category:", editedCategory);

      const response = await editCategory({
        ...editedCategory,
      });

      const updatedCategory = response.data; // Use the API response data here
      dispatch(updateCategory(updatedCategory));

      onEdit();
      toast.success("Data Berhasil Diubah");

      closeEForm();
    } catch (error) {
      console.error("Error while saving category:", error);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center place-content-center ">
        <Card className="w-full max-w-[30rem] ">
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
                label="Kategori"
                id="categories_name"
                name="categories_name"
                type="text"
                value={editedCategory.categories_name}
                onChange={handleInputChange}
              />
              <Textarea
                label="Keterangan"
                id="keterangan"
                name="keterangan"
                type="text"
                value={editedCategory.keterangan}
                onChange={handleInputChange}
              />
              <Input
                label="Model"
                id="model"
                name="model"
                type="text"
                value={editedCategory.model}
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

EditCate.propTypes = {
  closeEForm: PropTypes.func.isRequired,
  openEForm: PropTypes.object,
};

export default EditCate;
