

import { useSelector } from 'react-redux';
import { postSelector } from '../Redux/Reducers/postReducer';
import SinglePost from './SinglePost';

function MyLikes() {

  const { likedPosts } = useSelector(postSelector);
  return (
    <>
      {
        likedPosts
        .map((post) => <SinglePost key={post.post._id} post={post.post} />)
      }
    </>
  )
}

export default MyLikes