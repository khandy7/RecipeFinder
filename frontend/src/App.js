import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from "./components/Home";
import Friends from "./components/Friends";
import MyRecipes from "./components/MyRecipes";
import FindRecipes from "./components/FindRecipes";
import Login from "./components/Login";
import Register from "./components/Register";
import NotFound from "./components/NotFound";
import ViewMyRecipe from "./components/ViewMyRecipe";
import ViewFriend from "./components/ViewFriend";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          
          <Route exact path="/">
            <Home/>
          </Route>

          <Route path="/friends">
            <Friends/>
          </Route>

          <Route path="/myrecipes">
            <MyRecipes/>
          </Route>

          <Route path="/findrecipes">
            <FindRecipes/>
          </Route>

          <Route path="/login">
            <Login/>
          </Route>

          <Route path="/register">
            <Register/>
          </Route>

          <Route path="/viewRecipe/:id"
          render={(props) => (
            <ViewMyRecipe {...props} />
          )} >
          </Route>

          <Route path="/viewFriend/:username"
          render={(props) => (
            <ViewFriend {...props} />
          )} >
          </Route>

          <Route>
            <NotFound/>
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
