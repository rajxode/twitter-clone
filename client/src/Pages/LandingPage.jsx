import { NavLink, Outlet } from 'react-router-dom';
import Loader from '../Components/Spinner';

export default function LandingPage(){

    return(
        <>
            {/* <Loader /> */}
            <div className="w-screen h-screen bg-white flex justify-center 
                        items-center relative ">
                
                <div className="w-4/5 h-4/5 flex justify-around p-3">

                    <div className="h-full w-1/2 mr-2 p-3 flex justify-center items-center">
                        <img src={require('../Assets/logo.png')} alt='logo' 
                            className='h-3/5 w-3/5' />
                    </div>
                    
                    <div className="h-full w-1/2 p-3 flex flex-col justify-around">
                        
                        <div className='text-7xl font-bold h-1/5'>
                            Happening now
                        </div>
                        
                        <div className='text-4xl font-bold w-full h-1/5'>   
                            Join now.
                        </div>
                        
                        <div className=' w-3/5 h-3/5 flex flex-col py-2 justify-start'>
                            
                            <div className="w-full h-1/5 ">
                                <button className='border border-slate-300 hover:bg-slate-100 w-full h-3/5 flex justify-center items-center rounded-full'>
                                    <img src={require('../Assets/icons/google.png')} alt='google' className='h-[20px] w-[20px]' />
                                    <span>
                                        &nbsp;
                                        continue with Google
                                    </span>
                                </button>
                            </div>
                            
                            <h2 className='text-center'>or</h2>

                            <div className="w-full h-2/5 mt-1">
                                <NavLink to='/signup'>
                                    <button className='w-full h-[30%] bg-sky-400 hover:bg-sky-500 text-white font-semibold rounded-full'>
                                        Create Account
                                    </button>
                                </NavLink>
                                <div className='p-1 pt-0'>
                                    <small className='leading-tight'>
                                        By signing up, you agree to the 
                                        <a href='#' className='text-sky-500'> Terms of Services</a> and 
                                        <a href='#' className='text-sky-500'> Privacy Policy</a>, including 
                                        <a href='#' className='text-sky-500'> Cookie Use</a>.
                                    </small>
                                </div>                                
                            </div>

                            <p className='font-bold pl-1'>Already have an Account.</p>
                            <div className="w-full h-1/5 mt-1">
                                <NavLink to='/signin'>
                                    <button className='border border-slate-300 hover:bg-slate-100 w-full h-3/5 text-sky-500 font-bold rounded-full'>
                                            Sign In
                                    </button>
                                </NavLink>
                            </div>

                        </div>
                    </div>
                    
                </div>
                <Outlet />
            </div>
        </>
    )
}