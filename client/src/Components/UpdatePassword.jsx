
import { useState } from "react";

const monthName = ['January','February','March','April','May','June','July','August','September','October','November','December',];

export default function UpdatePassword(){

    const [formData,setFormData] = useState({
        oldPassword:'',
        newPassword:''
    });
    
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const handleFormData = (e) => {
        const {name,value} = e.target;

        setFormData({...formData, [name]:value});
    }

    return(
        <>
            <div className="w-full h-full flex flex-col">
                <div className="w-full h-[45px] flex items-center px-2 bg-slate-200 
                        border-b border-slate-400 font-semibold">
                    Update Password
                </div>

                <div className="w-full h-full mt-2 p-2">
                    <form className="w-full h-full p-3">

                        <input
                        type="password"
                        placeholder="Old Password"
                        name="oldPassword"
                        value={formData.oldPassword}
                        required
                        onChange={handleFormData}
                        className="border rounded border-slate-400 px-2 
                                w-full h-[7%] my-4"
                        />

                        <input
                        type="Password"
                        name="newPassword"
                        value={formData.newPassword}
                        placeholder="New Password"
                        required
                        onChange={handleFormData}
                        className="border rounded border-slate-400 px-2 
                                w-full h-[7%] my-4"
                        />

                        <input
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        value={confirmPassword}
                        required
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="border rounded border-slate-400 px-2 
                                w-full h-[7%] my-4"
                        />

                        <button className="w-full h-[7%] mb-0 bg-black 
                                text-white font-semibold rounded-full"
                                type="submit" 
                                // onClick={handleSubmit}
                                >
                            Update Password
                        </button>
                    </form>
                </div>               

            </div>
        </>
    )
}