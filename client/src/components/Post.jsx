import { useState } from 'react';
import PostForm from './PostForm';

function Post() {
    const [post, setPost] = useState([]);

    // Function to add a bucket list item
    const addPostPhoto = (photo) => {
        console.log(
            'File: Post.jsx ~ line 10 ~ addPostPhoto ~ photo',
            photo
        );
        // Check to see if the photo image link is active
        if (!photo.imagelink) {
            return;
        }

        // Add the new bucket list item to the existing array of objects
        const newPost = [photo, ...post];
        console.log(newPost);

        // Call setPost to update state with our new set of Posted Items
        setPost(newPost);
    };

    return (
        <div>
            <h1>What is on your Post?</h1>
            <PostForm onSubmit={addPostPhoto} />
            <Post
                photo={photo}
            ></Post>
        </div>
    );
}

export default Post;
