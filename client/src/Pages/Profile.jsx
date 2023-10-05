
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SideBar from '../Components/SideBar';
import { authSelector, getLoggedInUserThunk } from '../Redux/Reducers/authReducer';
import { getAllPostThunk, postSelector } from '../Redux/Reducers/postReducer';
import SinglePost from '../Components/SinglePost';
import { useEffect } from 'react';

export default function Profile(){

    const navigate = useNavigate();
    const { loggedInUser } = useSelector(authSelector); 
    const { userPosts } = useSelector(postSelector);
    const dispatch = useDispatch();

    if(!loggedInUser){
        navigate('/home');
    }

    useEffect(() => {
        async function getPost(){
            console.log('getpsot',userPosts);
            await dispatch(getAllPostThunk(loggedInUser._id));
        }
        getPost();
    },[])

    return(
        <div className="h-full w-[78%] flex justify-between">
            <div className=" w-[68%] h-full rounded shadow-md flex flex-col">

                <div className='w-full h-[45px] px-2 flex items-center shrink-0'>
                    <span className='font-semibold'>
                        {loggedInUser.name}    
                    </span>
                    
                </div>

                <div className='w-full h-full flex flex-col'>

                    <div className='w-full h-3/5 flex flex-col justify-between'>
                        
                        <div className='w-full h-3/5 relative'>
                            <div className='w-full h-3/4 bg-slate-200 border-b-4 border-white'></div>

                            <div className='w-full h-1/4 '>
                                <NavLink to='/home/settings'>
                                    <button className='float-right px-2 py-1 mt-2 mr-2 border border-slate-400 rounded-full'>
                                        Edit Profile
                                    </button>
                                </NavLink>
                            </div>
                            <div className='h-1/2 w-[22%] top-[50%] left-3 absolute bg-red-950 rounded-full border-4 border-white'>

                            </div>
                        </div>
                        
                        <div className='w-full h-1/4 px-3'>
                            <h1 className='font-bold text-xl'>
                                {loggedInUser.name}
                            </h1>
                            <small className='font-semibold text-slate-400 text-base'>
                                {loggedInUser.email}
                            </small>
                            <p className='font-semibold text-slate-400'>
                                <i class="fa-solid fa-calendar-days"></i>
                                &nbsp;
                                Joined On: {loggedInUser.createdAt.slice(0,10)}
                            </p>
                            <div className='w-full h-auto flex'>
                                <div className='mx-2'>
                                    <p className='text-slate-400'>
                                        <span className='font-semibold text-black'>
                                            {loggedInUser.followers.length} 
                                        </span>
                                        &nbsp;
                                        followers
                                    </p>
                                </div>
                                
                                <div className='mx-2'>
                                    <p className='text-slate-400'>
                                        <span className='font-semibold text-black'>
                                            {loggedInUser.follows.length} 
                                        </span>
                                        &nbsp;
                                        following
                                    </p>
                                </div>
                            </div>
                            
                        </div>
                        
                        <div className='w-full h-[10%] border-b border-slate-400 flex font-semibold'>
                            <div className="w-1/4 flex items-center justify-center border-r ">Post</div>
                            <div className="w-1/4 flex items-center justify-center border-r">Likes</div>
                            <div className="w-1/4 flex items-center justify-center border-r">Comments</div>
                            <div className="w-1/4 flex items-center justify-center border-r">Retweet</div>
                        </div>
                    </div>
                    
                    <div className='w-full h-2/5 bg-slate-100 p-2'>
                        {
                            userPosts.map((post) => <SinglePost key={post._id} post={post} />)
                        }
                    </div>
                </div>
            </div>

            <SideBar parent={'profile'} />
        </div>
    )
}