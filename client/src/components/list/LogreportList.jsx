import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  useGetListlogmanageproductQuery,
  useAddlogmanageproductMutation,
  useUpdatelogmanageproductByIdMutation,
  useDeletelogmanageproductByIdMutation,
} from "../../redux/services/logmanagereportApi";
import {
  setlogreport,
  addlogreport,
  updatelogreport,
  deletelogreport,
} from "../../redux/features/counter/logreportSlice";

const LogreportList = () => {
  const dispatch = useDispatch();
  const logreport = useSelector((state) => state.logreport.logreport);
  const { data } = useGetListlogmanageproductQuery();
  const [createlogreport] = useAddlogmanageproductMutation();
  const [updatelogreportMutation] = useUpdatelogmanageproductByIdMutation();
  const [deletelogreportMutation] = useDeletelogmanageproductByIdMutation();
  useEffect(() => {
    if (data) {
      dispatch(setlogreport(data));
    }
  }, [data, dispatch]);

  const handleCreate = async () => {
    const newlogreport = { name: "New logreport" }; // Sesuaikan dengan Struktur Data
    const response = await createlogreport(newlogreport);
    dispatch(addlogreport(response));
  };

  const handleUpdate = async (id, updates) => {
    const response = await updatelogreportMutation({ id, ...updates });
    dispatch(updatelogreport(response));
  };

  const handleDelete = async (id) => {
    await deletelogreportMutation(id);
    dispatch(deletelogreport(id));
  };
  return <></>;
};

export default LogreportList;
