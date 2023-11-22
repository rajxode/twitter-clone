import React from 'react'
import { postSelector } from '../Redux/Reducers/postReducer'
import { useSelector } from 'react-redux';
import SinglePost from './SinglePost';

function MyPosts() {

    const { userPosts } = useSelector(postSelector);

    return (
        <>
            {
                userPosts
                .map((post) => <SinglePost key={post._id} post={post} />)
            }
        </>
    )
}

export default MyPosts