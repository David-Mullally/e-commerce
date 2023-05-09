import UserProfilePageComponent from "./components/UserProfilePageComponent";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setReduxUserState } from "../../redux/actions/userActions";

const updateUserApiRequest = async (
  name,
  lastName,
  phoneNumber,
  address,
  zipCode,
  country,
  city,
  state,
  password
) => {
  const { data } = await axios.put("/api/users/profile", {
    name,
    lastName,
    phoneNumber,
    address,
    zipCode,
    country,
    city,
    state,
    password,
  });
  return data;
};

const UserProfilePage = () => {
  const { userInfo } = useSelector((state) => state.userRegisterLogin);
  const reduxDispatch = useDispatch();
  const fetchUser = async (id) => {
    const { data } = await axios.get(`/api/users/profile/${id}`);
    return data;
  };

  return (
    <UserProfilePageComponent
      updateUserApiRequest={updateUserApiRequest}
      fetchUser={fetchUser}
      userInfoFromRedux={userInfo}
      setReduxUserState={setReduxUserState}
      reduxDispatch={reduxDispatch}
      localStorage={window.localStorage}
      sessionStorage={window.sessionStorage}
    />
  );
};

export default UserProfilePage;
