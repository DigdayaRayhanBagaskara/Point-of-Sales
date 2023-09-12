import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  useGetListstrukQuery,
  useAddstrukMutation,
  useUpdatestrukByIdMutation,
  useDeletestrukByIdMutation,
} from "../../redux/services/strukApi";
import {
  setstruk,
  addstruk,
  updatestruk,
  deletestruk,
} from "../../redux/features/counter/strukSlice";

const StruktransactionList = () => {
  const dispatch = useDispatch();
  const struk = useSelector((state) => state.struk.struk);
  const { data } = useGetListstrukQuery();
  const [createstruk] = useAddstrukMutation();
  const [updatestrukMutation] = useUpdatestrukByIdMutation();
  const [deletestrukMutation] = useDeletestrukByIdMutation();
  useEffect(() => {
    if (data) {
      dispatch(setstruk(data));
    }
  }, [data, dispatch]);

  const handleCreate = async () => {
    const newstruk = { name: "New struk" }; // Sesuaikan dengan Struktur Data
    const response = await createstruk(newstruk);
    dispatch(addstruk(response));
  };

  const handleUpdate = async (id, updates) => {
    const response = await updatestrukMutation({ id, ...updates });
    dispatch(updatestruk(response));
  };

  const handleDelete = async (id) => {
    await deletestrukMutation(id);
    dispatch(deletestruk(id));
  };
  return <></>;
};

export default StruktransactionList;
