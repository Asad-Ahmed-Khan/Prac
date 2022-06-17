import React, { useEffect } from "react";
import { Switch, Route, useHistory, useRouteMatch } from "react-router-dom";

import Login from "./Login";
import { auth, fire } from "../Config/config";
import { toast } from "react-toastify";
import Register from "./Register";
import Home from "./Dashboard/Home";
import { useDispatch, useSelector } from "react-redux";
import Dashboard from "./Dashboard";
import AddPost from "./Dashboard/AddPost";
// import Navbar from "./Navbar";
import Posts from "./Dashboard/Posts";
import SeePost from "./Dashboard/SeePost";
import EditPost from "./Dashboard/EditPost";
import Navbar from "./Dashboard/Navbar";
import OrderList from "./Dashboard/OrderList";

const Admin = () => {
  const history = useHistory();
  let { path } = useRouteMatch();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        if (!isLoggedIn) dispatch({ type: "SET_USER", payload: user });
        if (window.location.pathname === "/admin")
          history.push("/admin/dashboard");
        history.push(window.location.pathname);
      } else {
        history.push("/admin/login");
      }
    });
  }, [dispatch]);

  // login user
  const loginUser = (email, password) => {
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        dispatch({ type: "SET_USER", payload: user });
        toast.success("Successfully Logged In");
        history.push("/admin/dashboard");
      })
      .catch((err) => {
        if (err.code === "auth/user-not-found") {
          return toast.error("Invalid Email or Password");
        }
        if (err.code === "auth/invalid-email") {
          return toast.error("Please enter valid email");
        }
      });
  };

  // register user
  const registerUser = ({ name, email, password, confirmPassword }) => {
    if (!name || !email || !password || !confirmPassword) {
      return toast.warning("Please fill in all fields!!");
    }

    if (password !== confirmPassword) {
      return toast.warning("Passwords donot match!");
    }

    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        const currentUser = fire.auth().currentUser;
        currentUser.updateProfile({
          displayName: name,
        });
        dispatch({ type: "SET_USER", payload: currentUser });
        history.push("/admin/dashboard");
      })
      .catch((err) => {
        if (err.code === "auth/email-already-in-use") {
          toast.error("User already exists");
        }
      });
  };
  console.log('msla')
  return (
    <>
      {/* <Navbar /> */}

      <Switch>
      
        <Route path={`${path}/login`}>
          <Login loginUser={loginUser} />
        </Route>
        <Route path={`${path}/register`}>
          <Register registerUser={registerUser} />
        </Route>
        <Route path={`${path}/dashboard`}>
          <Dashboard />
        </Route>
        <Route exact path={path} component={() => <Home />} />
        <Route exact path={`${path}/addPost`} component={() => <AddPost />} />
        <Route exact path={`${path}/posts`} component={() => <Posts />} />
        <Route exact path={`${path}/orders`} component={() => <OrderList /> } />
        <Route exact path={`${path}/post/:id`} component={() => <SeePost />} />
        <Route exact path={`${path}/post/:id/edit`} component={() => <EditPost />} />
      </Switch>
    </>
  );
};

export default Admin;