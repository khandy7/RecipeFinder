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
import Profile from "./components/Profile";
import Register from "./components/Register";
import NotFound from "./components/NotFound";
import ViewMyRecipe from "./components/ViewMyRecipe";

/*  
This works to launch new page to view recipe by id
it works but not sure its what i need, doing it this way will
remove all of the searched recipes from the state, making the user have to search again
I think itll be better to have a popup window with the recipe search page 
          <Route path="/viewRecipe/:id"
          render={(props) => (
            <ViewRecipe {...props} />
          )} >
          </Route>
*/

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

          <Route path="/profile">
            <Profile/>
          </Route>

          <Route path="/viewRecipe/:id"
          render={(props) => (
            <ViewMyRecipe {...props} />
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
