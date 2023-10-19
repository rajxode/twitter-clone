import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, signOutThunk, getLoggedInUserThunk } from "../Redux/Reducers/authReducer";
import { useEffect, useState } from "react";


// toast notification
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignleMenuOption from "./SingleMenuOption";
import Loader from "./Spinner";



// render the side navbar of page
export default function Navbar() {

    const menuOptions = [{name:'Home', icon:<i class="fa-solid fa-house"></i>, link:'/home'},
                        {name:'Explore', icon:<i class="fa-solid fa-magnifying-glass"></i>, link:'/home/explore'},
                        {name:'Profile', icon:<i class="fa-solid fa-user"></i>, link:'/home/profile'},
                        {name:'Settings', icon:<i class="fa-solid fa-gears"></i>, link:'/home/settings'}, ]

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showMenu,setShowMenu] = useState(false);

    const { loggedInUser,isLoading } = useSelector(authSelector);


    useEffect(() => {
        dispatch(getLoggedInUserThunk());
    },[]);

    const handleSignOut = async (e) => {
        try{
            e.preventDefault();
            const result = await dispatch(signOutThunk());
            if(result.payload.success){
                navigate('/');
                toast.success(result.payload.message);
                
            }
            else{
                toast.error(result.payload.message);
            }
        }catch(error){
            console.log(error);
        }
    } 

    return (
        <div className="w-screen h-screen flex 
                        md:px-[1%] lg:px-[5%] py-[1%] justify-center
                        overflow-y-scroll">
            
        {
            isLoading
            ?
            <Loader />
            :
            <>

            <div className="h-full w-full xl:w-4/5 flex justify-between ">

                <div className="bg-white w-[10%] md:w-[6%] lg:w-[21%] h-full text-black shadow rounded p-2 flex flex-col">

                    <div className="w-full h-[35px] my-1">
                        <NavLink to='/home' >
                            <img src={require('../Assets/logo.png')} alt="logo" className="h-full w-auto"/>
                        </NavLink>
                    </div>

                    <div className="h-full flex flex-col justify-between items-center">
                        <div className="w-full h-auto my-2 flex flex-col">
                            { menuOptions.map((menu,i) => <SignleMenuOption key={i} menu={menu} />)}
                        </div>
                        

                        <div className="w-full h-[45px] my-2 bg-[#f7f5f5] rounded shadow-md flex 
                                items-center justify-between p-1 text-xl font-semibold relative">
                            
                            <div className="hidden w-[37px] h-full rounded-full overflow-hidden lg:block">
                                {
                                    loggedInUser.photo
                                    ?
                                    <img src={loggedInUser.photo.secure_url} alt='avatar' className='h-full w-full'/>
                                    :
                                    <img src={require('../Assets/icons/dummy-avatar.jpg')} alt='avatar' className='h-full w-full'/>
                                }
                            </div>
                            
                            
                            <div className="hidden w-3/5 h-full lg:block">
                                {loggedInUser.name}
                            </div>
                            
                            <div className="w-1/5 h-full rounded-full cursor-pointer 
                                    flex justify-center items-center hover:bg-slate-200"
                                onClick={() => setShowMenu(!showMenu)}>
                                
                                <span>
                                    {
                                        showMenu
                                        ?
                                        <i class="fa-solid fa-xmark"></i>
                                        :
                                        <i class="fa-solid fa-ellipsis"></i>
                                    }
                                    
                                </span>

                                
                                {showMenu ? 
                                    <div className="absolute bg-slate-200 bottom-11 w-full h-[45px] 
                                            rounded flex items-center left-0 shadow-md text-base p-1 px-2 cursor-pointer"
                                        onClick={handleSignOut} >
                                        
                                        <span>
                                            <i class="fa-solid fa-arrow-right-from-bracket"></i>
                                        </span>
                                        &nbsp;
                                        <span className="hidden lg:block">
                                            Log out @{loggedInUser.name}
                                        </span>
                                    </div> 
                                    : 
                                    null}                                
                            </div>
                        </div>
                    </div>
                    
                </div>
                
                <Outlet />

            </div>
            </>
        }
        </div>
    );
}
