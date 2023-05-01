import UsersPageComponent from "./components/UsersPageComponent";

import axios from "axios";

const fetchUsers = async(abortctrl) => {
  const { data } = await axios.get("/api/users", {
    signal: abortctrl.signal,
  });
  return data;
}

const deleteUser = async(userId) => {
  const{ data } = await axios.delete(`/api/users/${userId}`)
  return data;
}

fetchUsers();

const AdminUsersPage = () => {
  return <UsersPageComponent fetchUsers={fetchUsers} deleteUser={deleteUser} />;
};

export default AdminUsersPage;
