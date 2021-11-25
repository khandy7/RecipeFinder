import { useState, useEffect } from 'react';
import Navbar from "./Navbar";
import Loader from './Loader';
import ViewRecipe from "./ViewRecipe";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

  export default function FindRecipes() {
    //const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [activeSearch, setActiveSearch] = useState("virtual pantry")
    const [virtualPantryClasses, setvirtualPantryClasses] = useState("text-red-400 font-bold");
    const [cuisineClasses, setCuisineClasses] = useState("text-gray-500");
    const [cuisineSearch, setCuisineSearch] = useState("All Cuisines")
    const [pantrySearchRank, setPantrySearchRank] = useState("Maximize Used Ingredients")
    const [cuisineFoundRecipes, setCuisineFoundRecipes] = useState(null);
    const [pantryFoundRecipes, setPantryFoundRecipes] = useState(null);
    const [pantry, setPantry] = useState(null);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [error, setError] = useState(null)
    const [offset, setOffset] = useState(null)

    const cuisines = ["All Cuisines", "African", "American", "British", "Cajun", "Caribbean", "Chinese", "Eastern European",
    "European", "French", "German", "Greek", "Indian", "Irish", "Italian", "Japanese", "Jewish", "Korean",
    "Latin American", "Mediterranean", "Mexican", "Middle Eastern", "Nordic", "Southern", "Spanish", "Thai", "Vietnamese"]

    const pantryRanks = ["Maximize Used Ingredients", "Minimize Missing Ingredients"]

    const active = "text-red-400 font-bold"
    const notActive = "text-gray-500"

    //if User exists grab it, if not redirect to login page
    useEffect(() => {
       fetch("/api/v1/user")
       .then(res => res.json())
       .then(res => {
         if (res.data === "No user") {
           window.location.href = "/login";
         } else {
          //setUser(res)
          setPantry(res.pantry)
          setOffset(0)
          setLoading(false)
         }
       })
   }, [])

   function SelectRecipe(id) {
     setSelectedRecipe(id)
   }

    const onChangeSearchCuisine = e => {
      const searchCuisine = e.target.value;
      setCuisineSearch(searchCuisine);
      setOffset(0);
    };

    //change search options between virtual pantry and cuisine type
    function changeSearch() {
      if (activeSearch === "virtual pantry") {
        //change to by cuisine
        setActiveSearch("cuisine");
        setvirtualPantryClasses(notActive);
        setCuisineClasses(active)
      } else {
        //change to virtual pantry
        setActiveSearch("virtual pantry");
        setvirtualPantryClasses(active);
        setCuisineClasses(notActive)
      }
   }


   //changes dropdown for pantry rank
   const onChangePantryRank = e => {
     const newRank = e.target.value;
     setPantrySearchRank(newRank);
   }

  //makes api call to backend to perform actual search for cuisine
   function PerformCusineSearch() {
     setError(null)
     fetch("/api/v1/findRecipes/cuisineSearch", {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
           "cuisine": cuisineSearch,
           "offset" : offset,
      })
    })
     .then(res => res.json())
     .then(res => {
      if (res.data.name === "Error") {
        setError("API ERROR, TRY AGAIN TOMORROW")
      } else{
        setOffset(offset+12)
        setCuisineFoundRecipes(res.data.results)
      }
     })
   }

   function PerformPantrySearch() {
    const ranking = (pantrySearchRank === "Maximize Used Ingredients" ? 1 : 2)
    setError(null)
    fetch("/api/v1/findRecipes/pantrySearch", {
     method: 'POST',
     headers: {'Content-Type':'application/json'},
     body: JSON.stringify({
          "pantry": pantry,
          "rank" : ranking,
     })
   })
    .then(res => res.json())
    .then(res => {
      if (res.data.name === "Error") {
        setError("API ERROR, TRY AGAIN TOMORROW")
      } else{
        setPantryFoundRecipes(res.data) 
      }
    })
  }

    //UI for searching by cuisine
   const SearchByCuisine = () => {
     return(
        <div>
          <div className="flex items-center justify-center mb-4">
              <select className="p-2 mt-4 mr-16 border border-black" value={cuisineSearch} onChange={onChangeSearchCuisine}>
              {cuisines.map(cuisine => {
                return (
                  <option value={cuisine} key={cuisine}> {cuisine.substr(0, 20)} </option>
                )
              })}
           </select>
           <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded mt-3"
            onClick={PerformCusineSearch}
             >
            Search
            </button>
          </div>
        <div className="flex grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {
            error === null ? null
            :
            <div>
              {error}
            </div>
          }
          {
            cuisineFoundRecipes === null ? null : cuisineFoundRecipes.length === 0 ? <div>No more recipes match this cuisine</div>
            :
            cuisineFoundRecipes.map(recipe => {
              return (
                <div key={recipe.id} className="border-2 text-center m-auto cursor-pointer" onClick={() => SelectRecipe(recipe.id)}>
                  <img alt={"Image of " + recipe.title} src={recipe.image} className="" />
                  {recipe.title.length > 30 ? recipe.title.substr(0,30) + "..." : recipe.title}
                </div>
              );
            })
          }
        </div>
      </div>
     )
    }



     const SearchByPantry = () => {
       return(
         <div>
           <div className="flex items-center justify-center mb-4 mr-1">
           <select className="p-2 mt-4 mr-4 border border-black" value={pantrySearchRank} onChange={onChangePantryRank}>
                {pantryRanks.map(rank => {
                return (
                  <option value={rank} key={rank}> {rank} </option>
                )
              })}
             </select>
           <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded mt-3"
            onClick={PerformPantrySearch}
          >
            Search
          </button>
           </div>
              {
                error === null ? null
                :
                <div>
                  {error}
                </div>
              }
              {
                pantryFoundRecipes === null ? null : pantryFoundRecipes.length === 0 ? <div className="mt-10">No more recipes work with your pantry</div>
                :
                <div className="flex grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {pantryFoundRecipes.map(recipe => {
                    return (
                      <div key={recipe.id} className="border-2 text-center m-auto cursor-pointer" onClick={() => SelectRecipe(recipe.id)}>
                        <img alt={"Image of " + recipe.title} src={recipe.image} className="" />
                        {recipe.title.length > 30 ? recipe.title.substr(0,30) + "..." : recipe.title}
                      </div>
                    );
                  })}
                </div>
              }
           
         </div>
       );
     }

      return (
        <>
        <Navbar/>
        {
          loading ? <Loader/>
          :
          <div>
              {
              selectedRecipe === null ?
            <div className="flex">
              <div className="m-auto">
                <h1 className="text-4xl text-center mb-4">Find Recipes</h1>

                <div className="text-center">
                  <button className={virtualPantryClasses + " mr-8"} onClick={changeSearch}>Search by Virtual Pantry</button>
                  <button className={cuisineClasses} onClick={changeSearch}>Search by Cuisine</button>
                </div>

                {
                  activeSearch === "virtual pantry" ?
                  <SearchByPantry/>
                  :
                  <SearchByCuisine/>
                }

              </div>
           </div>
         :
         <div className="">
           <FontAwesomeIcon className="ml-8 text-5xl font-bold cursor-pointer" icon={faArrowLeft} onClick={()=> SelectRecipe(null)} />
           <ViewRecipe id={selectedRecipe}/>
         </div>
          }
        </div>
        }
        </>
      );
  }