import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
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
  const topRef = useRef(null)
  const aRef = useRef(null)
  const bRef = useRef(null)
  const cRef = useRef(null)
  const dRef = useRef(null)
  const eRef = useRef(null)
  const fRef = useRef(null)
  const gRef = useRef(null)
  const hRef = useRef(null)
  const iRef = useRef(null)
  const jRef = useRef(null)
  const kRef = useRef(null)
  const lRef = useRef(null)
  const mRef = useRef(null)
  const nRef = useRef(null)
  const oRef = useRef(null)
  const pRef = useRef(null)
  const qRef = useRef(null)
  const rRef = useRef(null)
  const sRef = useRef(null)
  const tRef = useRef(null)
  const uRef = useRef(null)
  const vRef = useRef(null)
  const wRef = useRef(null)
  const xRef = useRef(null)
  const yRef = useRef(null)
  const zRef = useRef(null)

  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

  const chosen = "border-yellow-400 bg-yellow-400 font-bold "
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
          var found = ""
          switch(i.apiID){
            case '11482':
              found = 'A'
              break
            case '10311821':
              found = 'B'
              break
            case '11109':
              found = 'C'
              break
            case '10016223':
              found = 'D'
              break
            case '11212':
              found = 'E'
              break
            case '10120420':
              found = 'F'
              break
            case '93663':
              found = 'G'
              break
            case '1049':
              found = 'H'
              break
            case '10014412':
              found = 'I'
              break
            case '99002':
              found = 'J'
              break
            case '93633':
              found = 'K'
              break
            case '18423':
              found = 'L'
              break
            case '19157':
              found = 'M'
              break
            case '11119':
              found = 'N'
              break
            case '20132':
              found = 'O'
              break
            case '93831':
              found = 'P'
              break
            case '1228':
              found = 'Q'
              break
            case '11952':
              found = 'R'
              break
            case '2037':
              found = 'S'
              break
            case '2073':
              found = 'T'
              break
            case '10020081':
              found = 'U'
              break
            case '93622':
              found = 'V'
              break
            case '12155':
              found = 'W'
              break
            case '93626':
              found = 'X'
              break
            case '18375':
              found = 'Y'
              break
            case '10211362':
              found = 'Z'
              break
          }
        return <li key={i.apiID} ref={
        found === "" ? null : found === "A" ? aRef : found === "B" ? bRef : found === "C" ? cRef : found === "D" ? dRef : found === "E" ? eRef :
        found === "F" ? fRef : found === "G" ? gRef : found === "H" ? hRef : found === "I" ? iRef : found === "J" ? jRef : found === "K" ? kRef : found === "L" ? lRef : found === "M" ? mRef :
        found === "N" ? nRef :found === "O" ? oRef :found === "P" ? pRef :found === "Q" ? qRef :found === "R" ? rRef :found === "S" ? sRef :found === "T" ? tRef :found === "U" ? uRef :found === "V" ? vRef :
        found === "W" ? wRef :found === "X" ? xRef :found === "Y" ? yRef :found === "Z" ? zRef : null
        }>
          <div className={pantryState[index] ? chosen + base : notChosen + base}
          onClick={() => handleOnChange(i.name, index)}
          >
            <FontAwesomeIcon className="ml-8 text-4xl md:text-4xl lg:text-5xl" icon={pantryState[index] ? faCheckCircle : faSquare} />
            <p className="text-lg lg:text-xl mr-4">{i.name}</p>
          </div>
          </li>;
        });
      }

      function executeScroll(letter) {
        switch(letter){
          case 'A':
            aRef.current.scrollIntoView()
            break
          case 'B':
            bRef.current.scrollIntoView()
            break
          case 'C':
            cRef.current.scrollIntoView()
            break
          case 'D':
            dRef.current.scrollIntoView()
            break
          case 'E':
            eRef.current.scrollIntoView()
            break
          case 'F':
            fRef.current.scrollIntoView()
            break
          case 'G':
            gRef.current.scrollIntoView()
            break
          case 'H':
            hRef.current.scrollIntoView() 
            break
          case 'I':
            iRef.current.scrollIntoView()
            break
          case 'J':
            jRef.current.scrollIntoView()
            break
          case 'K':
            kRef.current.scrollIntoView()
            break
          case 'L':
            lRef.current.scrollIntoView()
            break
          case 'M':
            mRef.current.scrollIntoView()
            break
          case 'N':
            nRef.current.scrollIntoView()  
            break
          case 'O':
            oRef.current.scrollIntoView()
            break
          case 'P':
            pRef.current.scrollIntoView()
            break
          case 'Q':
            qRef.current.scrollIntoView()
            break
          case 'R':
            rRef.current.scrollIntoView()
            break
          case 'S':
            sRef.current.scrollIntoView()
            break
          case 'T':
            tRef.current.scrollIntoView()
            break
          case 'U':
            uRef.current.scrollIntoView()
            break
          case 'V':
            vRef.current.scrollIntoView()
            break
          case 'W':
            wRef.current.scrollIntoView()
            break
          case 'X':
            xRef.current.scrollIntoView()
            break
          case 'Y':
            yRef.current.scrollIntoView()
            break
          case 'Z':
            zRef.current.scrollIntoView()
            break
          case '0':
            topRef.current.scrollIntoView()
            break
        }
      }

    return (
      <>
      <div ref={topRef}>
        <Navbar/>
      </div>
      {
        loading ? <Loader/>
        :
        <div>
          <h1 className="text-4xl text-center mb-4 font-bold">Virtual Pantry</h1>

        {
          ingredients == null ? null :
          <div className="flex">
            <ul className="m-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 ml-16">
              <GetIngs/>
            </ul>
            
            <div className="fixed">
              <div className="flex flex-no-wrap">
                <div className="w-30 absolute sm:relative md:h-full flex-col justify-between flex">
                 <div className="px-8">
                    <ul className="text-black">
                        {
                            letters.map((i) => {
                                return <li className="" key={i} onClick={() => executeScroll(i)}>
                                    <div className="cursor-pointer text-lg transform duration-100 hover:scale-150 hover:text-red-400">
                                        {i}
                                    </div>
                                  </li>;
                            })
                        }
                        <li><FontAwesomeIcon onClick={() => executeScroll('0')} icon={faArrowUp} className="cursor-pointer text-lg transform duration-100 hover:scale-150 hover:text-red-400"></FontAwesomeIcon></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
        </div>
      }
      </>
    );
}