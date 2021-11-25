import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Loader from './Loader';

  export default function Login() {
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loginError, setLoginError] = useState(null);
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
      setLoginError(null);
      fetch("/api/v1/auth/login", {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
             "username": loginUsername,
             "password": loginPassword,
          })
        })
        .then(res => res.json())
        .then((res) => {
      // axios({
      //   method: "POST",
      //   data: {
      //     username: loginUsername,
      //     password: loginPassword,
      //   },
      //   withCredentials: true,
      //   url: "http://ec2-54-214-74-5.us-west-2.compute.amazonaws.com/api/v1/auth/login",
      // }).then((res) => {
        console.log(res)
      if (res.data === "Successfully Authenticated") {
          window.location.href = "/"
        } else {

          setLoginError("Incorrect username or password.");
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
            <h1 className="text-center text-4xl md:text-5xl font-extrabold mt-10">Welcome to Recipe Finder!</h1>
          <div className="min-h-full flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
              <div>
                <img
                  className="mx-auto h-24 w-auto"
                  src="https://www.clipartmax.com/png/full/49-498799_pizza-cartoon-pizza-clipart.png"
                  alt="Workflow" />
                <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">Sign in to your account</h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                  Or{' '}
                  <Link to="/register">
                  <a href="#" className="font-medium text-blue-500 hover:text-blue-700">
                    register for an account here
                  </a>
                  </Link>
                </p>
              </div>

            <div className="mt-8 space-y-6">

              <input
               className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
               placeholder="Username" 
               onChange={e => setLoginUsername(e.target.value)} 
               />

              <input
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
              type="password" 
              placeholder="Password" 
              onChange={e => setLoginPassword(e.target.value)} 
              />
              
              <div>
                <button
                  type="submit"
                  onClick={login}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                >
                  Sign in
                </button>
              </div>

            </div>
            {
              loginError === null ? null :
              <p className="text-red-600 text-center">{loginError}</p>
            }
            </div>

        </div>
        </div>
        }
        </>
      );
  }
