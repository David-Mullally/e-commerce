import { useParams } from "react-router-dom";

const ProductDetailsPage = () => {
    const { productId } = useParams();
    console.log(productId)
    return <p>This is the product details page</p>
}

export default ProductDetailsPage;