import { useState, useEffect } from 'react';
import Navbar from "./Navbar";

  export default function Home() {
    const [user, setUser] = useState(null)

          useEffect(() => {
             fetch("/api/v1/user")
             .then(res => res.json())
             .then(res => setUser(res.username))
         }, []) 
         

      return (
        <>
        <Navbar/>
        <div>Home</div>
        <div>{user}</div>
        </>
      );
  }