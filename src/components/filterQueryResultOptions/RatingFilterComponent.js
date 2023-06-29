import { Fragment } from "react";
import { Form } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";

const RatingFilterComponent = ({setRatingsFromFilter}) => {
  return (
    <>
      <span className="fw-bold">Rating</span>
      {Array.from({ length: 5 }).map((_, index) => {
        return (
            <Fragment key={index}>
              <Form.Check type="checkbox" id={`check-api-${index}`}>
                <Form.Check.Input onChange={(e)=> setRatingsFromFilter((items)=>{return {...items, [5-idx]:e.target.checked}})} type="checkbox" isValid />
                <Form.Check.Label style={{ cursor: "pointer" }}>
                  <Rating readonly size={20} initialValue={5 - index} />
                </Form.Check.Label>
              </Form.Check> 
            </Fragment>
        );
      })}
    </>
  );
};

export default RatingFilterComponent;
