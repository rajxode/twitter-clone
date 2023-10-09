
// react hooks 
import { useEffect, useState } from "react";

// redux hooks 
import { useDispatch, useSelector } from 'react-redux';

// auth reducer and post reducer
import { authSelector, getAllUserThunk, setLoggedInUser } from "../Redux/Reducers/authReducer";
import { addPostThunk, getAllPostsThunk, getFollowPostThunk, postSelector } from '../Redux/Reducers/postReducer';

// toast notification
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import SideBar from "./SideBar"
import Loader from './Spinner';
import AllPost from './AllPost';
import FollowingPost from './FollowingPost';


// render home page
export default function Home (){

    // for calling reducer's action
    const dispatch = useDispatch();
    // content of post 
    const [content,setContent] = useState();
    // file to upload 
    const [file,setFile] = useState('');
    
    // variables from reducer 
    const { loggedInUser, isLoading } = useSelector(authSelector);
    // to show post of people user follows
    const [showFollowPost,setShowFollowPost] = useState(false);


    // for adding a new post
    const handlePostSubmit = async(e) => {
        try{
            // prevent default action 
            e.preventDefault();

            // if no content is given in post input 
            if(!content || !content.trim()){
                // message to provide data
                toast.error('Please enter some data');
                setContent('');
                return;
            }
            
            // adding new post
            const result = await dispatch(addPostThunk({content,userId:loggedInUser._id,file}));

            // message based on result 
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
                            <div style={showFollowPost ? null : {textDecoration:'underline' , textDecorationColor:'skyblue' , textDecorationThickness:'4px'}} 
                                className="w-1/2 h-full flex items-center justify-center border-r cursor-pointer decoration-sky-500 underline-offset-8 "
                                onClick={() => setShowFollowPost(false)}>
                                For You
                            </div>
                            
                            <div style={showFollowPost ? {textDecoration:'underline' , textDecorationColor:'skyblue' , textDecorationThickness:'4px'} : null } 
                                className="w-1/2 h-full flex items-center justify-center cursor-pointer underline-offset-8"
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

                            <label for='image' className="text-sky-400 hover:text-sky-600 text-xl cursor-pointer">
                                <i class="fa-solid fa-image"></i>
                            </label>
                            <input 
                                type="file" 
                                id="image"
                                onChange={(e) => setFile(e.target.files[0])}
                                placeholder='picture'
                                className='hidden'
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