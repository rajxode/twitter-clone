import { useSelector } from "react-redux"
import { authSelector } from "../Redux/Reducers/authReducer"
import SingleUser from "./SingleUser";

export default function SideBar(props) {

    const { parent } = props;
    const { allUsers, loggedInUser } = useSelector(authSelector);

    return(
        <div className=" w-[35%] p-2 rounded flex flex-col ">
            <div className="w-full h-auto flex flex-col p-1 rounded shadow-sm bg-[#f7f5f5] mb-3">

                {
                    parent === 'home'
                    ?
                    <>
                        <h1 className="font-bold text-lg p-2">Who to follow</h1>
                        {allUsers.map((user) =>  loggedInUser._id !== user._id ? <SingleUser key={user._id} user={user} />  : null )}    
                    </>
                    :
                    <>
                        <h1 className="font-bold text-lg p-2">People You follow</h1>
                        {allUsers.map((user) =>  loggedInUser._id !== user._id ? <SingleUser key={user._id} user={user} />  : null )}    
                    </>
                }
                
            </div>

            <div className="w-full h-1/5 flex flex-col rounded p-1 shadow-sm bg-[#f7f5f5]">
            <h1 className="font-bold text-lg p-2">Sponsered</h1>
            </div>
        </div>
    )
}