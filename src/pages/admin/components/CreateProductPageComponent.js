import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Button,
  CloseButton,
  Col,
  Container,
  Form,
  Row,
  Table,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const CreateProductPageComponent = ({
  createProductAPITRequest,
  uploadImageAPIRequest,
  uploadImagesCloudinaryAPIRequest,
  categories,
  reduxDispatch,
  newCategory,
}) => {
  const [validated, setValidated] = useState(false);
  const [attributesTable, setAttributesTable] = useState([]);
  const [images, setImages] = useState(false);
  const [isCreating, setIsCreating] = useState("");
  const [createProductResponseState, setCreateProductResponseState] = useState({
    message: "",
    error: "",
  });
  const [categoryChosen, setCategoryChosen] = useState("Choose category");

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

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    const form = event.currentTarget.elements;
    event.preventDefault();
    event.stopPropagation();
    const formInputs = {
      name: form.name.value,
      description: form.description.value,
      count: form.count.value,
      category: form.category.value,
      attributesTable: attributesTable,
    };
    if (event.currentTarget.checkValidity() === true) {
      if (images.length > 3) {
        setIsCreating("too many files");
        return;
      }
      createProductAPITRequest(formInputs)
        .then((data) => {
          if (images) {
            if (process.env.NODE_ENV === "production") {
              // To do: cahnage to !==
              uploadImageAPIRequest(images, data.productId)
                .then((res) => {})
                .catch((er) =>
                  setIsCreating(
                    er.reponse.data.message
                      ? er.response.data.message
                      : er.response.data
                  )
                );
            } else {
              uploadImagesCloudinaryAPIRequest(images, data.productId);
            }
          }
          if (data.message === "product created") navigate("/admin/products");
        })
        .catch((er) =>
          setCreateProductResponseState(
            er.response.data.message
              ? er.response.data.message
              : er.response.data
          )
        );
    }

    setValidated(true);
  };

  const uploadHandler = (images) => {
    setImages(images);
  };

  const newCategoryHandler = (e) => {
    if (e.keyCode && e.keyCode === 13 && e.target.value) {
      reduxDispatch(newCategory(e.target.value));
      setTimeout(() => {
        let element = document.getElementById("cats");
        element.value = e.target.value;
        setCategoryChosen(e.target.value);
        e.target.value = "";
      }, 200);
    }
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
          <h3>Create A New Product</h3>
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            autocomplete="off"
          >
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
              rows={2}
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
            <Form.Control name="productPrice" required type="text" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="form.ProductCategoryTextArea">
            <Form.Label>
              Category
              <CloseButton />(<small>remove select</small>)
            </Form.Label>
            <Form.Select
              id="cats"
              required
              name="producCategory"
              aria-label="Default select example"
            >
              <option value="Choose category">Choose Category</option>
              {categories.map((category, idx) => {
                <option key={idx} value={category.name}>
                  {category.name}
                </option>;
              })}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicNewCategory">
            <Form.Label>
              Or create a new category (e.g. Computers, Laptops etc.){""}
            </Form.Label>
            <Form.Control
              onkeyUp={newCategoryHandler}
              name="newProductCategory"
              type="text"
            />
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
                  <td>
                    <CloseButton />
                  </td>
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
                    disabled={categoryChosen === "Choose category"}
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
                    disabled={categoryChosen === "Choose category"}
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
            <Form.Control
              required
              type="file"
              multiple
              onChange={(e) => uploadHandler(e.target.files)}
            />
            {isCreating}
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            style={{ marginBottom: "12vh" }}
          >
            Create
          </Button>
          {createProductResponseState.error ?? ""}
        </Col>
      </Row>
    </Container>
  );
};

export default CreateProductPageComponent;
