import { useState, useEffect } from 'react';
import Loader from './Loader';
import Navbar from './Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

export default function ViewMyRecipe(props) {
    const [recipe, setRecipe] = useState(null);
    const [selected, setSelected] = useState(null);
    //const [user, setUser] = useState(null);
    const [userRecipes, setUserRecipes] = useState(null);
    const [rating, setRating] = useState(null);
    const [recipeIdx, setRecipeIdx] = useState(null);
    const [hover, setHover] = useState(0);
    
    const id = props.match.params.id

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
           var idx = -1
           for (let i = 0; i < res.recipes.length; i++) {
               if (res.recipes[i][0] === String(id)) {
                   found = true
                   idx = i
                   break
               }
           }
           if (found) {
               setSelected(true)
               setRating(res.recipes[idx][3])
               setRecipeIdx(idx)
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
              console.log(res.data)
            if (res.data === "Error") {
              console.log("ERROR: Server error occured")
            } else{
                console.log("IN HERE")
                setRating(null)
                setHover(null)
                setUserRecipes(temp)
                setSelected(!selected)
            }
          })
          .catch((error) => {
            console.log("FAILED POST")
            //console.log(error)
          });
    }


    function changeRating(r) {
        
        var curRecipes = userRecipes
        curRecipes[recipeIdx][3] = r

        fetch('/api/v1/user/updateRecipes', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                 "recipes": curRecipes,
            })
          })
          .then(res => res.json())
          .then(res => {
            if (res.data === "Error") {
              console.log("ERROR: Server error occured")
            } else{
                setRating(r);
                setHover(null)
                //console.log("IN HERE")
            }
          })
          .catch((error) => {
            console.log("FAILED POST")
            //console.log(error)
          });
    }


    return (
        <div>
            <Navbar/>
            {
                recipe === null ? <Loader />
                :
                <div>
                <Link to="/myrecipes">
                    <FontAwesomeIcon className="ml-8 text-5xl font-bold cursor-pointer" icon={faArrowLeft} />
                </Link>
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
                            {
                                !selected ? null 
                                :
                                <div className="star-rating text-center text-3xl">
                                {[...Array(5)].map((star, index) => {
                                    index += 1;
                                    return (
                                    <button
                                        type="button"
                                        key={index}
                                        className={index <= (hover || rating) ? "text-black" : "text-gray-300"}
                                        onClick={() => changeRating(index)}
                                        onMouseEnter={() => setHover(index)}
                                        onMouseLeave={() => setHover(rating)}
                                    >
                                        <span className="star">&#9733;</span>
                                    </button>
                                    );
                                })}
                                </div>
                            }
                            <img alt={"Image of " + recipe.title} src={recipe.image} className="m-auto" />
                            
                        </div>
                    </div>

                    <div className="text-center">
                        <span className="font-bold text-xl">INGREDIENTS</span>
                    {recipe.extendedIngredients == null ? 
                        <div>Cannot find ingredients</div>    
                        :
                        <div>
                            {recipe.extendedIngredients.map(ing => {
                                return (
                                    <div>
                                        {ing.name}: {ing.amount} {ing.unit}
                                    </div>
                                )
                            })}
                        </div>
                        }

                    <span className="font-bold text-xl">INSTRUCTIONS</span>
                    {recipe.analyzedInstructions[0] == null ? 
                    <div>No instructions found</div> 
                    : 
                        <div>
                        {recipe.analyzedInstructions[0].steps.map(step => {
                            return (
                                <div key={step.number}>
                                    <span className="font-bold">{step.number}.</span>  {step.step}
                                </div>
                            )
                        })}
                        </div>
                    }
                    </div>
                </div>
            }
        </div>
    );
}