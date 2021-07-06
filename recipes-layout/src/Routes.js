import React from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Header from "./Components/Header";
import Login from "./Components/Auth/Login";
import Home from "./Components/Home";
import { UserStorage } from "./Components/Context/AuthContext";
import CreateUser from "./Components/Auth/CreateUser";
import CreateRecipe from "./Components/Recipes/CreateRecipe";


const Routes = () => {
  return (
    <div>
      
      <Router>
        <UserStorage>
        <Header />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={CreateUser} />
          <Route exact path="/receitas" component={Home} />
          <Route path="/receitas/criar" component={CreateRecipe} />
        </Switch>
        </UserStorage>
      </Router>
    </div>
  );
};

export default Routes;
