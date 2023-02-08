import { Button, Card } from "react-bootstrap";
import { RatingView } from "react-simple-star-rating";


const ProductForListComponent = ({images, idx}) => {
    return (
    <>
        {console.log(idx)}
        <Card style={{marginTop: "30px", marginBottom: "50px"}}>
            <Card.Img varaint="top" src={`/images/category-${idx + 1}.jpg`} style={{maxHeight: "300px"}} ></Card.Img>
            <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                    Some quick example text to imitate card's content 
                </Card.Text>
                <Button variant="primary">Go To</Button>
            </Card.Body>
            </Card>
            </>
    )
}

export default ProductForListComponent;