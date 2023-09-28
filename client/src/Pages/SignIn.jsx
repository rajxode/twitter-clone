
import { NavLink } from "react-router-dom"

export default function SignIn(){
    return (
        <>
            <div className="absolute bg-slate-200 opacity-50 p-2 h-full w-full 
                            rounded shadow-md flex justify-center items-center">
            </div>
            <div className="absolute bg-white h-4/5 w-2/5 p-2 
                            rounded-md shadow-md flex flex-col justify-between">

                <div className="w-full h-[7%] bg-red-300 flex">
                    <NavLink to='/'>
                        X
                    </NavLink>
                    <img src={require('../Assets/logo.png')} alt="logo" 
                        className="h-full w-auto justify-self-center 
                                    self-center" />
                </div>

                <div className="w-full h-[90%] bg-slate-400">

                </div>
                
            </div>
        </>
    )
}