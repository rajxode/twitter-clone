
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, setLoggedInUser } from "../Redux/Reducers/authReducer";
import SideBar from "./SideBar"
import { useEffect, useState } from "react";
import { addPostThunk, getAllPostThunk, postSelector } from '../Redux/Reducers/postReducer';

// toast notification
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SinglePost from './SinglePost';

export default function Home (){

    const [content,setContent] = useState();
    const dispatch = useDispatch();
    const { loggedInUser } = useSelector(authSelector);
    const { userPosts } = useSelector(postSelector);

    useEffect(() => {
        const isUserLoggedIn = window.localStorage.getItem('user');
        if(isUserLoggedIn){
            const user = JSON.parse(isUserLoggedIn);
            dispatch(setLoggedInUser(user));
            dispatch(getAllPostThunk(user._id));
        }
    },[]);

    const handlePostSubmit = async (e) => {
        try {
            e.preventDefault();
            const data = { content,userId:loggedInUser._id};
            const result = await dispatch(addPostThunk(data));

            if(result.payload.success){
                toast.success(result.payload.message);
                setContent('');
            }
            else{
                toast.error(result.payload.message);
            }
        } catch (error) {
            console.log(error);
        }        
    }

    return(
        <div className="h-full w-[78%] flex justify-between">
            
            <div className=" w-[68%] p-2 rounded shadow-md flex flex-col">
                <header className="w-full h-1/5 p-2 bg-white ">
                    <div className='w-full h-full'>
                        <div className="font-bold text-2xl w-full h-2/5">
                            Home
                        </div>

                        <div className="w-full h-3/5 flex font-semibold border-b">
                            <div className="w-1/2 h-full flex items-center justify-center border-r">For You</div>
                            <div className="w-1/2 h-full flex items-center justify-center">Following</div>
                        </div>
                    </div>
                </header>

                <div className="w-full h-1/5 flex border-b p-2">
                        <div className="h-full w-[10%] mr-1">
                            pic
                        </div>
                        <div className="h-full w-[88%] p-1">
                            <form className="w-full h-full" onSubmit={handlePostSubmit}>
                                <textarea 
                                    className="w-full h-[65%] focus:outline-none 
                                            p-1 font-semibold text-xl rounded-sm" 
                                    placeholder="What is happening?"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)} 
                                    required />
                                
                                <button 
                                    className="float-right px-3 py-1 rounded-full bg-blue-400 
                                        hover:bg-blue-500 text-white font-semibold"
                                    onClick={handlePostSubmit}
                                    >
                                    Post
                                </button>

                            </form>
                        </div>

                    </div>
                
                <main className="h-2/3 w-full p-2 flex flex-col">
                    { userPosts.map((post) => <SinglePost key={post._id}
                                                        post={post} />)}
                </main>
            </div>
            
            <SideBar />
        </div>
    )
}