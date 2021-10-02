import { useState, useEffect } from 'react';
import Navbar from "./Navbar";
import Loader from './Loader';

  export default function FindRecipes() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [activeSearch, setActiveSearch] = useState("virtual pantry")
    const [virtualPantryClasses, setvirtualPantryClasses] = useState("text-red-500 font-bold");
    const [cuisineClasses, setCuisineClasses] = useState("text-gray-500");
    const [cuisineSearch, setCuisineSearch] = useState("All Cuisines")

    const cuisines = ["All Cuisines", "African", "American", "British", "Cajun", "Caribbean", "Chinese", "Eastern European",
    "European", "French", "German", "Greek", "Indian", "Irish", "Italian", "Japanese", "Jewish", "Korean",
    "Latin American", "Mediterranean", "Mexican", "Middle Eastern", "Nordic", "Southern", "Spanish", "Thai", "Vietnamese"]

    //if User exists grab it, if not redirect to login page
    useEffect(() => {
       fetch("/api/v1/user")
       .then(res => res.json())
       .then(res => {
         if (res.data === "No user") {
           window.location.href = "/login";
         } else {
          setUser(res.username)
          setLoading(false)
         }
       })
   }, []) 


   const onChangeSearchCuisine = e => {
    const searchCuisine = e.target.value;
    setCuisineSearch(searchCuisine);
  };

    //change search options between virtual pantry and cuisine type
    function changeSearch() {
      if (activeSearch === "virtual pantry") {
        //change to by cuisine
        setActiveSearch("cuisine");
        setvirtualPantryClasses("text-gray-500");
        setCuisineClasses("text-red-500 font-bold")
      } else {
        //change to virtual pantry
        setActiveSearch("virtual pantry");
        setvirtualPantryClasses("text-red-500 font-bold");
        setCuisineClasses("text-gray-500")
      }
   }

      return (
        <>
        <Navbar/>
        {
          loading ? <Loader/>
          :
          <div className="flex">
            <div className="m-auto">
              <h1 className="text-4xl text-center mb-4">Find Recipes</h1>

              <div className="grid grid-cols-2 gap-2 text-center">
                <button className={virtualPantryClasses} onClick={changeSearch}>Search by Virtual Pantry</button>
                <button className={cuisineClasses} onClick={changeSearch}>Search by Cuisine</button>
              </div>

              {
                activeSearch === "virtual pantry" ?
                <div>
                  VP SEARCH
                </div>
                :
                <div>
                  <select onChange={onChangeSearchCuisine}>
                    {cuisines.map(cuisine => {
                      return (
                        <option value={cuisine}> {cuisine.substr(0, 20)} </option>
                      )
                    })}
                 </select>
                </div>
              }

            </div>
         </div>
        }
        </>
      );
  }