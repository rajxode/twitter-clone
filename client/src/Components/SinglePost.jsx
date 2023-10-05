import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../Redux/Reducers/authReducer";
import { useState } from "react";
import { likePostThunk } from "../Redux/Reducers/postReducer";


export default function SinglePost(props){

    const { _id , content , user, likes, comments} = props.post;
    const dispatch = useDispatch();
    const { loggedInUser } = useSelector(authSelector);
    const [showComment,setShowComment] = useState(false);
    const [ isLiked, setISLiked ] = useState(false);

    const handleLikeClick = async (e) => {
        try {
            const data = { userId: loggedInUser._id, postId:_id }
            const result = await dispatch(likePostThunk(data));
            console.log(result);
            setISLiked(result.payload.success);
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <>
            <div className="w-full h-auto p-2 my-1 flex flex-col rounded border border-slate-400 shadow-md">
                
                <div className="w-full flex">
                    <div className="w-[10%] h-[55px] bg-red-400 rounded-full mr-1">
                        
                    </div>
                    
                    <div className="w-[88%] flex flex-col">
                        <div className="w-full mb-1 font-bold">
                            {user.name}
                            <span className="float-right w-auto h-auto px-1 rounded-full hover:bg-blue-200">
                                <button>
                                    <i class="fa-solid fa-ellipsis"></i>
                                </button>
                            </span>
                        </div>
                        <div className="w-full">
                            {content}
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
                    <div className="w-full px-1 border-t mt-1 flex flex-col">
                        <h1 className="text-lg font-semibold">
                            Comments
                        </h1>
                        <div className="w-full h-auto py-2">

                        </div>
                        
                        <div className="w-full h-[45px] py-1">
                            <form className="w-full h-full flex ">
                                <input className="w-full h-full border border-slate-500 border-r-0 rounded-l-full focus:outline-none px-2"/>

                                <button className="w-auto h-full border border-slate-500 border-l-0 rounded-r-full px-3">
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