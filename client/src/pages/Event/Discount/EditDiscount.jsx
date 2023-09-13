/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
// Import Edit Data
import { useUpdatediscountByIdMutation } from "../../../redux/services/discountApi";
import { updatediscount } from "../../../redux/features/counter/discountSlice";

import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

// import Notifikasi
import { toast } from "react-toastify";
import moment from "moment";
const EditDiscount = ({ closeEForm, openEForm, onEdit }) => {
  const dispatch = useDispatch();
  const originalAmount = openEForm.amount;
  const originalPersen = openEForm.persen;
  const [editedDiscount, setEditedDiscount] = useState({
    id_discount: openEForm.id_discount,
    discount_names: openEForm.discount_names,
    discount_type: openEForm.discount_type,
    amount: openEForm.amount,
    persen: openEForm.persen,
    expired: moment.utc(openEForm.expired).format("YYYY-MM-DDTHH:MM"),
  });
  const { discount_type } = editedDiscount;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "discount_option") {
      const newDiscountValue =
        value === "amount" ? editedDiscount.amount : editedDiscount.persen;

      setEditedDiscount((prevDiscount) => ({
        ...prevDiscount,
        discount_type: value,
        amount: value === "amount" ? newDiscountValue : 0,
        persen: value === "%" ? newDiscountValue : 0,
      }));
    } else {
      setEditedDiscount((prevDiscount) => ({
        ...prevDiscount,
        [name]: value,
      }));

      if (name === "amount" && editedDiscount.discount_type === "%") {
        // Update "persen" to 0 when changing "amount" while discount type is "%"
        setEditedDiscount((prevDiscount) => ({
          ...prevDiscount,
          persen: 0,
        }));
      } else if (
        name === "persen" &&
        editedDiscount.discount_type === "amount"
      ) {
        // Update "amount" to 0 when changing "persen" while discount type is "amount"
        setEditedDiscount((prevDiscount) => ({
          ...prevDiscount,
          amount: 0,
        }));
      }
    }
  };
  useEffect(() => {
    if (editedDiscount.discount_type === "amount") {
      setEditedDiscount((prevDiscount) => ({
        ...prevDiscount,
        amount: originalAmount,
      }));
    } else if (editedDiscount.discount_type === "%") {
      setEditedDiscount((prevDiscount) => ({
        ...prevDiscount,
        persen: originalPersen,
      }));
    }
  }, [editedDiscount.discount_type]);
  const [editDiscount] = useUpdatediscountByIdMutation();
  const submitHandler = async () => {
    try {
      console.log("Submitting edited Discount:", editedDiscount);

      const response = await editDiscount({
        ...editedDiscount,
      });

      const updatedDiscount = response.data; // Use the API response data here
      dispatch(updatediscount(updatedDiscount));

      onEdit();
      toast.success("Data Berhasil Diubah");

      closeEForm();
    } catch (error) {
      console.error("Error while saving Discount:", error);
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
            className="m-0 rounded-b-none py-7 px-4 text-left bg-black"
          >
            <Typography variant="h4" color="white" className="ml-2">
              Edit Data
            </Typography>
          </CardHeader>
          <CardBody>
            <form className="flex flex-col gap-8 my-4">
              <Input
                label="Discount"
                id="discount_names"
                name="discount_names"
                type="text"
                value={editedDiscount.discount_names}
                onChange={handleInputChange}
              />

              <div className="flex gap-4 items-center">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="discount_option"
                    value="amount"
                    checked={discount_type === "amount"}
                    onChange={handleInputChange}
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
                    checked={discount_type === "%"}
                    onChange={handleInputChange}
                    className="mr-1"
                  />
                  <span className="text-gray-700 font-medium">Persen</span>
                  {/* ... */}
                </label>
              </div>
              {discount_type === "amount" ? (
                <Input
                  label="Amount"
                  id="amount"
                  name="amount"
                  type="number"
                  value={editedDiscount.amount}
                  onChange={handleInputChange}
                />
              ) : (
                <Input
                  label="Persen"
                  id="%"
                  name="persen"
                  type="number"
                  value={editedDiscount.persen}
                  onChange={handleInputChange}
                />
              )}
              <Input
                label="Expired"
                id="expired"
                name="expired"
                type="datetime-local"
                value={moment
                  .utc(editedDiscount.expired)
                  .format("YYYY-MM-DDTHH:MM")}
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

EditDiscount.propTypes = {
  closeEForm: PropTypes.func.isRequired,
  openEForm: PropTypes.object,
};

export default EditDiscount;
