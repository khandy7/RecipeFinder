import { useState, useEffect } from 'react';
import Navbar from "./Navbar";
import Loader from './Loader';
import { Link } from 'react-router-dom';
import { faPizzaSlice, faHamburger, faIceCream } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

  export default function Friends() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [friends, setFriends] = useState(null)
    const [username, setUsername] = useState("")
    const [error, setError] = useState(null)

    useEffect(() => {
       fetch("/api/v1/user")
       .then(res => res.json())
       .then(res => {
         if (res.data === "No user") {
           window.location.href = "/login";
         } else {
          setUser(res.username)
          setFriends(res.friends)
          setLoading(false)
         }
       })
   }, []) 

   function addFriend() {
     setError(null)
     //console.log(username)
     if (username === user) {
        setError("Cannot add yourself as a friend")
     } else if (friends.includes(username)) {
       setError("Already friends with " + username)
     } else {
        fetch("/api/v1/user/addFriend", {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({
              "friend": username,
          })
        })
        .then(res => res.json())
        .then(res => {
            if (res.data === "Error") {
              setError("Error occured, try again.")
            } else if (res.data === "User does not exist") {
              setError("User does not exist")
            } else {
              setError(null)
              //here friend got added,
              setFriends(res.friends)
              setUsername("")
              //add friend to current state of friends list
            }
        })
     }

   }

      return (
        <>
        <Navbar/>
        {
          loading ? <Loader/>
          :
          <div>
              <div className="text-4xl text-center mb-4">Friends</div>
            <div className="flex">
              <div className="p-3 m-auto">
                  <input value={username} onInput={e => setUsername(e.target.value)} className="border border-black" name="username" type="text" placeholder="Friends Username"/>
                  <button className="ml-4 bg-pink-500 hover:bg-pink-700 text-white m-auto font-bold py-2 px-4 rounded"
                  onClick={addFriend}
                  >
                    Add Friend
                  </button>
                  {
                error === null ? null :
                <div className="text-red-600">
                  {error}
                </div>     
                  }
              </div>
            </div>

            {
              !friends ? null : friends.length === 0 
              ? <div className="text-center m-4">No friends yet</div> 
              : <div className="m-4 flex grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {friends.map((friend, index) => {
                  return (
                    <Link className="text-center border border-black m-4 h-10" key={friend} to={"/viewFriend/" + friend}>
                      <div className="grid grid-cols-2">
                        {
                          index % 3 == 0 ? <FontAwesomeIcon className="ml-24 sm:ml-16 mt-1 text-2xl text-yellow-700" icon={faPizzaSlice}/> : index % 3 === 1 ?
                          <FontAwesomeIcon className="ml-24 sm:ml-16 mt-1 text-2xl text-yellow-400" icon={faHamburger}/> : index % 3 == 2 ?
                          <FontAwesomeIcon className="ml-24 sm:ml-16 mt-1 text-2xl text-red-400" icon={faIceCream}/> : null
                        }
                        <p className="mr-20 mt-1 text-xl">{friend}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            }
         </div>
        }
        </>
      );
  }