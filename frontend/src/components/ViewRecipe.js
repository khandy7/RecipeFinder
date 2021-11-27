import { useState, useEffect } from 'react';
import Loader from './Loader';


export default function ViewRecipe({ id, missing, used }) {
    const [recipe, setRecipe] = useState(null);
    const [selected, setSelected] = useState(null);
    //const [user, setUser] = useState(null);
    const [userRecipes, setUserRecipes] = useState(null);

    useEffect(() => {
        fetch("/api/v1/user")
        .then(res => res.json())
        .then(res => {
          if (res.data === "No user") {
            window.location.href = "/login";
          } else {
           //setUser(res)
           setUserRecipes(res.recipes)
           
           var found = false
           for (let i = 0; i < res.recipes.length; i++) {
               if (res.recipes[i][0] === String(id)) {
                   found = true
               }
           }
           if (found) {
               setSelected(true)
           } else {
               setSelected(false)
           }

          }
        })
    }, [])

    useEffect(() => {
        //fetch recipe here based on id
        fetch("/api/v1/findRecipes/getRecipeInfo", {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
             "id": id,
        })
        })
        .then(res => res.json())
        .then(res => {
            setRecipe(res.data)
        })
    }, [])


    function handleChange() {
        var temp = userRecipes
        var found = false
        var idx = -1
        for (let i = 0; i < temp.length; i++) {
            if (temp[i][0] === String(id)) {
                found = true
                idx = i
            }
        }

        if (found) {
            temp.splice(idx, 1);
            //console.log(temp)
        } else {
            temp.push([String(id), recipe.title, recipe.image, null])
            //console.log(temp)
        }



        fetch('/api/v1/user/updateRecipes', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                 "recipes": temp,
            })
          })
          .then(res => res.json())
          .then(res => {
            if (res.data === "Error") {
              console.log("ERROR: Server error occured")
            } else{
                setUserRecipes(temp)
                setSelected(!selected)
            }
          })
          .catch((error) => {
            console.log("FAILED POST")
            //console.log(error)
          });
    }



    return (
        <div>
            {
                recipe === null ? <Loader />
                :
                <div>
        
                    <div className="flex">
                        <div className="text-center text-3xl font-bold m-auto">
                            {recipe.title}
                            {
                                selected === null ? null : selected === false 
                                ? 
                                <div 
                                className="text-xl text-red-500 m-auto border border-4 border-red-500 mb-2 mt-2 cursor-pointer"
                                onClick={() => handleChange()}
                                > ADD RECIPE</div>
                                :
                                <div 
                                className="text-xl text-blue-500 m-auto border border-4 border-blue-500 mb-2 mt-2 cursor-pointer"
                                onClick={() => handleChange()}
                                > REMOVE RECIPE</div>
                            }
                            <img alt={"Image of " + recipe.title} src={recipe.image} className="m-auto" />
                        </div>
                    </div>
                    {
                        missing === null ? null :
                        <div className="text-center p-6">
                            <p className="font-bold m-auto">Missing Ingredients: <span className="font-normal">{missing.length}</span></p>
                            <p className="font-bold m-auto">Ingredients in Pantry: <span className="font-normal">{used.length}</span></p>
                        </div>
                    }
                    <div className="text-center mt-6 ">
                        <div className=" border border-black border-4 p-2 m-2 rounded">
                            <span className="font-bold text-xl">INGREDIENTS</span>
                        {recipe.extendedIngredients == null ? 
                            <div>Cannot find ingredients</div>    
                            :
                            <ul className="sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-4">
                                {recipe.extendedIngredients.map(ing => {
                                    return (
                                        <li className="mb-2">
                                            <span className="underline">{ing.name}:</span> {ing.amount} {ing.unit}
                                        </li>
                                    )
                                })}
                            </ul>
                        }
                        </div>

                        <div className="p-4">
                        <span className="font-bold text-xl">INSTRUCTIONS</span>
                        {recipe.analyzedInstructions[0] == null ? 
                        <div>No instructions found</div> 
                        : 
                            <div>
                            {recipe.analyzedInstructions[0].steps.map(step => {
                                return (
                                    <div className="mb-4" key={step.number}>
                                        <span className="font-bold">{step.number}.</span>  {step.step}
                                    </div>
                                )
                            })}
                            </div>
                        }
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}