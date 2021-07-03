import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Header from "./Components/Header";
import Login from "./Components/Auth/Login";

const Routes = () => {
  return (
    <div>
        <Header/>
      <BrowserRouter>
        <Switch>
            <Route path="/login" component={Login}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Routes;
