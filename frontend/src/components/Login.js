import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import axios from "axios";
import Loader from './Loader';

  export default function Login() {
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
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

    const login = () => {
      axios({
        method: "POST",
        data: {
          username: loginUsername,
          password: loginPassword,
        },
        withCredentials: true,
        url: "http://localhost:5000/api/v1/auth/login",
      }).then((res) => {
        if (res.data === "Successfully Authenticated") {
          window.location.href = "/"
        } else {
          console.log("Incorrect username or password.");
        }
      });
    };

      return (
        <>
        <Navbar/>
        {
          //if page is loading, display loading symbol
          loading ?  <Loader/> 
          : 
          //otherwise, display login page
          <div>
          <div className="m-10">
            <h1>Login</h1>
            <input placeholder="Username" onChange={e => setLoginUsername(e.target.value)} />
            <input placeholder="Password" onChange={e => setLoginPassword(e.target.value)} />
            <button onClick={login}>Login Submit</button>
          </div>

          <div>
            <Link to='/register'>
              Register for an account
            </Link>
          </div>

        </div>
        }
        </>
      );
  }