import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'

export default function Navbar({ fixed }) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const [user, setUser] = React.useState(null);

  //get current user if there is one
  useEffect(() => {
    fetch("/api/v1/user")
    .then(res => res.json())
    .then(res => setUser(res.username))
  }, []) 

  const logout = () => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://ec2-54-214-74-5.us-west-2.compute.amazonaws.com/api/v1/auth/logout",
    }).then((res) => window.location.href = "/login");
  };

  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-pink-500 mb-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
              to="/"
              onClick={() => {
                if (navbarOpen) {
                    setNavbarOpen(!navbarOpen);
                }
              }}
            >
              Recipe Finder
            </Link>
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              {
                  navbarOpen ? <FontAwesomeIcon icon={faTimes} /> 
                  : <FontAwesomeIcon icon={faBars} />
              }
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
            <li className="nav-item">
                  <Link
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                    to="/"
                    onClick={() => {
                      if (navbarOpen) {
                          setNavbarOpen(!navbarOpen);
                      }
                    }}
                  >
                    <i className="fab fa-pinterest text-lg leading-lg text-white opacity-75"></i><span className="ml-2">Home</span>
                  </Link>
                </li>
              <li className="nav-item">
                <Link
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  to="/findrecipes"
                  onClick={() => {
                    if (navbarOpen) {
                        setNavbarOpen(!navbarOpen);
                    }
                  }}
                >
                  <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"></i><span className="ml-2">Find Recipes</span>
                </Link>
              </li>
                    <li className="nav-item">
                    <Link
                      className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                      to="/myrecipes"
                      onClick={() => {
                        if (navbarOpen) {
                            setNavbarOpen(!navbarOpen);
                        }
                      }}
                    >
                      <i className="fab fa-twitter text-lg leading-lg text-white opacity-75"></i><span className="ml-2">My Recipes</span>
                    </Link>
                  </li>

                    <li className="nav-item">
                    <Link
                      className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                      to="/friends"
                      onClick={() => {
                        if (navbarOpen) {
                            setNavbarOpen(!navbarOpen);
                        }
                      }}
                    >
                      <i className="fab fa-pinterest text-lg leading-lg text-white opacity-75"></i><span className="ml-2">Friends</span>
                    </Link>
                  </li>

              <li className="nav-item">

                {
                  user != null ?
                  <button
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  onClick={() => {
                    if (navbarOpen) {
                        setNavbarOpen(!navbarOpen);
                    }
                    logout();

                  }}
                >
                  <i className="fab fa-pinterest text-lg leading-lg text-white opacity-75"></i><span className="ml-2">Logout</span>
                </button> 
                :
                <Link
                className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                to="/login"
                onClick={() => {
                  if (navbarOpen) {
                      setNavbarOpen(!navbarOpen);
                  }
                }}
              >
                <i className="fab fa-pinterest text-lg leading-lg text-white opacity-75"></i><span className="ml-2">Login</span>
              </Link>
                }
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
