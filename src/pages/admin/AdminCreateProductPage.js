import CreateProductPageComponent from "./components/CreateProductPageComponent";
import axios from "axios";

const createProductAPITRequest = async (formInputs) => {
  const { data } = await axios.post("/api/products/admin", { ...formInputs });
  return data;
};

const uploadImageAPIRequest = async (images, productId) => {
  const formData = new FormData();
  Array.from(images).forEach((image) => {
    formData.append("images", image);
  });
  await axios.post(
    `/api/products/admin/upload?productId=${productId}`,
    formData
  );
};

const uploadImagesCloudinaryAPIRequest = (images) => {
  const url = "https://api.cloudinary.com/v1_1/dptxzz9wv/image/upload";
  const formData = new FormData();
  for (let i = 0; i < images.length; i++) {
    let file = images[i];
    formData.append("file", file);
    formData.append("upload_preset", "nseuxrnh");
    fetch(url, {
      method: POST,
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  }
};

const AdminCreateProductPage = () => {
  <CreateProductPageComponent
    createProductAPITRequest={createProductAPITRequest}
    uploadImageAPIRequest={uploadImageAPIRequest}
    uploadImagesCloudinaryAPIRequest={uploadImagesCloudinaryAPIRequest}
  />;
};

export default AdminCreateProductPage;
