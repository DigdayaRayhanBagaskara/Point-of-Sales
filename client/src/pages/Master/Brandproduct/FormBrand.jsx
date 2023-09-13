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
// Import Add Data
import { useAddbrandMutation } from "../../../redux/services/brandproductApi";
import { addbrand } from "../../../redux/features/counter/brandSlice";
import { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
// import Notifikasi
import { toast } from "react-toastify";
const Formbrand = ({ closeForm, onEdit }) => {
  const dispatch = useDispatch();
  const [formLoginData, setFormLoginData] = useState({
    brand_name: "",
    keterangan: "",
    asal_brand: "",
  });

  // Proses Add Data
  const { brand_name, keterangan, asal_brand } = formLoginData;
  const [createBrand] = useAddbrandMutation();
  const submitHandler = async () => {
    try {
      if (!brand_name || !keterangan || !asal_brand) {
        toast.error("Data Harus Diisi Terlebih Dahulu");
        return;
      }
      const response = await createBrand({
        brand_name: formLoginData.brand_name,
        keterangan: formLoginData.keterangan,
        asal_brand: formLoginData.asal_brand,
      });

      dispatch(addbrand(response)); // Jika response berisi data baru dari server
      onEdit();
      toast.success("Data Berhasil Disimpan");
      // Reset form data setelah berhasil menyimpan
      setFormLoginData({
        brand_name: "",
        keterangan: "",
        asal_brand: "",
      });
      closeForm();
    } catch (error) {
      console.error("Error while saving Brand:", error);
    }
  };
  return (
    <>
      <div className="flex justify-center items-center place-content-center h-[79vh]">
        <Card className="w-full max-w-[30rem] ">
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
            <form className="flex flex-col gap-4 my-4">
              <Input
                label="Produk"
                id="brand_name"
                name="brand_name"
                type="text"
                value={formLoginData.brand_name}
                onChange={(event) =>
                  setFormLoginData({
                    ...formLoginData,
                    brand_name: event.target.value,
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
                label="Asal Brand"
                id="asal_brand"
                name="asal_brand"
                type="text"
                value={formLoginData.asal_brand}
                onChange={(event) =>
                  setFormLoginData({
                    ...formLoginData,
                    asal_brand: event.target.value,
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
Formbrand.propTypes = {
  closeForm: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};
export default Formbrand;
