import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, signOutThunk } from "../Redux/Reducers/authReducer";
import { useEffect } from "react";

// toast notification
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Navbar() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loggedInUser } = useSelector(authSelector);

    const handleSignOut = async (e) => {
        try{
            e.preventDefault();
            const result = await dispatch(signOutThunk());

            if(result.payload.success){
                toast.success(result.payload.message);
                navigate('/signin');
            }
            else{
                toast.error(result.payload.message);
            }
        }catch(error){
            console.log(error);
        }
    } 
    
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
                        px-[5%] py-[1%] justify-center
                        overflow-y-scroll">

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
                        <button onClick={handleSignOut}>
                            Sign Out
                        </button>
                    </div>
                    
                </div>
                <Outlet />
            </div>
        </div>
    );
}
