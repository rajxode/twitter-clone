


import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { getAllPostsThunk , postSelector } from '../Redux/Reducers/postReducer';

// loading spinner
import Loader from './Spinner';

// render a single post
import SinglePost from './SinglePost';


// show all the post in database
export default function AllPost(){

    const dispatch = useDispatch();

    // all post
    const { allPosts, loading } = useSelector(postSelector);

    // get all the post
    useEffect(() => {
        async function getPost(){
            dispatch(getAllPostsThunk());
        }
        getPost();
    },[]);

    return(
        <>
            <div className="h-2/3 w-full p-2 flex flex-col">
                { 
                    loading
                    ?
                    <Loader />
                    :
                    // render each post
                    allPosts.map((post) => <SinglePost key={post._id} post={post} />)
                
                }
            </div>
        </>
    )
}