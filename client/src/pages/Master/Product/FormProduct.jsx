/* eslint-disable react/prop-types */
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { useAddcategoryMutation } from "../../../redux/services/categoryproductApi";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import {
  setCategories,
  addCategory,
} from "../../../redux/features/counter/categorySlice";

const FormProduct = ({ closeForm, onEdit }) => {
  const dispatch = useDispatch();
  const [formLoginData, setFormLoginData] = useState({
    categories_name: "",
    keterangan: "",
    model: "",
  });
  const { categories_name, keterangan, model } = formLoginData;

  useEffect(() => {
    if (setFormLoginData) {
      dispatch(setCategories(setFormLoginData));
    }
  }, [setFormLoginData, dispatch]);

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
        <Card className="w-full max-w-[24rem]">
          <CardHeader
            color="gray"
            floated={false}
            shadow={false}
            className="m-0 grid place-items-center rounded-b-none py-8 px-4 text-center"
          >
            <Typography variant="h4" color="white">
              Add Data
            </Typography>
          </CardHeader>
          <CardBody>
            <form className="flex flex-col gap-4 my-4">
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
              <Input
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
              <Button size="lg" type="button" onClick={submitHandler}>
                Save
              </Button>
            </form>
            <div className="flex flex-col gap-4 my-4">
              <Button size="lg" onClick={closeForm}>
                Cancel
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
};
FormProduct.propTypes = {
  closeForm: PropTypes.func.isRequired,
};
export default FormProduct;
