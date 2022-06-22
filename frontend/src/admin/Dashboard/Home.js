import React, { useState ,useEffect  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../../Loader";
import OrderList from "./OrderList";
import { getPosts } from "../../redux/actionCreators/postsActionCreator";


const Home = () => {
  const [loading, setLoading] = useState(false);
useEffect(() =>{
  setLoading(true)
  setTimeout(() =>{
  setLoading(false)
  }, 2000 )
  dispatch(getPosts());
}, [])

const dispatch = useDispatch();

  return (
   
    <div className="container-fluid">
     
      <div className="row">
      { loading ? (
           <Loader />
       ) :
      loading !== 100 ? (
      <div className="col-md-12  text-right" style={{marginTop: "10px"}}>
          <Link to="/admin/dashboard" className="btn btn-dark mr-2">
            Go Back
          </Link>
          <h1 className="display-3 text-dark text-center"><b>Admin Dashboard</b></h1>
        </div>
      ) : (
        <div className="col-md-12">
        <h1 className="display-3 text-dark text-center"><b>Admin Dashboard</b></h1>
          {/* <h1 className="text-center my-3">Dashboard Home</h1> */}
          {/* <OrderList /> */}
        </div>)} 

      </div>
      
    </div>
  );
};

export default Home;
