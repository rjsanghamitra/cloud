import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setPosts } from "../../state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const posts = useSelector((state) => state.posts);

  const getPosts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/posts', {
        withCredentials: true,
      });
    
      const data = response.data;
      dispatch(setPosts({ posts: data }));
    } catch (error) {
      console.error('Error during GET request:', error);
    }
  };

  const getUserPosts = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/posts/${userId}/posts`, {
        withCredentials: true,
      });
    
      const data = response.data;
      dispatch(setPosts({ posts: data }));
    } catch (error) {
      console.error('Error during GET request:', error);
    }
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picture,
          userPicture,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picture={picture}
            userPicture={userPicture}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;
