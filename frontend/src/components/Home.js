import { useState, useEffect } from 'react';
import Navbar from "./Navbar";
import Loader from './Loader';

  export default function Home() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [ingredients, setIngredients] = useState(null)
    //array that will hold whether an ingredient should already be checked or not
    const [ingredientsState, setIngredientsState] = useState(null)

          useEffect(() => {
             fetch("/api/v1/user")
             .then(res => res.json())
             .then(res =>  {//setUser(res.username)
                if (res.data === "No user") {
                  window.location.href = "/login";
                } else {
                setUser(res.username)
                }
             })
         }, []) 

         useEffect(() => {
           fetch("/api/v1/ingredients/getAll")
           .then(res => res.json())
           .then(res => {
              setIngredients(res)
              setIngredientsState(new Array(res.length).fill(false))
              setLoading(false)
            })
         }, [])


         function GetIngs() {
           return ingredients.map((ing) => <li key={ing.apiID}>{ing.name}</li>);
         }
         
         //To make checkbox:
         //<input type="checkbox"/>Food

      return (
        <>
        <Navbar/>
        {
          loading ? <Loader/>
          :
          <div>
            <h1 className="text-4xl text-center mb-4">Virtual Pantry</h1>
          {
            ingredients == null ? null :
            <div>
            <ul><GetIngs/></ul>
            </div>
          }
          </div>
        }
        </>
      );
  }