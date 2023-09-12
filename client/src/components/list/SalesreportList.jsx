import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  useGetListsalesreportQuery,
  useAddsalesreportMutation,
  useUpdatesalesreportByIdMutation,
  useDeletesalesreportByIdMutation,
} from "../../redux/services/salesreportApi";
import {
  setsalesreport,
  addsalesreport,
  updatesalesreport,
  deletesalesreport,
} from "../../redux/features/counter/salesreportSlice";

const SalesreportList = () => {
  const dispatch = useDispatch();
  const salesreport = useSelector((state) => state.salesreport.salesreport);
  const { data } = useGetListsalesreportQuery();
  const [createsalesreport] = useAddsalesreportMutation();
  const [updatesalesreportMutation] = useUpdatesalesreportByIdMutation();
  const [deletesalesreportMutation] = useDeletesalesreportByIdMutation();
  useEffect(() => {
    if (data) {
      dispatch(setsalesreport(data));
    }
  }, [data, dispatch]);

  const handleCreate = async () => {
    const newsalesreport = { name: "New salesreport" }; // Sesuaikan dengan Struktur Data
    const response = await createsalesreport(newsalesreport);
    dispatch(addsalesreport(response));
  };

  const handleUpdate = async (id, updates) => {
    const response = await updatesalesreportMutation({ id, ...updates });
    dispatch(updatesalesreport(response));
  };

  const handleDelete = async (id) => {
    await deletesalesreportMutation(id);
    dispatch(deletesalesreport(id));
  };
  return <></>;
};

export default SalesreportList;
