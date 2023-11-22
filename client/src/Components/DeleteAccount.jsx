
// hooks
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

// toast notification
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// reducers and selector
import { authSelector, deleteAccountThunk, signOutThunk } from "../Redux/Reducers/authReducer";


// for deleteing user's account
export default function DeleteAccount(){
    
    // variables and user's data
    const { loggedInUser } = useSelector(authSelector);
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();    


    // submit of delete account
    const handleSubmit = async(e) => {
        try {
            e.preventDefault();
            // check whether the entered password is valid
            if(!password || password.length < 8){
                toast.error('Please enter valid password');
                return;
            }

            const id = loggedInUser._id;
            // api call
            const delResult = await dispatch(deleteAccountThunk({id,data:{password}}));
            // if not success
            if(!delResult.payload.success){
                toast.error(delResult.payload.message);
            }
            // success
            else{
                navigate('/');
                await dispatch(signOutThunk());
                toast.success(delResult.payload.message);
            }
        } catch (error) {
            // error
            toast.error(error.message);
        }
    }

    return(
        <>
            {/* container */}
            <div className="w-full h-full flex flex-col">
                <div className="w-full h-[45px] flex items-center px-2 bg-slate-200 
                        border-b border-slate-400 font-semibold dark:bg-slate-500 dark:text-white">
                        Delete Your Account
                </div>

                <div className="w-full h-full mt-2 p-2">
                    <form className="w-full h-full p-3" onSubmit={handleSubmit}>

                        <input type="checkbox" required/>
                        &nbsp;
                        I want to delete my account

                        <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        className="border rounded border-slate-400 px-2 
                                w-full h-[7%] my-4"
                        />

                        <button className="w-full h-[7%] mb-0 bg-black 
                                text-white font-semibold rounded-full"
                                type="submit" 
                                onClick={handleSubmit}
                                >
                            Delete My Account
                        </button>
                    </form>
                </div>               

            </div>
        </>
    )
}