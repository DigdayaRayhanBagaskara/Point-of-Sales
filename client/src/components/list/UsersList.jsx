import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  useGetListusersQuery,
  useAddusersMutation,
  useUpdateusersByIdMutation,
  useDeleteusersByIdMutation,
} from "../../redux/services/usersApi";
import {
  setusers,
  addusers,
  updateusers,
  deleteusers,
} from "../../redux/features/counter/usersSlice";

const UsersList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const { data } = useGetListusersQuery();
  const [createusers] = useAddusersMutation();
  const [updateusersMutation] = useUpdateusersByIdMutation();
  const [deleteusersMutation] = useDeleteusersByIdMutation();
  useEffect(() => {
    if (data) {
      dispatch(setusers(data));
    }
  }, [data, dispatch]);

  const handleCreate = async () => {
    const newusers = { name: "New users" }; // Sesuaikan dengan Struktur Data
    const response = await createusers(newusers);
    dispatch(addusers(response));
  };

  const handleUpdate = async (id, updates) => {
    const response = await updateusersMutation({ id, ...updates });
    dispatch(updateusers(response));
  };

  const handleDelete = async (id) => {
    await deleteusersMutation(id);
    dispatch(deleteusers(id));
  };
  return <></>;
};

export default UsersList;
