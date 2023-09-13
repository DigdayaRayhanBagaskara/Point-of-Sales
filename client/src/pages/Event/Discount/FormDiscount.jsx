/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import "react-toastify/dist/ReactToastify.css";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
// import Add data
import { useAddiscountMutation } from "../../../redux/services/discountApi";
import { adddiscount } from "../../../redux/features/counter/discountSlice";
import { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import moment from "moment";
// import Notifikasi
import { toast } from "react-toastify";

const FormDiscount = ({ closeForm, onEdit }) => {
  const dispatch = useDispatch();
  const [formLoginData, setFormLoginData] = useState({
    discount_name: "",
    discount_option: "amount",
    amount: "",
    persen: "",
    expired: "",
  });
  const { discount_name, discount_option, amount, persen, expired } =
    formLoginData;

  const [createCategory] = useAddiscountMutation();
  const submitHandler = async () => {
    try {
      if (!discount_name || !discount_option || !expired) {
        toast.error("Data Harus Diisi Terlebih Dahulu");
        return;
      }
      if (discount_option !== "amount" && discount_option !== "%") {
        toast.error("Jenis diskon tidak valid");
        return;
      }
      const response = await createCategory({
        discount_names: formLoginData.discount_name,
        discount_type: discount_option,
        amount: discount_option === "amount" ? formLoginData.amount || 0 : 0,
        persen: discount_option === "%" ? formLoginData.persen || 0 : 0,
        expired: moment
          .utc(formLoginData.expired)
          .format("YYYY-MM-DD HH:MM:SS"),
      });

      dispatch(adddiscount(response)); // Jika response berisi data baru dari server
      onEdit();
      toast.success("Data Berhasil Disimpan");
      // Reset form data setelah berhasil menyimpan
      setFormLoginData({
        discount_name: "",
        discount_option: "",
        amount: "",
        persen: "",
        expired: "",
      });
      closeForm();
    } catch (error) {
      console.error("Error while saving category:", error);
    }
  };
  return (
    <>
      <div className="flex justify-center items-center place-content-center h-[79vh]">
        <Card className="w-full  max-w-[30rem] ">
          <CardHeader
            color="gray"
            floated={false}
            shadow={false}
            className="m-0 rounded-b-none py-8 px-4 text-left bg-black"
          >
            <Typography variant="h4" color="white" className="ml-2">
              Add Data
            </Typography>
          </CardHeader>
          <CardBody>
            <form className="flex flex-col gap-8 my-4">
              <Input
                label="Discount"
                id="discount_name"
                name="discount_name"
                type="text"
                value={formLoginData.discount_name}
                onChange={(event) =>
                  setFormLoginData({
                    ...formLoginData,
                    discount_name: event.target.value,
                  })
                }
              />

              <div className="flex gap-4 items-center">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="discount_option"
                    value="amount"
                    checked={discount_option === "amount"}
                    onChange={() =>
                      setFormLoginData({
                        ...formLoginData,
                        discount_option: "amount",
                      })
                    }
                    className="mr-1"
                  />
                  <span className="text-gray-700 font-medium">Amount</span>
                  {/* ... */}
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="discount_option"
                    value="%"
                    checked={discount_option === "%"}
                    onChange={() =>
                      setFormLoginData({
                        ...formLoginData,
                        discount_option: "%",
                      })
                    }
                    className="mr-1"
                  />
                  <span className="text-gray-700 font-medium">Persen</span>
                  {/* ... */}
                </label>
              </div>
              {discount_option === "amount" ? (
                <Input
                  label="Amount"
                  id="amount"
                  name="amount"
                  type="number"
                  value={amount}
                  onChange={(event) =>
                    setFormLoginData({
                      ...formLoginData,
                      amount: event.target.value,
                    })
                  }
                />
              ) : (
                <Input
                  label="Persen"
                  id="%"
                  name="persen"
                  type="number"
                  value={persen}
                  onChange={(event) =>
                    setFormLoginData({
                      ...formLoginData,
                      persen: event.target.value,
                    })
                  }
                />
              )}
              <Input
                label="Expired"
                id="expired"
                name="expired"
                type="datetime-local"
                value={formLoginData.expired}
                onChange={(event) =>
                  setFormLoginData({
                    ...formLoginData,
                    expired: event.target.value,
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
FormDiscount.propTypes = {
  closeForm: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};
export default FormDiscount;
