
// react hook
import { useEffect } from "react";

// react router
import { useNavigate } from "react-router-dom"


// render error page
export default function Error(){
    const navigate=useNavigate();

    // redirect to homepage after 3 second
    useEffect(()=>{
        setTimeout(()=>{
            navigate("/");
        },3000);
    },[])


    return(
        // Error message on screen
        <div className="w-full h-full flex justify-center items-center">
            <h1>Error, Something went wrong !!!</h1>
            <p>redirecting back to homepage... </p>
        </div>

    )
}
