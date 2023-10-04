
import { useState } from "react";

const monthName = ['January','February','March','April','May','June','July','August','September','October','November','December',];

export default function DeleteAccount(){
    
    const [password, setPassword] = useState('');
    

    return(
        <>
            <div className="w-full h-full flex flex-col">
                <div className="w-full h-[45px] flex items-center px-2 bg-slate-200 
                        border-b border-slate-400 font-semibold">
                        Delete Your Account
                </div>

                <div className="w-full h-full mt-2 p-2">
                    <form className="w-full h-full p-3">

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
                                // onClick={handleSubmit}
                                >
                            Delete My Account
                        </button>
                    </form>
                </div>               

            </div>
        </>
    )
}