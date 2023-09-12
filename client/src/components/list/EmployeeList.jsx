import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  useGetListemployeeQuery,
  useAddemployeeMutation,
  useUpdateemployeeByIdMutation,
  useDeleteemployeeByIdMutation,
} from "../../redux/services/employeeApi";
import {
  setemployee,
  addemployee,
  updateemployee,
  deleteemployee,
} from "../../redux/features/counter/employeeSlice";

const EmployeeList = () => {
  const dispatch = useDispatch();
  const employee = useSelector((state) => state.employee.employee);
  const { data } = useGetListemployeeQuery();
  const [createemployee] = useAddemployeeMutation();
  const [updateemployeeMutation] = useUpdateemployeeByIdMutation();
  const [deleteemployeeMutation] = useDeleteemployeeByIdMutation();
  useEffect(() => {
    if (data) {
      dispatch(setemployee(data));
    }
  }, [data, dispatch]);

  const handleCreate = async () => {
    const newemployee = { name: "New employee" }; // Sesuaikan dengan Struktur Data
    const response = await createemployee(newemployee);
    dispatch(addemployee(response));
  };

  const handleUpdate = async (id, updates) => {
    const response = await updateemployeeMutation({ id, ...updates });
    dispatch(updateemployee(response));
  };

  const handleDelete = async (id) => {
    await deleteemployeeMutation(id);
    dispatch(deleteemployee(id));
  };
  return <></>;
};

export default EmployeeList;
