import { useState, useEffect } from 'react';
import Navbar from "./Navbar";
import Loader from './Loader';
import {Link} from "react-router-dom"

  export default function MyRecipes() {
    //const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [recipes, setRecipes] = useState(null)

    useEffect(() => {
       fetch("/api/v1/user")
       .then(res => res.json())
       .then(res => {
         if (res.data === "No user") {
           window.location.href = "/login";
         } else {
          //setUser(res.username)
          setRecipes(res.recipes.reverse())
          setLoading(false)
         }
       })
   }, []) 


      return (
        <>
        <Navbar/>
        {
          loading ? <Loader/>
          :
          <div>
              <div className="flex">
              <div className="m-auto">
                <div className="text-4xl text-center mb-4">My Recipes</div>
                <div>
                  {
                    recipes.length === 0 ? <div>No recipes yet :(</div> :
                    <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3 p-4">
                      {recipes.map(recipe => {
                      return (
                        <div key={recipe[0]} className="text-center border border-black p-2 m-4">
                        <Link className="text-center m-auto cursor-pointer text-lg" to={"/viewRecipe/" + recipe[0]}>
                          <img alt={"Image of " + recipe[1]} src={recipe[2]} className="" />
                          {recipe[1].length > 30 ? recipe[1].substr(0,30) + "..." : recipe[1]}
                        </Link>
                        </div>
                      );
                    })}
                    </div>
                  }
                  </div>
              </div>
              </div>
         </div>
        }
        </>
      );
  }