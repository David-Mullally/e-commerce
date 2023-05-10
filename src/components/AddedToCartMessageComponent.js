import { Alert, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function AddedToCartMessageComponent({showCartMessage, setShowCartMessage}) {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1)
  }
    return (
      <Alert show={showCartMessage } variant="success" onClose={() => setShowCartMessage(false)} dismissible>
        <Alert.Heading>
          The Product was added to your cart successfully
        </Alert.Heading>
        <p>
          <Button onClick={goBack} variant="success">Continue Shopping</Button>{" "}
          <Link to="/cart">
            {" "}
            <Button variant="danger">Go To Cart</Button>
          </Link>
        </p>
      </Alert>
    );
}

export default AddedToCartMessageComponent;
