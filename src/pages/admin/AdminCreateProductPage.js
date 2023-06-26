import CreateProductPageComponent from "./components/CreateProductPageComponent";
import axios from "axios";
import {
  uploadImageAPIRequest,
  uploadImagesCloudinaryAPIRequest,
} from "./utils/utils";
import { useSelector, useDispatch } from "react-redux";
import { newCategory, deleteCategory } from "../../redux/actions/categoryActions";

const createProductAPITRequest = async (formInputs) => {
  const { data } = await axios.post("/api/products/admin", { ...formInputs });
  return data;
};

const AdminCreateProductPage = () => {
  const { categories } = useSelector((state) => state.getCategories);
  const dispatch = useDispatch();
  return <CreateProductPageComponent
    createProductAPITRequest={createProductAPITRequest}
    uploadImageAPIRequest={uploadImageAPIRequest}
    uploadImagesCloudinaryAPIRequest={uploadImagesCloudinaryAPIRequest}
    categories={categories}
    newCategory={newCategory}
    reduxDispatch={dispatch}
    deleteCategory={deleteCategory}
  />;
};

export default AdminCreateProductPage;
