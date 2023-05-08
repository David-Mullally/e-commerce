import RegistrationPageComponent from "./components/RegistrationPageComponent";

import axios from "axios";

const registerApiUserRequest = async (name, lastName, email, password) => {
  const { data } = await axios.post("/api/users/register", {
    name,
    lastName,
    email,
    password,
  });
  return data;
};

const RegistrationPage = () => {
  return <RegistrationPageComponent registerApiUserRequest={registerApiUserRequest} />;
};

export default RegistrationPage;
