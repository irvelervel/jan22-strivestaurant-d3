import { ListGroup } from "react-bootstrap";

const DishComments = (props) => {
  return (
    <ListGroup>
      {props.dish ? (
        props.dish.comments.map((review) => (
          <ListGroup.Item key={review.id}>
            {review.rating} - {review.comment}
          </ListGroup.Item>
        ))
      ) : (
        <ListGroup.Item>Click on a dish to see the reviews</ListGroup.Item>
      )}
    </ListGroup>
  );
};

export default DishComments;
