import { useState, useEffect, Fragment, useRef } from "react";
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
import { useNavigate } from "react-router-dom";

const AdminEditProductPageComponent = ({
  categories,
  fetchProduct,
  updateProductApiRequest,
}) => {
  const [validated, setValidated] = useState(false);
  const [product, setProduct] = useState({});
  const [updateProductResponseState, setupdateProductResponseState] = useState({
    message: "",
    error: "",
  });
  const [attributesFromDb, setAttributesFromDb] = useState([]);

  const attrVal = useRef(null);
  const attrKey = useRef(null);

  const { id } = useParams();

  const setValuesForAttrFromDbSelectForm = (e) => {
    if (e.target.value !== "Choose Attribute") {
      var selectedAttr = attributesFromDb.find(
        (item) => item.key === e.target.value
      );
      let valuesForAttrKeys = attrVal.current;
      if (selectedAttr && selectedAttr.value.length > 0) {
        while (valuesForAttrKeys.options.length) {
          valuesForAttrKeys.remove(0);
        }
        valuesForAttrKeys.options.add(new Option("Choose Attribute Value"));
        selectedAttr.value.map((item) => {
          valuesForAttrKeys.add(new Option(item));
          return "";
        });
      }
    }
  };
  console.log("product", id);
  const navigate = useNavigate();
  useEffect(() => {
    fetchProduct(id)
      .then((product) => {
        console.log(product);
        setProduct(product);
      })
      .catch((er) => console.log(er));
  }, [id]);

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
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;
    const formInputs = {
      name: form.name.value,
      description: form.description.value,
      count: form.count.value,
      price: form.price.value,
      category: form.category.value,
      attributesTable: [],
    };
    if (event.currentTarget.checkValidity() === true) {
      updateProductApiRequest(id, formInputs)
        .then((data) => {
          if (data.message === "Product updated") navigate("/admin/products");
        })
        .catch((er) =>
          setupdateProductResponseState({
            error: er.response.data.message
              ? er.response.data.message
              : er.response.data,
          })
        );
    }

    setValidated(true);
  };

  useEffect(() => {
    let categoryOfEditedProduct = categories.find(
      (item) => item.name === product.category
    );
    if (categoryOfEditedProduct) {
      const mainCategoryOfEditedProduct =
        categoryOfEditedProduct.name.split("/")[0];
      const mainCategoryOfEditedProductAlldata = categories.find(
        (categoryOfEditedProduct) =>
          categoryOfEditedProduct.name === mainCategoryOfEditedProduct
      );
      if (
        mainCategoryOfEditedProductAlldata &&
        mainCategoryOfEditedProductAlldata.attrs.length > 0
      ) {
        setAttributesFromDb(mainCategoryOfEditedProductAlldata.attrs);
      }
    }
  }, [product]);

  const changeCategory = (e) => {
    const highLevelCategory = e.target.value.split("/")[0];
    const highLevelCategoryAllData = categories.find(
      (cat) => cat.name === highLevelCategory
    );
    if (highLevelCategoryAllData && highLevelCategoryAllData.attrs) {
      setAttributesFromDb(highLevelCategoryAllData.attrs);
    } else {
      setAttributesFromDb([]);
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
          <h3>EditProduct</h3>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicProductName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                required
                type="text"
                name="name"
                defaultValue={product.name}
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
              name="description"
              required
              as="textarea"
              rows={2}
              defaultValue={product.description}
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="form.ProductCountInStockTextArea"
          >
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control
              name="count"
              required
              type="number"
              defaultValue={product.count}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="form.ProductPriceTextArea">
            <Form.Label>Price</Form.Label>
            <Form.Control
              name="price"
              required
              type="text"
              defaultValue={product.price}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="form.ProductCategoryTextArea">
            <Form.Label>
              Category
              <CloseButton />(<small>remove select</small>)
            </Form.Label>
            <Form.Select
              required
              name="category"
              aria-label="Default select example"
              onChange={changeCategory}
            >
              <option value="">Choose Category</option>
              {categories.map((category, idx) => {
                return product.category === category.name ? (
                  <option selected key={idx} value={category.name}>
                    {category.name}
                  </option>
                ) : (
                  <option key={idx} value={category.name}>
                    {category.name}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>

          {attributesFromDb.length > 0 && (
            <Row className="mt-5">
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicAttributes">
                  <Form.Label>Choose Attribute and set value</Form.Label>
                  <Form.Select
                    name="atrrKey"
                    aria-label="Default select example"
                    ref={attrKey}
                    onChange={setValuesForAttrFromDbSelectForm}
                  >
                    <option>Choose Attribute</option>
                    {attributesFromDb.map((item, idx) => (
                      <Fragment key={idx}>
                        <option value={item.key}>{item.key}</option>
                      </Fragment>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group
                  className="mb-3"
                  controlId="formBasicAttributeValue"
                >
                  <Form.Label>Attribute value</Form.Label>
                  <Form.Select
                    name="atrrValue"
                    aria-label="Default select example"
                    ref={attrVal}
                  >
                    <option>Choose Attribute Value</option>
                    <option value="red">Red</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          )}

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
              {product.images &&
                product.images.map((image, idx) => (
                  <Col key={idx} style={{ position: "relative" }} xs={3}>
                    <Image
                      crossOrigin="anonymous"
                      src={image.path ?? null}
                      fluid
                    />
                    <i style={onHover} className="bi bi-x text-danger"></i>
                  </Col>
                ))}
            </Row>

            <Form.Control required type="file" multiple />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            style={{ marginBottom: "12vh" }}
            onClick={updateProductApiRequest}
          >
            Update
          </Button>
          {updateProductResponseState.error ?? ""}
        </Col>
      </Row>
    </Container>
  );
};

export default AdminEditProductPageComponent;
