
import { useDispatch, useSelector } from 'react-redux';
import SideBar from '../Components/SideBar';
import { authSelector } from '../Redux/Reducers/authReducer';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toggelFollowThunk } from '../Redux/Reducers/authReducer';

// toast notification
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function UserProfile(){
    
    const dispatch = useDispatch();
    const { loggedInUser , userProfile } = useSelector(authSelector);
    const navigate = useNavigate();

    useEffect(() => {
        if(!userProfile){
            navigate('/');
        }
    },[userProfile]);


    const handleFollowClick = async(e) => {
        try {
            e.preventDefault();
            const result = await dispatch(toggelFollowThunk({id:loggedInUser._id,userId:userProfile._id}));
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
        <div className="h-full w-[78%] flex justify-between">
            <div className=" w-[68%] h-full rounded flex flex-col">

                <div className='w-full h-[45px] px-2 flex items-center shadow shrink-0'>
                    <span className='font-semibold'>
                        {/* {loggedInUser.name}     */}
                        { userProfile.name }
                    </span>
                    
                </div>

                <div className='w-full h-full flex flex-col'>

                    <div className='w-full h-3/5 flex flex-col justify-between'>
                        
                        <div className='w-full h-3/5 relative'>
                            <div className='w-full h-3/4 bg-slate-200 border-b-4 border-white'></div>

                            <div className='w-full h-1/4 '>
                                    <button className='float-right px-2 py-1 mt-2 mr-2 border border-slate-400 rounded-full'
                                            onClick={handleFollowClick}>
                                        Follow
                                    </button>
                            </div>
                            <div className='h-1/2 w-[22%] top-[50%] left-3 absolute bg-red-950 rounded-full border-4 border-white overflow-hidden'>
                                {
                                    userProfile.photo
                                    ?
                                    <img src={userProfile.photo.secure_url} alt='avatar' className='h-full w-full'/>
                                    :
                                    <img src={require('../Assets/icons/dummy-avatar.jpg')} alt='avatar' className='h-full w-full'/>
                                }
                            </div>
                        </div>
                        
                        <div className='w-full h-1/4 px-3'>
                            <h1 className='font-bold text-xl'>
                                {userProfile.name}
                            </h1>
                            <small className='font-semibold text-slate-400 text-base'>
                                {userProfile.email}
                            </small>
                            <p className='font-semibold text-slate-400'>
                                <i class="fa-solid fa-calendar-days"></i>
                                &nbsp;
                                Joined On: 
                                {userProfile.createdAt.slice(0,10)}
                            </p>
                            <div className='w-full h-auto flex'>
                                <div className='mx-2'>
                                    <p className='text-slate-400'>
                                        <span className='font-semibold text-black'>
                                            {userProfile.followers.length} 
                                        </span>
                                        &nbsp;
                                        followers
                                    </p>
                                </div>
                                
                                <div className='mx-2'>
                                    <p className='text-slate-400'>
                                        <span className='font-semibold text-black'>
                                            {userProfile.follows.length} 
                                        </span>
                                        &nbsp;
                                        following
                                    </p>
                                </div>
                            </div>
                            
                        </div>
                        
                        <div className='w-full h-[10%] border-b border-slate-400 flex font-semibold'>
                            <div className="w-1/3 flex items-center justify-center border-r ">
                                Post
                            </div>
                            <div className="w-1/3 flex items-center justify-center border-r">
                                Likes
                            </div>
                            <div className="w-1/3 flex items-center justify-center border-r">
                                Comments
                            </div>
                        </div>
                    </div>
                    
                    <div className='w-full h-2/5 p-2'>
                        {
                            // userPosts.map((post) => <SinglePost key={post._id} post={post} />)
                        }
                    </div>
                </div>
            </div>

            <SideBar parent={'home'} />
        </div>
    )
}