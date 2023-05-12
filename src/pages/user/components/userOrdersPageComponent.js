import { Col, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const UserOrdersPageComponent = ({ getOrders }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders()
      .then((orders) => setOrders(orders))
      .catch((er) => console.log(er));
  }, []);

  getOrders().then((orders) => console.log("orders::", orders));
  return (
    <Row className="m-5">
      <Col md={12}>
        <h1>My Orders</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Date</th>
              <th>Total</th>
              <th>Delivered</th>
              <th>Order Details</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => {
              return (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>You</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.orderTotal.cartSubtotal}</td>
                  <td>
                    {order.orderIsDelivered ? (
                      <i className="bi bi-check-lg test-success"></i>
                    ) : (
                      <i className="bi bi-x-lg test-danger"> </i>
                    )}
                  </td>
                  <td>
                    <Link to={`/user/order-details/${order._id}`}>Go To Order</Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default UserOrdersPageComponent;
