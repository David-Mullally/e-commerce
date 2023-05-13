import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Alert,
  Button,
  CloseButton,
  Col,
  Container,
  Form,
  Image,
  Row,
  Table,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const AdminEditProductPageComponent = ({ categories, fetchProduct }) => {
  const [validated, setValidated] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    fetchProduct(id)
      .then((product) => console.log(product))
      .catch((er) => console.log(er));
  }, []);

  const onHover = {
    cursor: "pointer",
    position: "absolute",
    left: "5px",
    top: "-10px",
    transform: "scale(2.7)",
  };
  {
    /*const onChange = () => {
    const password = document.querySelector("input[name=password]");
    const passwordConfirm = document.querySelector(
      "input[name=passwordConfirm]"
    );
    if (password.value === passwordConfirm.value) {
      passwordConfirm.setCustomValidity("");
    } else {
      passwordConfirm.setCustomValidity("Passwords don't match");
    }
  };*/
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  return (
    <Container>
      <Row className="justify-content-md-center mt-3">
        <Col md={1}>
          <Link className="btn btn-info my-3" to="/admin/products">
            Go Back
          </Link>
        </Col>
        <Col md={6}>
          <h3>EditProduct</h3>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicProductName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                required
                type="text"
                name="productName"
                defaultValue="Panasonic"
              />
              <Form.Control.Feedback type="invalid">
                Please enter the products name!
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
          <Form.Group
            className="mb-3"
            controlId="form.ProductDescriptionTextArea"
          >
            <Form.Label>Description</Form.Label>
            <Form.Control
              name="productDescription"
              required
              as="textarea"
              rows={2}
              defaultValue="A brief description of the product."
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="form.ProductCountInStockTextArea"
          >
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control
              name="productCountInStock"
              required
              type="number"
              defaultValue="100"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="form.ProductPriceTextArea">
            <Form.Label>Price</Form.Label>
            <Form.Control
              name="productPrice"
              required
              type="text"
              defaultValue="$150"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="form.ProductCategoryTextArea">
            <Form.Label>
              Category
              <CloseButton />(<small>remove select</small>)
            </Form.Label>
            <Form.Select
              required
              name="producCategory"
              aria-label="Default select example"
            >
              <option value="">Choose Category</option>
              {categories.map((category, idx) => (
                <option key={idx} value={category.name}>
                  {category.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Row className="mt-5">
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formBasicAttributes">
                <Form.Label>Choose Attribute and set value</Form.Label>
                <Form.Select name="atrrKey" aria-label="Default select example">
                  <option>Choose Attribute</option>
                  <option value="Color">Color</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formBasicAttributeValue">
                <Form.Label>Attribute value</Form.Label>
                <Form.Select
                  name="atrrValue"
                  aria-label="Default select example"
                >
                  <option>Choose Attribute Value</option>
                  <option value="red">Red</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Table hover>
              <thead>
                <tr>
                  <th>Attribute</th>
                  <th>Value</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>attr key</td>
                  <td>attr value</td>
                </tr>
              </tbody>
            </Table>
            <Row>
              <Col md={6}>
                <Form.Group
                  className="mb-3"
                  controlId="formBasicNewProductAttribute"
                >
                  <Form.Label>Create new product attribute</Form.Label>
                  <Form.Control
                    disabled={false}
                    placeholder="first choose or create a category"
                    name="newProductAttrValue"
                    type="text"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group
                  className="mb-3"
                  controlId="formBasicNewProductAttributeValue"
                >
                  <Form.Label>Create new product attribute value</Form.Label>
                  <Form.Control
                    disabled={false}
                    placeholder="first choose or create a category"
                    name="newProductAttrValueValue"
                    type="text"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Alert variant="primary">
              After typing the attributes key and value, press enter on one of
              these fields{" "}
            </Alert>
          </Row>
          <Form.Group controlId="formMultiple" className="mb-3 mt-3">
            <Form.Label>Images</Form.Label>
            <Row>
              <Col style={{ position: "relative" }} xs={3}>
                <Image
                  crossOrigin="anonymous"
                  src="/images/category-1.jpg"
                  fluid
                />
                <i style={onHover} className="bi bi-x text-danger"></i>
              </Col>
              <Col style={{ position: "relative" }} xs={3}>
                <Image
                  crossOrigin="anonymous"
                  src="/images/category-1.jpg"
                  fluid
                />
                <i style={onHover} className="bi bi-x text-danger"></i>
              </Col>
            </Row>

            <Form.Control required type="file" multiple />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            style={{ marginBottom: "12vh" }}
          >
            Update
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminEditProductPageComponent;
