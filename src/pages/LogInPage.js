import LogInPageComponent from "./components/LogInPageComponent";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setReduxUserState } from "../redux/actions/userActions";

const LogInUserApiRequest = async (email, password, doNotLogout) => {
  const { data } = await axios.post("/api/users/login", {
    email,
    password,
    doNotLogout,
  });
  if (data.userLoggedIn.doNotLogout) localStorage.setItem("userInfo", JSON.stringify(data.userLoggedIn))
  else sessionStorage.setItem("userInfo", JSON.stringify(data.userLoggedIn))
  return data;
};

const LogInPage = () => {
  const reduxDispatch = useDispatch();
  return <LogInPageComponent LogInUserApiRequest={LogInUserApiRequest} reduxDispatch={reduxDispatch} setReduxUserState={setReduxUserState} />;
};

export default LogInPage;
