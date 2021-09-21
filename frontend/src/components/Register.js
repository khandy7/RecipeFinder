import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import axios from "axios";
import Loader from './Loader';

  export default function Register() {
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
       fetch("/api/v1/user")
       .then(res => res.json())
       .then(res => {
         //if logged in user tries to access login page, send to home page
         if (res.data !== "No user") {
           window.location.href = "/";
         } else {
            setLoading(false);
         }
       })
   }, []) 

    const register = () => {
      axios({
        method: "POST",
        data: {
          fullName: fullName,
          username: registerUsername,
          password: registerPassword,
        },
        withCredentials: true,
        url: "http://localhost:5000/api/v1/auth/register",
      }).then((res) => {
          if (res.data === "User created") {
            window.location.href = "/login"
          } else {
            console.log("Username taken or password not good enough")
          }
      });
    };

      return (
        <>
        <Navbar/>
        {
            loading ? <Loader/>
            :
            <div>
            <div className="m-10">
              <h1>Register</h1>
              <input placeholder="Full Name" onChange={e => setFullName(e.target.value)} />
              <input placeholder="Username" onChange={e => setRegisterUsername(e.target.value)} />
              <input placeholder="Password" onChange={e => setRegisterPassword(e.target.value)} />
              <button onClick={register}> Register Submit</button>
            </div>
          </div>
        }
        </>
      );
  }