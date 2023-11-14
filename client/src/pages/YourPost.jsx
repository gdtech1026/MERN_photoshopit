import { useQuery } from '@apollo/client';

import Post from '../components/Post';
import PostForm from '../components/PostForm';

import { GET_PHOTO } from '../utils/queries';

const YourPost = () => {
    const { loading, data } = useQuery(GET_PHOTO);
    const photo = data?.photo || [];

    return (
        <main>
            <div className="flex-row justify-center">
                <div
                    className="col-12 col-md-10 mb-3 p-3"
                    style={{ border: '1px dotted #1a1a1a' }}
                >
                    <PostForm />
                </div>
                <div className="col-12 col-md-8 mb-3">
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <Post
                            photo={photo}
                            title="Your Posts"
                        />
                    )}
                </div>
            </div>
        </main>
    );
};

export default YourPost;