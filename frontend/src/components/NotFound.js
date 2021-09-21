import Navbar from "./Navbar";

  export default function NotFound() {

      return (
        <>
        <Navbar/>
        <div className="h-screen flex">
            <div className= "m-auto">
                404 Not Found
            </div>
        </div>
        </>
      );
  }