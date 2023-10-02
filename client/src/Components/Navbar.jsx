import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { authSelector } from "../Redux/Reducers/authReducer";
import { useEffect } from "react";

// toast notification
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Navbar() {

    const navigate = useNavigate();
    const { loggedInUser } = useSelector(authSelector);

    // useEffect(() => {
    //     if(!loggedInUser){
    //         toast.error('Please login first');
    //         navigate('/signin');
    //     }

    // },[]);

    // if(!loggedInUser){
    //     return(
    //         <h1 className="text-3xl font-bold">
    //             Unauthorized!!!
    //         </h1>
    //     )
    // }

    return (
        <div className="w-screen h-screen flex 
                        px-[5%] py-[2%] justify-center">

            <div className="h-full w-4/5 flex justify-between">
                <div className="bg-white w-[21%] text-black shadow-md rounded p-2 flex flex-col">
                    {/* {loggedInUser.name} */}
                    <div className="w-full h-[35px] my-1">
                        <img src={require('../Assets/logo.png')} alt="logo" className="h-full w-auto"/>
                    </div>

                    <div className="w-full h-[35px] my-1">
                        <img src={require('../Assets/logo.png')} alt="logo" className="h-full w-auto"/>
                    </div>

                    <div className="w-full h-[35px] my-1">
                        <img src={require('../Assets/logo.png')} alt="logo" className="h-full w-auto"/>
                    </div>
                    
                </div>
                <Outlet />
            </div>
        </div>
    );
}
