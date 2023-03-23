import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PagesContainer from "./PagesContainer";
import SignIn from "./SignIn";
import Home from "./Home";
import SelectedPost from "./SelectedPost";
import Success from "./Success";
import SignUp from "./SignUp";
import RegistrationConfirmation from "./RegistrationConfirmation";
import Page404 from "./Page404";
import ResetPassword from "./ResetPassword";
import NewPassword from "./NewPassword";

export enum RoutesList {
  Home = "/",
  SelectedPost = "/blog/:id",
  Search = "/blog/search",
  AddPost = "/blog/add",
  SignIn = "/blog/sign-in",
  SignUp = "/blog/sing-up",
  Confirm = "/activate/:uid/:token",
  Success = "/blog/sign-up/success",
  ResetPassword = "/blog/sign-up/reset-password",
  NewPassword = "/blog/sign-up/new-password",
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
          <Route path={RoutesList.ResetPassword} element={<ResetPassword />} />
          <Route path={RoutesList.NewPassword} element={<NewPassword />} />
          <Route path={RoutesList.Default} element={<Page404/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
