import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  useGetListpromosiQuery,
  useAddpromosiMutation,
  useUpdatepromosiByIdMutation,
  useDeletepromosiByIdMutation,
} from "../../redux/services/promosiApi";
import {
  setpromosi,
  addpromosi,
  updatepromosi,
  deletepromosi,
} from "../../redux/features/counter/promosiSlice";

const PromosiList = () => {
  const dispatch = useDispatch();
  const promosi = useSelector((state) => state.promosi.promosi);
  const { data } = useGetListpromosiQuery();
  const [createpromosi] = useAddpromosiMutation();
  const [updatepromosiMutation] = useUpdatepromosiByIdMutation();
  const [deletepromosiMutation] = useDeletepromosiByIdMutation();
  useEffect(() => {
    if (data) {
      dispatch(setpromosi(data));
    }
  }, [data, dispatch]);

  const handleCreate = async () => {
    const newpromosi = { name: "New promosi" }; // Sesuaikan dengan Struktur Data
    const response = await createpromosi(newpromosi);
    dispatch(addpromosi(response));
  };

  const handleUpdate = async (id, updates) => {
    const response = await updatepromosiMutation({ id, ...updates });
    dispatch(updatepromosi(response));
  };

  const handleDelete = async (id) => {
    await deletepromosiMutation(id);
    dispatch(deletepromosi(id));
  };
  return <></>;
};

export default PromosiList;
