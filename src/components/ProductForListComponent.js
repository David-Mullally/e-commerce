import { Button, Card } from "react-bootstrap";
import { RatingView } from "react-simple-star-rating";


const ProductForListComponent = () => {
    return (
        <Card style={{ width: "18rem" }}>
            <Card.Img varaint="top" src="https://www.sky.de/static/img/serien/sky_23-01_the-last-of-us_hero_s.jpg" ></Card.Img>
            <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                    Some quick example textto imitate card's content 
                </Card.Text>
                <Button variant="primary">Go To</Button>
            </Card.Body>
        </Card>
    )
}

export default ProductForListComponent;