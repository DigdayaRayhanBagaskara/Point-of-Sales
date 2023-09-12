import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  useGetListdiscountQuery,
  useAdddiscountMutation,
  useUpdatediscountByIdMutation,
  useDeletediscountByIdMutation,
} from "../../redux/services/discountApi";
import {
  setdiscount,
  adddiscount,
  updatediscount,
  deletediscount,
} from "../../redux/features/counter/discountSlice";

const DiscountList = () => {
  const dispatch = useDispatch();
  const discount = useSelector((state) => state.discount.discount);
  const { data } = useGetListdiscountQuery();
  const [creatediscount] = useAdddiscountMutation();
  const [updatediscountMutation] = useUpdatediscountByIdMutation();
  const [deletediscountMutation] = useDeletediscountByIdMutation();
  useEffect(() => {
    if (data) {
      dispatch(setdiscount(data));
    }
  }, [data, dispatch]);

  const handleCreate = async () => {
    const newdiscount = { name: "New discount" }; // Sesuaikan dengan Struktur Data
    const response = await creatediscount(newdiscount);
    dispatch(adddiscount(response));
  };

  const handleUpdate = async (id, updates) => {
    const response = await updatediscountMutation({ id, ...updates });
    dispatch(updatediscount(response));
  };

  const handleDelete = async (id) => {
    await deletediscountMutation(id);
    dispatch(deletediscount(id));
  };
  return <></>;
};

export default DiscountList;
