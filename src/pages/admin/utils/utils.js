import axios from "axios";

export const uploadImageAPIRequest = async (images, productId) => {
    const formData = new FormData();
    Array.from(images).forEach((image) => {
      formData.append("images", image);
    });
    const { data } = await axios.post(
      `/api/products/admin/upload?productId=${productId}`,
      formData
    );
    return data;
};
  
export const uploadImagesCloudinaryAPIRequest = (images, productId) => {
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
          axios.post(`/api/products/admin/upload?cloudinary=true&productId=${productId}`, data);
        });
    }
  };