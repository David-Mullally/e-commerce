import LogInPageComponent from "./components/LogInPageComponent";
import axios from "axios";

const LogInUserApiRequest = async (email, password, doNotLogout) => {
  const { data } = await axios.post("/api/users/login", {
    email,
    password,
    doNotLogout,
  });
  return data;
};

const LogInPage = () => {
  return <LogInPageComponent LogInUserApiRequest={LogInUserApiRequest} />;
};

export default LogInPage;
