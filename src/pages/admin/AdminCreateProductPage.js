import CreateProductPageComponent from "./components/CreateProductPageComponent";
import axios from "axios";
import { uploadImageAPIRequest, uploadImagesCloudinaryAPIRequest } from "./utils/utils";

const createProductAPITRequest = async (formInputs) => {
  const { data } = await axios.post("/api/products/admin", { ...formInputs });
  return data;
};

const AdminCreateProductPage = () => {
  <CreateProductPageComponent
    createProductAPITRequest={createProductAPITRequest}
    uploadImageAPIRequest={uploadImageAPIRequest}
    uploadImagesCloudinaryAPIRequest={uploadImagesCloudinaryAPIRequest}
  />;
};

export default AdminCreateProductPage;
