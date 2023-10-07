
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, toggelFollowThunk } from '../Redux/Reducers/authReducer';

// toast notification
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SingleUser(props) {

    const dispatch = useDispatch();
    const { loggedInUser } = useSelector(authSelector);
    const { parent } = props;
    const {name,email,_id,photo} = props.user;

    const handleFollowClick = async(e) => {
        try {
            e.preventDefault();
            const result = await dispatch(toggelFollowThunk({id:loggedInUser._id,userId:_id}));
            if(!result.payload.success){
                toast.error(result.payload.message);
            }
            else{
                toast.success(result.payload.message);
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    return(
        <>
            <div className="w-full p-1 h-[50px] my-1 flex justify-between">
                
                <div className="w-[42px] h-full rounded-full overflow-hidden">
                    {
                        photo
                        ?
                        <img src={photo.secure_url} alt='avatar' className='h-full w-full'/>
                        :
                        <img src={require('../Assets/icons/dummy-avatar.jpg')} alt='avatar' className='h-full w-full'/>
                    }
                </div>
                
                <div className="w-[50%] px-1 h-full flex flex-col justify-start">
                    <span className="font-semibold">
                        {name}
                    </span>
                    <span className="text-sm text-slate-500">
                        {email}
                    </span>
                </div>
                
                <div className="w-auto  h-full flex justify-center items-center">
                    <button className="rounded-full px-2 py-[2px] bg-black 
                                text-white text-sm font-semibold shadow-md"
                            onClick={handleFollowClick}>
                        { 
                            parent === 'home'
                            ?
                            loggedInUser.follows.includes(_id) ? 'Unfollow' : "Follow" 
                            :
                            'Unfollow'
                        }
                    </button>
                </div>
            </div>
        </>
    )
}