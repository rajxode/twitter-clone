import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, signOutThunk, setLoggedInUser, getAllUserThunk } from "../Redux/Reducers/authReducer";
import { useEffect, useState } from "react";
import { getAllPostThunk } from "../Redux/Reducers/postReducer";

// toast notification
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignleMenuOption from "./SingleMenuOption";

export default function Navbar() {

    const menuOptions = [{name:'Home', icon:<i class="fa-solid fa-house"></i>, link:'/home'},
                        {name:'Explore', icon:<i class="fa-solid fa-magnifying-glass"></i>, link:'/home/explore'},
                        {name:'Profile', icon:<i class="fa-solid fa-user"></i>, link:'/home/profile'},
                        {name:'Account Settings', icon:<i class="fa-solid fa-gears"></i>, link:'/home/settings'}, ]

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showMenu,setShowMenu] = useState(false);

    const { loggedInUser } = useSelector(authSelector);


    useEffect(() => {
        const isUserLoggedIn = window.localStorage.getItem('user');
        dispatch(getAllUserThunk());
        if(isUserLoggedIn){
            const user = JSON.parse(isUserLoggedIn);
            dispatch(setLoggedInUser(user));
            dispatch(getAllPostThunk(user._id));
        }
    },[]);

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

            <div className="h-full w-4/5 flex justify-between ">

                <div className="bg-white w-[21%] h-full text-black shadow-md rounded p-2 flex flex-col">
                    {/* {loggedInUser.name} */}
                    <div className="w-full h-[35px] my-1">
                        <NavLink to='/home' >
                            <img src={require('../Assets/logo.png')} alt="logo" className="h-full w-auto"/>
                        </NavLink>
                    </div>

                    <div className="h-full flex flex-col justify-between">
                        <div className="w-full h-auto my-2">
                            { menuOptions.map((menu,i) => <SignleMenuOption key={i} menu={menu} />)}
                        </div>
                        

                        <div className="w-full h-[45px] my-2 bg-[#f7f5f5] rounded shadow-md flex 
                                items-center justify-between p-1 text-xl font-semibold relative">
                            
                            <div className="w-[37px] bg-red-300 h-full rounded-full"></div>
                            
                            
                            <div className="w-3/5 h-full">
                                {loggedInUser.name}
                            </div>
                            
                            <div className="w-1/5 h-full rounded-full cursor-pointer 
                                    flex justify-center items-center hover:bg-slate-200"
                                onClick={() => setShowMenu(!showMenu)}>
                                
                                <span>
                                    <i class="fa-solid fa-ellipsis"></i>
                                </span>

                                
                                {showMenu ? 
                                    <div className="absolute bg-slate-200 bottom-11 w-full h-[45px] 
                                            rounded flex items-center left-0 shadow-md text-base p-1 px-2 cursor-pointer"
                                        onClick={handleSignOut} >
                                        
                                        <span>
                                            <i class="fa-solid fa-arrow-right-from-bracket"></i>
                                        </span>
                                        &nbsp;
                                        Log out @{loggedInUser.name}
                                    </div> 
                                    : 
                                    null}                                
                            </div>
                        </div>
                    </div>
                    
                </div>
                
                <Outlet />

            </div>
        </div>
    );
}
