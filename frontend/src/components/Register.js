import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Navbar from './Navbar';
import Loader from './Loader';

  export default function Register() {
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerError, setRegisterError] = useState(null);
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
        setRegisterError(null);

        if (fullName == "") {
          setRegisterError("Please provide your full name")
          return
        }

        if (registerUsername.length < 5) {
          setRegisterError("Username must be at least five characters long")
          return
        } 
        
        if (registerPassword.length < 6) {
          setRegisterError("Password must be at least six characters long")
          return
        }

        fetch("/api/v1/auth/register", {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                "fullName": fullName,
                "username": registerUsername,
                "password": registerPassword,
              })
            })
          .then(res => res.json())
          .then((res) => {
              if (res.data === "User created") {
                window.location.href = "/login"
              } else {
                setRegisterError("Username taken");
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
              <h1 className="text-center text-4xl md:text-5xl font-extrabold mt-10">Welcome to Recipe Finder!</h1>
              <div className="min-h-full flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
              <div>
                  <img
                    className="mx-auto h-24 w-auto"
                    src="https://www.clipartmax.com/png/full/49-498799_pizza-cartoon-pizza-clipart.png"
                    alt="Workflow" />
                  <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">Register for an account</h2>
                  <p className="mt-2 text-center text-sm text-gray-600">
                    Or{' '}
                    <Link to="/login">
                    <a href="#" className="font-medium text-blue-500 hover:text-blue-700">
                      sign in to your account here
                    </a>
                    </Link>
                  </p>
                </div>
              <div className="mt-8 space-y-6">
                <input
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                placeholder="Full Name" 
                onChange={e => setFullName(e.target.value)} 
                />

                <input
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                placeholder="Username" 
                onChange={e => setRegisterUsername(e.target.value)}
                />

                <input 
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                placeholder="Password" 
                type="password" 
                onChange={e => setRegisterPassword(e.target.value)} />
                <button 
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                onClick={register}>Submit</button>
                </div>
                {
                  registerError === null ? null :
                  <p className="text-red-600 text-center">{registerError}</p>
                }
              </div>
          </div>
          </div>
        }
        </>
      );
  }
