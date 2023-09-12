/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { useUpdatecategoryByIdMutation } from "../../../redux/services/categoryproductApi";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { updateCategory } from "../../../redux/features/counter/categorySlice";
import { toast } from "react-toastify";

const EditProduct = ({ closeForm, EdFormOpen, onEdit }) => {
  const dispatch = useDispatch();
  const [editedCategory, setEditedCategory] = useState({
    id_categories: EdFormOpen.id_categories,
    categories_name: EdFormOpen.categories_name,
    keterangan: EdFormOpen.keterangan,
    model: EdFormOpen.model,
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

      await editCategory({
        ...editedCategory,
      });

      dispatch(updateCategory(editedCategory));

      onEdit();
      toast.success("Data Berhasil Diubah");

      closeForm();
    } catch (error) {
      console.error("Error while saving category:", error);
    }
  };

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
              <Input
                label="Kategori"
                id="categories_name"
                name="categories_name"
                type="text"
                value={editedCategory.categories_name}
                onChange={handleInputChange}
              />
              <Input
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
              <Button size="lg" type="button" onClick={submitHandler}>
                Update
              </Button>
            </form>
            <div className="flex flex-col gap-4 my-4">
              <Button size="lg" onClick={closeForm}>
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

EditProduct.propTypes = {
  closeForm: PropTypes.func.isRequired,
  EdFormOpen: PropTypes.object,
};

export default EditProduct;
