import { useState, useEffect } from 'react';
import Navbar from "./Navbar";
import Loader from './Loader';


export default function ViewRecipe({ id }) {
    const [recipe, setRecipe] = useState(null);

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


    return (
        <div>
            {
                recipe === null ? <Loader />
                :
                <div>
        
                    <div className="flex">
                        <div className="text-center text-3xl font-bold m-auto">
                            {recipe.title}
                            <img src={recipe.image} className="m-auto" />
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
                                <div>
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