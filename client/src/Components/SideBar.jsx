import { useDispatch, useSelector } from "react-redux"
import { authSelector, getAllUserThunk } from "../Redux/Reducers/authReducer"
import SingleUser from "./SingleUser";
import { useEffect } from "react";

export default function SideBar(props) {

    const dispatch = useDispatch();
    const { parent } = props;
    const { allUsers, loggedInUser, follows } = useSelector(authSelector);

    useEffect(() => {
        dispatch(getAllUserThunk());
    },[]);

    return(
        <div className=" w-[35%] p-2 rounded flex flex-col ">
            <div className="w-full flex flex-col p-1 rounded shadow-sm bg-[#f7f5f5] mb-3 h-2/5 overflow-y-scroll relative">

                {
                    parent === 'home'
                    ?
                    <>
                        <h1 className="font-bold text-lg p-2">Who to follow</h1>
                        {allUsers.map((user) =>  loggedInUser._id !== user._id ? <SingleUser key={user._id} user={user} parent={'home'} />  : null )}    
                    </>
                    :
                    <>
                        <h1 className="font-bold text-lg p-2 sticky z-20">People You follow</h1>
                        {follows.map((user) =>  <SingleUser key={user._id} user={user} parent={'profile'} />)}    
                    </>
                }
                
            </div>

            {
                parent !== 'home'
                ?
                <div className="w-full flex flex-col p-1 rounded shadow-sm bg-[#f7f5f5] mb-3 h-2/5 overflow-y-scroll relative">
                        
                    <h1 className="font-bold text-lg p-2 sticky z-20">People following You</h1>
                    {follows.map((user) =>  <SingleUser key={user._id} user={user} parent={'profile'} />)}    
                        
                </div>
                :
                null
            }

            <div className="w-full h-1/5 flex flex-col rounded p-1 shadow-sm bg-[#f7f5f5]">
            <h1 className="font-bold text-lg p-2">Sponsered</h1>
            </div>
        </div>
    )
}