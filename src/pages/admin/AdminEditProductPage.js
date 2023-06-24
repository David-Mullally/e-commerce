import EditProductPageComponent from "./components/EditProductPageComponent";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { saveAttributeToCatDoc } from "../../redux/actions/categoryActions";
import { uploadImageAPIRequest, uploadImagesCloudinaryAPIRequest } from "./utils/utils";

const fetchProduct = async (productId) => {
  const { data } = await axios.get(`/api/products/get-one/${productId}`);
  return data;
};

const updateProductApiRequest = async (id, formInputs) => {
  const { data } = await axios.put(`/api/products/admin/${id}`, { ...formInputs });
  return data
};

const AdminEditProductPage = () => {
  const { categories } = useSelector((state) => state.getCategories);
  const reduxDispatch = useDispatch();

  const imageDeleteHandler = async (imagePath, productId) => {
    let encoded = encodeURIComponent(imagePath);
    if (process.env.NODE_ENV === "production") { // to do: change to !==
      await axios.delete(`/api/products/admin/image/${encoded}/${productId}`)
    } else {
      await axios.delete(`/api/products/admin/image/${encoded}/${productId}?cloudinary=true`)
    }
    await axios.delete(`/api/product/admin/image/${encoded}/${productId}`);
  }

  return (
    <EditProductPageComponent
      categories={categories}
      fetchProduct={fetchProduct}
      updateProductApiRequest={updateProductApiRequest}
      reduxDispatch={reduxDispatch}
      saveAttributeToCatDoc={saveAttributeToCatDoc}
      imageDeleteHandler={imageDeleteHandler}
      uploadImageAPIRequest={uploadImageAPIRequest}
      uploadImagesCloudinaryAPIRequest
      
    />
  );
};

export default AdminEditProductPage;
