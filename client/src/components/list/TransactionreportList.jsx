import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  useGetListtransactionsreportQuery,
  useAddtransactionsreportMutation,
  useUpdatetransactionsreportByIdMutation,
  useDeletetransactionsreportByIdMutation,
} from "../../redux/services/transactionreportApi";
import {
  settransactionsreport,
  addtransactionsreport,
  updatetransactionsreport,
  deletetransactionsreport,
} from "../../redux/features/counter/transactionsreportSlice";

const TransactionsreportList = () => {
  const dispatch = useDispatch();
  const transactionsreport = useSelector(
    (state) => state.transactionsreport.transactionsreport
  );
  const { data } = useGetListtransactionsreportQuery();
  const [createtransactionsreport] = useAddtransactionsreportMutation();
  const [updatetransactionsreportMutation] =
    useUpdatetransactionsreportByIdMutation();
  const [deletetransactionsreportMutation] =
    useDeletetransactionsreportByIdMutation();
  useEffect(() => {
    if (data) {
      dispatch(settransactionsreport(data));
    }
  }, [data, dispatch]);

  const handleCreate = async () => {
    const newtransactionsreport = { name: "New transactionsreport" }; // Sesuaikan dengan Struktur Data
    const response = await createtransactionsreport(newtransactionsreport);
    dispatch(addtransactionsreport(response));
  };

  const handleUpdate = async (id, updates) => {
    const response = await updatetransactionsreportMutation({ id, ...updates });
    dispatch(updatetransactionsreport(response));
  };

  const handleDelete = async (id) => {
    await deletetransactionsreportMutation(id);
    dispatch(deletetransactionsreport(id));
  };
  return <></>;
};

export default TransactionsreportList;
