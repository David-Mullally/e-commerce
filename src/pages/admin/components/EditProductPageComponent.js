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
import { changeCategory, setValuesForAttrFromDbSelectForm } from "./utils/utils";

const AdminEditProductPageComponent = ({
  categories,
  fetchProduct,
  updateProductApiRequest,
  reduxDispatch,
  saveAttributeToCatDoc,
  imageDeleteHandler,
  uploadHandler,
  uploadImagesAPIRequest,
  uploadImagesCloudinaryAPIRequest,
}) => {
  const [validated, setValidated] = useState(false);
  const [product, setProduct] = useState({});
  const [updateProductResponseState, setupdateProductResponseState] = useState({
    message: "",
    error: "",
  });
  const [attributesFromDb, setAttributesFromDb] = useState([]); //For select lists
  const [attributesTable, setAttributesTable] = useState([]); // For HTML Table
  const [categoryChosen, setCategoryChosen] = useState("Choose category");
  const [newAttrKey, setNewAttrKey] = useState(false);
  const [newAttrValue, setNewAttrValue] = useState(false);
  const [imageRemoved, setImageRemoved] = useState(false);
  const [isUploading, setIsUploading] = useState("");
  const [imageUploaded, setImageUploaded] = useState(false);

  const attrVal = useRef(null);
  const attrKey = useRef(null);
  const createNewAttrKey = useRef(null);
  const createNewAttrValue = useRef(null);

  const { id } = useParams();

  console.log("product", id);
  const navigate = useNavigate();
  useEffect(() => {
    fetchProduct(id)
      .then((product) => {
        console.log(product);
        setProduct(product);
      })
      .catch((er) => console.log(er));
  }, [id, imageRemoved, imageUploaded]);

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
      attributesTable: attributesTable,
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
    setAttributesTable(product.attrs);
    setCategoryChosen(product.category);
  }, [product]);

  const attributeValueSelected = (e) => {
    if (e.target.value !== " Choose Attribute Value") {
      setAttributesTableWrapper(attrKey.current.value, e.target.value);
    }
  };

  const setAttributesTableWrapper = (key, val) => {
    setAttributesTable((attr) => {
      if (attr.length !== 0) {
        var keyExistsInOldTable = false;
        let modifiedTable = attr.map((item) => {
          if (item.key === key) {
            keyExistsInOldTable = true;
            item.val = val;
            return item;
          } else {
            return item;
          }
        });
        if (keyExistsInOldTable) return [...modifiedTable];
        else return [...modifiedTable, { key: key, value: val }];
      } else {
        return [{ key: key, value: val }];
      }
    });
  };

  const deleteAttribute = (key) => {
    setAttributesTable((table) => table.filter((item) => item.key !== key));
  };

  const checkKeyDown = (e) => {
    if (e.code === "Enter") e.preventDefault();
  };

  const newAttrKeyHandler = (e) => {
    e.preventDefault();
    setNewAttrKey(e.target.value);
    setNewAttributeManually(e);
  };

  const newAttrValueHandler = (e) => {
    e.preventDefault();
    setNewAttrValue(e.target.value);
    setNewAttributeManually(e);
  };

  const setNewAttributeManually = (e) => {
    if (e.keyCode && e.keycode === 13) {
      if (newAttrKey && newAttrValue) {
        reduxDispatch(
          saveAttributeToCatDoc(newAttrKey, newAttrValue, categoryChosen)
        );
        setAttributesTableWrapper(newAttrKey, newAttrValue);
        e.target.value = "";
        createNewAttrKey.current.value = "";
        createNewAttrValue.current.value = "";
        setNewAttrKey(false);
        setNewAttrValue(false);
      }
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
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            onKeyDown={(e) => checkKeyDown(e)}
          >
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
              onChange={(e) =>
                changeCategory(
                  e,
                  categories,
                  setAttributesFromDb,
                  setCategoryChosen
                )
              }
            >
              <option value="Choose category">Choose Category</option>
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
                    onChange={(e)=>setValuesForAttrFromDbSelectForm(e, attrVal, attributesFromDb)}
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
                    onChange={attributeValueSelected}
                  >
                    <option>Choose Attribute Value</option>
                    <option value="red">Red</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          )}

          <Row>
            {attributesTable && attributesTable.length > 0 && (
              <Table hover>
                <thead>
                  <tr>
                    <th>Attribute</th>
                    <th>Value</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {attributesTable.map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.key}</td>
                      <td>{item.value}</td>
                      <td>
                        <CloseButton
                          onClick={() => deleteAttribute(item.key)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}

            <Row>
              <Col md={6}>
                <Form.Group
                  className="mb-3"
                  controlId="formBasicNewProductAttribute"
                >
                  <Form.Label>Create new product attribute</Form.Label>
                  <Form.Control
                    ref={createNewAttrKey}
                    disabled={categoryChosen === "Choose category"}
                    placeholder="first choose or create a category"
                    name="newAttrKey"
                    type="text"
                    onKeyUp={newAttrValueHandler}
                    required={newAttrValue}
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
                    ref={createNewAttrValue}
                    disabled={categoryChosen === "Choose category"}
                    placeholder="first choose or create a category"
                    name="newProductAttrValueValue"
                    type="text"
                    onKeyUp={newAttrKeyHandler}
                    required={newAttrKey}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Alert show={newAttrKey && newAttrValue} variant="primary">
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
                    <i
                      style={onHover}
                      onClick={() =>
                        imageDeleteHandler(image.path, id).then((data) =>
                          setImageRemoved(!imageRemoved)
                        )
                      }
                      className="bi bi-x text-danger"
                    ></i>
                  </Col>
                ))}
            </Row>

            <Form.Control
              required
              type="file"
              multiple
              onChange={(e) => {
                setIsUploading("Uploading files in progress...");
                if (process.env.NODE_ENV === "production") {
                  // to do : change to !==
                  uploadImagesAPIRequest(e.target.files, id)
                    .then((data) => {
                      setIsUploading("file upload completed");
                      setImageUploaded(!imageUploaded);
                    })
                    .catch((er) =>
                      setIsUploading(
                        er.response.data.message
                          ? er.response.data.message
                          : er.response.data
                      )
                    );
                } else {
                  uploadImagesCloudinaryAPIRequest(e.target.files, id);
                  setIsUploading(
                    "File upload completed. Please allow time for the change to take effect. Refresh if neccessary"
                  );
                  setTimeout(() => {
                    setImageUploaded(!imageUploaded);
                  }, 5000);
                }
              }}
            />
            {isUploading}
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
