import RegistrationPageComponent from "./components/RegistrationPageComponent";

import axios from "axios";
import { useDispatch } from "react-redux";
import { setReduxUserState } from "../redux/actions/userActions";

const registerApiUserRequest = async (name, lastName, email, password) => {
  const { data } = await axios.post("/api/users/register", {
    name,
    lastName,
    email,
    password,
  });
  sessionStorage.setItem("userInfo", JSON.stringify(data.userCreated));
  if (data.success === "User created") window.location.href = "/user";
  return data;
};

const RegistrationPage = () => {
  const reduxDispatch = useDispatch();
  return (
    <RegistrationPageComponent
      registerApiUserRequest={registerApiUserRequest}
      reduxDispatch={reduxDispatch}
      setReduxUserState={setReduxUserState}
    />
  );
};

export default RegistrationPage;
