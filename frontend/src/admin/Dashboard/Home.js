import React from "react";
import { Link } from "react-router-dom";
import OrderList from "./OrderList";

const Home = () => {
  return (
    <div className="container-fluid">
      <div className="row">
      <div className="col-md-12  text-right" style={{marginTop: "10px"}}>
          <Link to="/admin/dashboard" className="btn btn-dark mr-2">
            Go Back
          </Link>
        </div>
        <div className="col-md-12">
        <h1 className="display-3 text-dark text-center"><b>Admin Dashboard</b></h1>
          {/* <h1 className="text-center my-3">Dashboard Home</h1> */}
          {/* <OrderList /> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
