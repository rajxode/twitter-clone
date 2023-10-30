

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authSelector, setUserProfile } from "../Redux/Reducers/authReducer";
import { useEffect, useState } from "react";
import { addCommentThunk, deletePostThunk, likePostThunk } from "../Redux/Reducers/postReducer";

// toast notification
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SingleComment from "./SingleComment";


// to render a single post on homepage
export default function SinglePost(props){

    const { _id , content , user, likes, comments, photo} = props.post;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loggedInUser } = useSelector(authSelector);
    const [showPostMenu, setShowPostMenu] = useState(false);
    const [showComment,setShowComment] = useState(false);
    const [ comment , setComment ] = useState('');
    const [ isLiked, setISLiked ] = useState(false);
    
    useEffect(() => {
        for (let index = 0; index < likes.length; index++) {
            if(likes[index].user === loggedInUser._id){
                setISLiked(true);
                break;
            }
        }
    },[]);
    
    const deletePost = async (e) => {
        try {
            e.preventDefault();
            const result = await dispatch(deletePostThunk({_id, userId: loggedInUser._id}));
            if(result.payload.success){
                toast.success(result.payload.message);
                setShowComment(false);
                setShowPostMenu(false);
            }
        } catch (error) {
            console.log(error);
        }
    }
    

    const handleLikeClick = async (e) => {
        try {
            e.preventDefault();
            console.log('called');
            const data = { userId: loggedInUser._id, postId:_id }
            const result = await dispatch(likePostThunk(data));
            setISLiked(result.payload.success);
        } catch (error) {
            console.log(error);
        }
    }

    const handleAddComment = async (e) => {
        try{
            e.preventDefault();
            const data = { content:comment , userId: loggedInUser._id, postId:_id }
            const result = await dispatch(addCommentThunk(data));
            if(result.payload.success){
                toast.success(result.payload.message);
                setComment('');
            }
        } catch(error){
            console.log(error);
        }
    }


    const handleClick = (e) => {
        e.preventDefault();
        if(user._id === loggedInUser._id){
            navigate('/home/profile');
        }
        else{
            dispatch(setUserProfile(user));
            navigate('/home/userprofile');
        }
    }


    return(
        <>
            <div className="w-full h-auto p-2 my-1 flex flex-col hover:bg-[#f7f5f5] dark:hover:bg-slate-500 border-b">
                
                <div className="w-full flex">
                    <div className="w-[45px] h-[45px] rounded-full mr-1 overflow-hidden">
                        {
                            user.photo
                            ?
                            <img src={user.photo.secure_url} alt='avatar' className='h-full w-full'/>
                            :
                            <img src={require('../Assets/icons/dummy-avatar.jpg')} alt='avatar' className='h-full w-full'/>
                        }
                    </div>
                    
                    <div className="w-[88%] flex flex-col">
                        <div className="w-full mb-1 font-bold relative">
                            <span className="hover:underline cursor-pointer"
                                onClick={handleClick}>
                                {user.name}
                            </span>

                            {
                                user._id === loggedInUser._id
                                ?
                                <span className="float-right w-auto h-auto px-1 rounded-full 
                                            hover:bg-blue-200">
                                    <button onClick={() => setShowPostMenu(!showPostMenu)}>
                                        
                                        {
                                            showPostMenu
                                            ?
                                            <i class="fa-solid fa-xmark"></i>
                                            :
                                            <i class="fa-solid fa-ellipsis"></i>
                                        }
                                        
                                    </button>
                                </span>   
                                :
                                null
                            }

                                {
                                    showPostMenu
                                    ?
                                    <div className="w-auto absolute px-1 right-0 bg-[#F1EFEF] 
                                            text-sm shadow-md rounded float-right cursor-pointer dark:bg-slate-600"
                                        onClick={deletePost}>
                                        <span className="text-red-500 dark:text-white">
                                            <i class="fa-solid fa-trash"></i>
                                        </span>
                                        &nbsp;
                                        Delete
                                    </div>
                                    :
                                    null
                                }
                        </div>

                        <div className="w-full">
                            {content}
                            <div className="w-full h-auto">
                                {
                                    photo
                                    ?
                                    <img src={photo.secure_url} alt="post_image" className="w-[95%] h-auto" />
                                    :
                                    null
                                }
                            </div>
                        </div>
                        <div className="w-full flex justify-between ">
                            
                            <span className="hover:text-blue-400">
                                <button onClick={() => setShowComment(!showComment)}>
                                    <i class="fa-regular fa-comment"></i>
                                </button>
                                &nbsp;{comments.length}
                            </span>

                            <span className="hover:text-red-400">
                                <button onClick={handleLikeClick}>
                                    {
                                        isLiked 
                                        ?
                                        <i class="fa-solid fa-heart"></i>
                                        :
                                        <i class="fa-regular fa-heart"></i>
                                    }
                                </button>
                                &nbsp;{likes.length} 
                            </span>
                            
                            <span className="hover:text-green-400">
                                <button>
                                    <i class="fa-solid fa-repeat"></i>
                                </button> 
                            </span>

                        </div>
                    </div>
                </div>

                {
                    showComment
                    ?
                    <div className="w-full h-auto max-h-[200px] px-1 border-t mt-1 flex flex-col">
                        <h1 className="text-lg font-semibold mt-1">
                            Comments
                            <span className="float-right cursor-pointer hover:text-red-400"
                                    onClick={() => setShowComment(!showComment)}>
                                <i class="fa-solid fa-xmark"></i>
                            </span>
                        </h1>
                        <div className="w-full h-2/3 py-2 text-black overflow-y-scroll">
                            {comments.map((comment) => <SingleComment key={comment._id} comment={comment} /> )}
                        </div>
                        
                        <div className="w-full h-[45px] py-1 shrink-0">
                            <form className="w-full h-full flex" onSubmit={handleAddComment}>
                                <input className="w-full h-full border border-slate-500 border-r-0 
                                            rounded-l-full focus:outline-none px-2"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        required
                                        placeholder="Say something...."/>

                                <button className="w-auto h-full border border-slate-500 
                                            border-l-0 rounded-r-full px-3"
                                        onClick={handleAddComment}>
                                    <i class="fa-solid fa-paper-plane"></i>
                                </button>
                            </form>
                        </div>
                    </div>
                    :
                    null
                }
            </div>
        </>
    )
}