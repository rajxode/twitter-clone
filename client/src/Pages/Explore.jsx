import { useDispatch, useSelector } from "react-redux"
import { authSelector, getAllUserThunk , getLoggedInUserThunk } from "../Redux/Reducers/authReducer"
import SingleUser from "../Components/SingleUser";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Explore(){

    const { allUsers } = useSelector(authSelector);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [search,setSearch] = useState('');

    useEffect(() => {
        async function getUser(){
            const result = await dispatch(getLoggedInUserThunk());
            if(!result.payload){
                navigate('/');
            }
            else{
                dispatch(getAllUserThunk());
            }
        }
        getUser();
    },[]);

    return(
        <div className="h-full w-[78%] flex justify-between">
            
            <div className="w-[68%] h-full rounded shadow-md flex flex-col">
                <div className="w-full h-[45px] text-xl font-semibold bg-slate-100 flex items-center px-2 border-b border-slate-300 shadow-sm">
                    People You May Know
                </div>

                <div className="w-full h-full p-2 bg-slate-50 flex flex-col">

                    <div className="w-full h-auto px-2 my-2">

                        <input 
                            type="text" 
                            placeholder="Search..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="border w-full rounded-full 
                                h-[35px] mt-1 px-3 focus:outline-none"/>
                    </div>

                    {
                        allUsers
                        .filter((user) => {
                            return search.toLocaleLowerCase() === ''
                            ? user
                            :user.name.toLocaleLowerCase().includes(search)})
                        .map((user) => <SingleUser key={user._id} user={user} />) 
                    }   

                </div>
            </div>
       
        </div>
    )
}