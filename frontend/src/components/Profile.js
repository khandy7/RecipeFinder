import { useState, useEffect } from 'react';
import Navbar from "./Navbar";
import Loader from './Loader';

  export default function Profile() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

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

      return (
        <>
        <Navbar/>
        {
          loading ? <Loader/>
          :
          <div>
            <div>Profile</div>
            <div>{user}</div>
         </div>
        }
        </>
      );
  }