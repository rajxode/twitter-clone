import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../Redux/Reducers/authReducer";


export default function SinglePost(props){

    const { content , user, likes, comments, createdAt} = props.post;
    const dispatch = useDispatch();
    const { loggedInUser } = useSelector(authSelector);


    const handleLikeClick = async (e) => {
        try {
            const result = dispatch();
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <>
            <div className="w-full h-auto p-2 my-1 flex rounded border border-slate-400 shadow-md">
                
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
                            <button>
                                <i class="fa-regular fa-comment"></i>
                            </button>
                            &nbsp;{comments.length}
                        </span>

                        <span className="hover:text-red-400">
                            <button onClick={handleLikeClick}>
                                <i class="fa-regular fa-heart"></i>
                            </button>
                            &nbsp;{likes.length} 
                        </span>
                        
                        <span className="hover:text-green-400">
                            <button>
                                <i class="fa-solid fa-repeat"></i>
                            </button>
                            &nbsp;{likes.length} 
                        </span>

                    </div>
                </div>
            </div>
        </>
    )
}