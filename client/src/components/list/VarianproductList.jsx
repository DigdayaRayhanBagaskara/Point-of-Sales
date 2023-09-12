import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  useGetListvarianproductQuery,
  useAddvarianproductMutation,
  useUpdatevarianproductByIdMutation,
  useDeletevarianproductByIdMutation,
} from "../../redux/services/varianproductApi";
import {
  setvarian,
  addvarian,
  updatevarian,
  deletevarian,
} from "../../redux/features/counter/varianSlice";

const VarianproductList = () => {
  const dispatch = useDispatch();
  const varian = useSelector((state) => state.varian.varian);
  const { data } = useGetListvarianproductQuery();
  const [createvarian] = useAddvarianproductMutation();
  const [updatevarianMutation] = useUpdatevarianproductByIdMutation();
  const [deletevarianMutation] = useDeletevarianproductByIdMutation();
  useEffect(() => {
    if (data) {
      dispatch(setvarian(data));
    }
  }, [data, dispatch]);

  const handleCreate = async () => {
    const newvarian = { name: "New varian" }; // Sesuaikan dengan Struktur Data
    const response = await createvarian(newvarian);
    dispatch(addvarian(response));
  };

  const handleUpdate = async (id, updates) => {
    const response = await updatevarianMutation({ id, ...updates });
    dispatch(updatevarian(response));
  };

  const handleDelete = async (id) => {
    await deletevarianMutation(id);
    dispatch(deletevarian(id));
  };
  return <></>;
};

export default VarianproductList;
