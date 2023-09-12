import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  useGetListsalestransactionQuery,
  useAddsalestransactionMutation,
  useUpdatesalestransactionByIdMutation,
  useDeletesalestransactionByIdMutation,
} from "../../redux/services/salestransactionApi";
import {
  setsalestrans,
  addsalestrans,
  updatesalestrans,
  deletesalestrans,
} from "../../redux/features/counter/salestransSlice";

const SalestransactionList = () => {
  const dispatch = useDispatch();
  const salestransaction = useSelector(
    (state) => state.salestransaction.salestransaction
  );
  const { data } = useGetListsalestransactionQuery();
  const [createsalestransaction] = useAddsalestransactionMutation();
  const [updatesalestransactionMutation] =
    useUpdatesalestransactionByIdMutation();
  const [deletesalestransactionMutation] =
    useDeletesalestransactionByIdMutation();
  useEffect(() => {
    if (data) {
      dispatch(setsalestrans(data));
    }
  }, [data, dispatch]);

  const handleCreate = async () => {
    const newsalestransaction = { name: "New salestransaction" }; // Sesuaikan dengan Struktur Data
    const response = await createsalestransaction(newsalestransaction);
    dispatch(addsalestrans(response));
  };

  const handleUpdate = async (id, updates) => {
    const response = await updatesalestransactionMutation({ id, ...updates });
    dispatch(updatesalestrans(response));
  };

  const handleDelete = async (id) => {
    await deletesalestransactionMutation(id);
    dispatch(deletesalestrans(id));
  };
  return <></>;
};

export default SalestransactionList;
