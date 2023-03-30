import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PagesContainer from "./PagesContainer";
import SignIn from "./SignIn";
import Home from "./Home";
import SelectedPost from "./SelectedPost";
import Success from "./Success";
import SignUp from "./SignUp";
import RegistrationConfirmation from "./RegistrationConfirmation";

export enum RoutesList {
  Home = "/",
  SelectedPost = "/blog/:id",
  Search = "/blog/search",
  AddPost = "/blog/add",
  SignIn = "/blog/sign-in",
  SignUp = "/blog/sing-up",
  Confirm = "/blog/sign-in/confirm",
  Success = "/blog/sign-up/success",
  Default = '*',
}
const Router = () => {
  const isLoggedIn = false;
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RoutesList.Home} element={<PagesContainer />}>
          <Route path={RoutesList.Home} element={<Home />} />
          <Route
            path={RoutesList.AddPost}
            element={
              isLoggedIn ? <Home /> : <Navigate to={RoutesList.SignIn} />
            }
          />
          <Route path={RoutesList.SelectedPost} element={<SelectedPost />} />
          <Route path={RoutesList.SignIn} element={<SignIn />} />
          <Route path={RoutesList.SignUp} element={<SignUp />} />
          <Route
            path={RoutesList.Confirm}
            element={<RegistrationConfirmation />}
          />
          <Route path={RoutesList.Success} element={<Success />} />
          <Route path={RoutesList.Default} element={<div>PAGE 404</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
