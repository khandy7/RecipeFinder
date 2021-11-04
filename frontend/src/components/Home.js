import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { } from '@fortawesome/free-solid-svg-icons'
import { faSquare, faCheckCircle } from "@fortawesome/free-regular-svg-icons"
import Navbar from "./Navbar";
import Loader from './Loader';

  export default function Home() {
    //const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [ingredients, setIngredients] = useState(null)
    //array that will hold whether an ingredient should already be checked or not
    const [pantry, setPantry] = useState(null)
    const [pantryState, setPantryState] = useState(null)

    const chosen = "border-pink-300 bg-pink-300 font-bold "
    const notChosen = ""
    const base = " border border-2 cursor-pointer grid grid-cols-2"

          //gets all necessary data for the page
          useEffect(() => {
             fetch("/api/v1/user")
             .then(res => res.json())
             .then(function(res) {//setUser(res.username)
                if (res.data === "No user") {
                  window.location.href = "/login";
                } else {
                //setUser(res.username)
                setPantry(res.pantry)
                }
                return res.pantry
             })
             .then(function(pantry){
              fetch("/api/v1/ingredients/getAll")
              .then(res => res.json())
              .then(res => {
                 setIngredients(res)
                 const temp = new Array(res.length).fill(false)
                 //setPantryState(new Array(res.length).fill(false))
                 for (let i = 0; i < pantry.length; i++) {
                   res.map((item, index) => {
                     //console.log(item.name)
                     if (pantry.includes(item.name)) {
                       temp[index] = true;
                     }
                     return 0;
                   })
                 }
                 setPantryState(temp)
                 setLoading(false)
               })
              }
             )
         }, [])

        //handles adding/removing of ingredients from pantry
         function handleOnChange(name, pos) {
           const update = pantryState.map((item , index) => 
           index === pos ? !item : item
           );
           setPantryState(update)

           let temp = pantry
           const idx = temp.indexOf(name)
           if (idx > -1) {
             temp.splice(idx, 1)
           } else {
             temp.push(name)
           }
           setPantry(temp)
           //send update to mongo here
           fetch('/api/v1/user/updatePantry', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                 "pantry": temp
            })
          })
          .then(res => res.json())
          .then(res => () => {
            if (res.data === "Error") {
              console.log("ERROR: Server error occured")
            }
          })
          .catch((error) => {
            console.log("FAILED POST")
            console.log(error)
          });
         
         }

          //gets all ingredients to display for user
         function GetIngs() {
           return ingredients.map((i, index) => {
            return <li key={i.apiID}>
              <div className={pantryState[index] ? chosen + base : notChosen + base}
              onClick={() => handleOnChange(i.name, index)}
              >
                <FontAwesomeIcon className="ml-4 text-4xl md:text-4xl lg:text-5xl" icon={pantryState[index] ? faCheckCircle : faSquare} />
                <p className="text-lg lg:text-xl">{i.name}</p>
              </div>
              </li>;
           });
         }
         

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
            <div className="flex">
              <ul className="m-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                <GetIngs/>
              </ul>
            </div>
          }
          </div>
        }
        </>
      );
  }