import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  useGetListbrandQuery,
  useAddbrandMutation,
  useUpdatebrandByIdMutation,
  useDeletebrandByIdMutation,
} from "../../redux/services/brandproductApi";
import {
  setbrand,
  addbrand,
  updatebrand,
  deletebrand,
} from "../../redux/features/counter/brandSlice";

const BrandList = () => {
  const dispatch = useDispatch();
  const brand = useSelector((state) => state.brand.brand);
  const { data } = useGetListbrandQuery();
  const [createbrand] = useAddbrandMutation();
  const [updatebrandMutation] = useUpdatebrandByIdMutation();
  const [deletebrandMutation] = useDeletebrandByIdMutation();
  useEffect(() => {
    if (data) {
      dispatch(setbrand(data));
    }
  }, [data, dispatch]);

  const handleCreate = async () => {
    const newbrand = { name: "New brand" }; // Sesuaikan dengan Struktur Data
    const response = await createbrand(newbrand);
    dispatch(addbrand(response));
  };

  const handleUpdate = async (id, updates) => {
    const response = await updatebrandMutation({ id, ...updates });
    dispatch(updatebrand(response));
  };

  const handleDelete = async (id) => {
    await deletebrandMutation(id);
    dispatch(deletebrand(id));
  };
  return <></>;
};

export default BrandList;
