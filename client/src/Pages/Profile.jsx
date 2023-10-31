
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SideBar from '../Components/SideBar';
import { authSelector, getLoggedInUserThunk, setLoggedInUser } from '../Redux/Reducers/authReducer';
import { getMyPostThunk, postSelector } from '../Redux/Reducers/postReducer';
import SinglePost from '../Components/SinglePost';
import { useEffect } from 'react';
import Loader from '../Components/Spinner';


// to show logged in user's profile
export default function Profile(){

    const navigate = useNavigate();
    const { loggedInUser , isLoading } = useSelector(authSelector); 
    const { userPosts } = useSelector(postSelector);
    const dispatch = useDispatch();

    if(!loggedInUser){
        navigate('/');
    }

    useEffect(() => {
        document.title = `${loggedInUser.name} | Profile`
        async function getPost(){
            await dispatch(getMyPostThunk(loggedInUser._id));
        }
        getPost();
    },[]);

    const { name , email , createdAt , photo , followers , follows } = loggedInUser;
    const date = createdAt.slice(0,10);


    return(
        <div className="h-full w-full px-1 md:px-0 md:w-[90%] lg:w-[78%] flex justify-between">

            {

                isLoading
                ?
                <Loader />
                :
                <>
                <div className="w-full md:w-[68%] h-full rounded flex flex-col">

                    <div className='w-full h-[45px] px-2 flex items-center shadow shrink-0'>
                        <span className='font-semibold'>
                            {name}    
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
                                <div className='h-[125px] w-[125px] top-[50%] left-3 absolute bg-red-950 rounded-full border-4 border-white overflow-hidden'>
                                    {
                                        photo
                                        ?
                                        <img src={photo.secure_url} alt='avatar' className='h-full w-full'/>
                                        :
                                        <img src={require('../Assets/icons/dummy-avatar.jpg')} alt='avatar' className='h-full w-full'/>
                                    }
                                </div>
                            </div>
                            
                            <div className='w-full h-1/4 px-3'>
                                <h1 className='font-bold text-xl'>
                                    {name}
                                </h1>
                                <small className='font-semibold text-slate-400 text-base'>
                                    {email}
                                </small>
                                <p className='font-semibold text-slate-400'>
                                    <i class="fa-solid fa-calendar-days"></i>
                                    &nbsp;
                                    Joined On: {date}
                                </p>
                                <div className='w-full h-auto flex'>
                                    <div className='mx-2'>
                                        <p className='text-slate-400'>
                                            <span className='font-semibold text-black dark:text-white'>
                                                {followers.length} 
                                            </span>
                                            &nbsp;
                                            followers
                                        </p>
                                    </div>
                                    
                                    <div className='mx-2'>
                                        <p className='text-slate-400'>
                                            <span className='font-semibold text-black dark:text-white'>
                                                {follows.length} 
                                            </span>
                                            &nbsp;
                                            following
                                        </p>
                                    </div>
                                </div>
                                
                            </div>
                            
                            <div className='w-full h-[10%] border-b border-slate-400 flex justify-center items-center font-semibold'>
                                Posts
                            </div>
                        </div>
                        
                        <div className='w-full h-2/5 p-2'>
                            {
                                userPosts.map((post) => <SinglePost key={post._id} post={post} />)
                            }
                        </div>
                    </div>
                </div>

                <SideBar parent={'profile'} />
            </>
            }
        </div>
    )
}