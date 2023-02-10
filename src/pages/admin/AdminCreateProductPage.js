import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const AdminCreateProductPage = () => {
  const [validated, setValidated] = useState(false);

  {/*const onChange = () => {
    const password = document.querySelector("input[name=password]");
    const passwordConfirm = document.querySelector(
      "input[name=passwordConfirm]"
    );
    if (password.value === passwordConfirm.value) {
      passwordConfirm.setCustomValidity("");
    } else {
      passwordConfirm.setCustomValidity("Passwords don't match");
    }
  };*/}

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
          <h1>Create A New Product</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicProductName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control required type="text" name="productName" />
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
              rows={3}
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="form.ProductCountInStockTextArea"
          >
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control name="productCountInStock" required type="number" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="form.ProductPriceTextArea">
            <Form.Label>Price</Form.Label>
            <Form.Control name="productPrice" required type="number" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="form.ProductCategoryTextArea">
            <Form.Label>Category</Form.Label>
            <Form.Select
              required
              name="producCategory"
              aria-label="Default select example"
            >
              <option value="">Choose Category</option>
              <option value="1">Laptop</option>
              <option value="2">TV</option>
              <option value="3">Games</option>
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="formMultiple" className="mb-3 mt-3">
            <Form.Label>Images</Form.Label>
            <Form.Control required type="file" multiple />
          </Form.Group>
          <Button variant="primary" type="submit" className="mb-5">
            Create
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminCreateProductPage;
