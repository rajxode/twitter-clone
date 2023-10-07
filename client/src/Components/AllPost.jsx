
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { addPostThunk, getAllPostsThunk, getFollowPostThunk, postSelector } from '../Redux/Reducers/postReducer';

import Loader from './Spinner';

import SinglePost from './SinglePost';

export default function AllPost(){

    const dispatch = useDispatch();

    const { allPosts, loading } = useSelector(postSelector);

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
                    allPosts.map((post) => <SinglePost key={post._id} post={post} />)
                
                }
            </div>
        </>
    )
}