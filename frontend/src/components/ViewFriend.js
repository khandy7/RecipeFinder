import { useState, useEffect } from 'react';
import Navbar from "./Navbar";
import Loader from './Loader';
import ViewFriendRecipe from './ViewFriendRecipe';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

export default function ViewFriend(props) {
    //const [user, setUser] = useState(null)
    //const [userRecipes, setUserRecipes] = useState(null)
    const [friend, setFriend] = useState(null)
    const [friendRecipes, setFriendRecipes] = useState(null)
    const [loading, setLoading] = useState(true)
    const [selectedRecipe, setSelectedRecipe] = useState(null)
    
    //friends username
    const username = props.match.params.username

    useEffect(() => {
        fetch("/api/v1/user")
        .then(res => res.json())
        .then(res => {
          if (res.data === "No user") {
            window.location.href = "/login";
          } else {
           //setUser(res)
           //setUserRecipes(res.recipes)
           setLoading(false)
          }
        })
    }, [])

    useEffect(() => {
        fetch("/api/v1/user/getFriend", {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                 "friend": username,
            })
            })
            .then(res => res.json())
            .then(res => {
                if (res.data === "Error") {
                    console.log("ERROR GETTING FRIEND")
                } else if (res.data === "User does not exist") {
                    console.log("User does not exist, weird error")
                } else {
                    setFriend(res.data)
                    setFriendRecipes(res.data.recipes)
                }
            })
    }, [])


    function getRating() {
        const id = selectedRecipe

        for (let i = 0; i < friendRecipes.length; i++) {
            if (id === friendRecipes[i][0]) {
                console.log("FOUND RECIPE")
                console.log(friendRecipes[i][0])
                return friendRecipes[i][3]
            }
        }
    }

    //ALL WORKS HERE, JUST NEED TO ADD AN ONCLICK TO OPEN UP THE RECIPE

    return (
        <>
        <Navbar/>
        {
            loading ? <Loader/> :
            <div>
                {
                    <div>
                        {
                            selectedRecipe === null ? 
                            <div>
                            {
                                friend === null ? null :
                                <div className="flex">
                                    <div className="m-auto">
                                    <h1 className="text-3xl text-center p-4">{friend.username}'s Recipes</h1>
                                    {
                                        friendRecipes === null ? null : friendRecipes.length === 0 ? <div>Friend has no recipes :(</div> :
                                        <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3 p-2">
                                            {friendRecipes.map(recipe => {
                                            return (
                                                <div key={recipe[0]} className="text-center border border-black p-2 m-4" onClick={() => setSelectedRecipe(recipe[0])}>
                                                    <div className="text-center m-auto cursor-pointer  text-lg">
                                                    <img alt={"Image of " + recipe[1]} src={recipe[2]} className="" />
                                                        {recipe[1].length > 30 ? recipe[1].substr(0,30) + "..." : recipe[1]}
                                                    </div>
                                                </div>
                                            );
                                            })}
                                        </div>
                                    }
                                    </div>
                                </div>
                            }
                            </div>
                            : 
                            <div>
                                <FontAwesomeIcon className="ml-8 text-5xl font-bold cursor-pointer" icon={faArrowLeft} onClick={()=> setSelectedRecipe(null)} />
                                <ViewFriendRecipe id={selectedRecipe} rating={getRating()} friend={username}/>
                            </div>
                        }

                    </div> 

                }
            </div>
        }
        </>
    );
}