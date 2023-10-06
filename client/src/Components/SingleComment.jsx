
import { deleteCommentThunk } from "../Redux/Reducers/postReducer";
import { useSelector , useDispatch } from "react-redux";
import { authSelector } from "../Redux/Reducers/authReducer";

// toast notification
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SingleComment(props){

    const dispatch = useDispatch();
    const { loggedInUser } = useSelector(authSelector);
    const { _id , content , user } = props.comment;

    const deleteComment = async (e) => {
        try {
            e.preventDefault();
            const result = await dispatch(deleteCommentThunk({id:_id,userId: loggedInUser._id}));
            if(result.payload.success){
                toast.success(result.payload.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="w-full h-auto flex justify-between border-b border-slate-300 px-2 py-1">
                <div className="w-[95%] h-full">
                    {content}
                </div>
                
                {
                    loggedInUser._id === user
                    ?
                    <div className="w-auto h-full cursor-pointer hover:text-red-500"
                        onClick={deleteComment}>
                        <i class="fa-solid fa-trash"></i>
                    </div>
                    :
                    null
                }
                
            </div>
        </>
    )
}