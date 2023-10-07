
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, getAllUserThunk, setLoggedInUser } from "../Redux/Reducers/authReducer";
import SideBar from "./SideBar"
import { useEffect, useState } from "react";
import { addPostThunk, getAllPostsThunk, getFollowPostThunk, postSelector } from '../Redux/Reducers/postReducer';

// toast notification
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Loader from './Spinner';
import AllPost from './AllPost';
import FollowingPost from './FollowingPost';


export default function Home (){

    const [content,setContent] = useState();
    const [file,setFile] = useState('');
    const dispatch = useDispatch();
    const { loggedInUser, isLoading } = useSelector(authSelector);
    const [showFollowPost,setShowFollowPost] = useState(false);
    

    const handlePostSubmit = async(e) => {
        try{
            e.preventDefault();

            if(!content || !content.trim()){
                toast.error('Please enter some data');
                setContent('');
                return;
            }
            
            const result = await dispatch(addPostThunk({content,userId:loggedInUser._id,file}));

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
            
            <div className=" w-[68%] p-2 rounded flex flex-col">

            {
                isLoading
                ?
                <Loader />
                :
                <>

                <header className="w-full h-1/5 p-2 bg-white ">
                    <div className='w-full h-full'>
                        <div className="font-bold text-2xl w-full h-3/5">
                            Home
                        </div>

                        <div className="w-full h-2/5 flex font-semibold border-b">
                            <div className="w-1/2 h-full flex items-center justify-center border-r"
                                onClick={() => setShowFollowPost(false)}>
                                For You
                            </div>
                            
                            <div className="w-1/2 h-full flex items-center justify-center"
                                onClick={() => setShowFollowPost(true)}>
                                Following
                            </div>
                        </div>
                    </div>
                </header>

                <div className="w-full h-1/5 flex border-b p-2">
                    <div className="w-[10%] h-[55px] overflow-hidden rounded-full mr-1">
                        {
                            loggedInUser.photo
                            ?
                            <img src={loggedInUser.photo.secure_url} alt='avatar' className='h-full w-full'/>
                            :
                            <img src={require('../Assets/icons/dummy-avatar.jpg')} alt='avatar' className='h-full w-full'/>
                        }
                    </div>
                    <div className="h-full w-[88%] p-1 ">
                        <form className="w-full h-full">
                            <textarea 
                                className="w-full h-[65%] focus:outline-none 
                                        p-1 font-semibold text-xl rounded-sm"  
                                placeholder="What is happening?"
                                value={content}
                                onChange={(e) => setContent(e.target.value)} 
                                required />

                            <input 
                                type="file" 
                                onChange={(e) => setFile(e.target.files[0])}
                                placeholder='picture'
                                // className='w-[25px]'
                                />
                            
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

                {
                    showFollowPost
                    ?
                    <FollowingPost />
                    :
                    <AllPost />
                }
                
                
            </>
            }
            </div>
            
            <SideBar parent={'home'} />
        </div>
    )
}