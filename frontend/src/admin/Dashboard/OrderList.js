import React, { useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deliverOrder, getAllOrders } from "../../redux/actionCreators/postsActionCreator";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../../Loader";
import Error from "../../Error";

const OrderList = () => {


  const allOrdersState = useSelector((state) => state.allUserOrdersReducer);
  const { loading, orders, error } = allOrdersState

  const dispatch = useDispatch();
  useLayoutEffect(() => {
    if(!loading){
    dispatch(getAllOrders());}
  }, []);
  return (
    <div>
      <div className="col-md-12  text-right" style={{ marginTop: "10px" }}>
        <Link to="/admin/dashboard" className="btn btn-dark mr-2">
          Go Back
        </Link>
      </div>
      <h1>Order Lists</h1>
      {loading && <Loader />}
      {error && <Error error="Admin Order req fail" />}
      {!loading ? <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order Id</th>
            <th>Customer Names</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Address</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {console.log('orders all', typeof orders, orders, orders?.length)}

          {orders && orders?.length &&
            orders.map((order) => (
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>{order.BuyerName}</td>
                <td>{order.BuyerEmail}</td>
                <td>{order.BuyerCell}</td>
                <td>{order.BuyerQuantity}</td>
                <td>{order.BuyerPayment}</td>
                <td>{order.BuyerAddress}</td>

                <td>
                  {" "}
                  {order.isDeliverd ? (
                    <h6 className="text-success">Deliverd</h6>
                  ) : (
                    <>
                      <Button
                        className="btn-danger"
                        onClick={() => {
                          dispatch(deliverOrder(order.orderId));
                        }}
                      >
                        Deliver
                      </Button>
                    </>
                  )}{" "}
                </td>
              </tr>
            ))}
        </tbody>
      </Table> : null}
    </div>
  );
};

export default OrderList;