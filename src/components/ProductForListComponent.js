import { Button, Card } from "react-bootstrap";


const ProductForListComponent = ({images, idx}) => {
    return (
    <div>
        {console.log(idx)}
            <Card style={{ marginTop: "10px", marginBottom: "10px", maxHeight: "180px" }} >
            <Card.Img varaint="top" src={`/images/category-${idx + 1}.jpg`} style={{maxHeight: "50px", maxWidth: "100px"}} ></Card.Img>
            <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                    Some quick example text to imitate card's content 
                </Card.Text>
                    <Button variant="primary">Go To</Button>
            </Card.Body>
            </Card>
            </div>
    )
}

export default ProductForListComponent;