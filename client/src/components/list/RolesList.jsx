import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  useGetListrolesQuery,
  useAddrolesMutation,
  useUpdaterolesByIdMutation,
  useDeleterolesByIdMutation,
} from "../../redux/services/rolesApi";
import {
  setroles,
  addroles,
  updateroles,
  deleteroles,
} from "../../redux/features/counter/rolesSlice";

const RolesList = () => {
  const dispatch = useDispatch();
  const roles = useSelector((state) => state.roles.roles);
  const { data } = useGetListrolesQuery();
  const [createroles] = useAddrolesMutation();
  const [updaterolesMutation] = useUpdaterolesByIdMutation();
  const [deleterolesMutation] = useDeleterolesByIdMutation();
  useEffect(() => {
    if (data) {
      dispatch(setroles(data));
    }
  }, [data, dispatch]);

  const handleCreate = async () => {
    const newroles = { name: "New roles" }; // Sesuaikan dengan Struktur Data
    const response = await createroles(newroles);
    dispatch(addroles(response));
  };

  const handleUpdate = async (id, updates) => {
    const response = await updaterolesMutation({ id, ...updates });
    dispatch(updateroles(response));
  };

  const handleDelete = async (id) => {
    await deleterolesMutation(id);
    dispatch(deleteroles(id));
  };
  return <></>;
};

export default RolesList;
