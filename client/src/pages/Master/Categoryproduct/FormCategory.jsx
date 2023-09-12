/* eslint-disable react/prop-types */

import "react-toastify/dist/ReactToastify.css";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
  Button,
  Textarea,
} from "@material-tailwind/react";
// import Add data
import { useAddcategoryMutation } from "../../../redux/services/categoryproductApi";
import { addCategory } from "../../../redux/features/counter/categorySlice";
import { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

// import Notifikasi
import { toast } from "react-toastify";

const Formcategory = ({ closeForm, onEdit }) => {
  const dispatch = useDispatch();
  const [formLoginData, setFormLoginData] = useState({
    categories_name: "",
    keterangan: "",
    model: "",
  });
  const { categories_name, keterangan, model } = formLoginData;

  const [createCategory] = useAddcategoryMutation();
  const submitHandler = async () => {
    try {
      if (!categories_name || !keterangan || !model) {
        toast.error("Data Harus Diisi Terlebih Dahulu");
        return;
      }
      const response = await createCategory({
        categories_name: formLoginData.categories_name,
        keterangan: formLoginData.keterangan,
        model: formLoginData.model,
      });
      console.log(response);
      dispatch(addCategory(response)); // Jika response berisi data baru dari server
      onEdit();
      toast.success("Data Berhasil Disimpan");
      // Reset form data setelah berhasil menyimpan
      setFormLoginData({
        categories_name: "",
        keterangan: "",
        model: "",
      });
      closeForm();
    } catch (error) {
      console.error("Error while saving category:", error);
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
              Add Data
            </Typography>
          </CardHeader>
          <CardBody>
            <form className="flex flex-col gap-9 my-4">
              <Input
                label="Kategori"
                id="categories_name"
                name="categories_name"
                type="text"
                value={formLoginData.categories_name}
                onChange={(event) =>
                  setFormLoginData({
                    ...formLoginData,
                    categories_name: event.target.value,
                  })
                }
              />
              <Textarea
                label="Keterangan"
                id="keterangan"
                name="keterangan"
                type="text"
                value={formLoginData.keterangan}
                onChange={(event) =>
                  setFormLoginData({
                    ...formLoginData,
                    keterangan: event.target.value,
                  })
                }
              />
              <Input
                label="Model"
                id="model"
                name="model"
                type="text"
                value={formLoginData.model}
                onChange={(event) =>
                  setFormLoginData({
                    ...formLoginData,
                    model: event.target.value,
                  })
                }
              />
            </form>
            <div className="flex justify-end gap-2 my-8">
              <Button
                size="md"
                onClick={closeForm}
                className="bg-gray-600 hover:bg-red-400"
              >
                Cancel
              </Button>
              <Button
                size="md"
                type="button"
                onClick={submitHandler}
                className="bg-black hover:bg-blue-600"
              >
                Save
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
};
Formcategory.propTypes = {
  closeForm: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};
export default Formcategory;
