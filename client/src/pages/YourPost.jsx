import { useParams } from 'react-router-dom';

import { useQuery } from '@apollo/client';

import Post from '../components/Post';
import PostForm from '../components/PostForm';

import Chat from '../components/Chat';
import AddChat from '../components/AddChat';

import { GET_PHOTO } from '../utils/queries';

const YourPost = () => {

    const { photoId } = useParams();

    const { loading, data } = useQuery(GET_PHOTO ,{
        variables:{
        photoId:
        photoId },
    });
    const photo = data?.photo || [];

    if (loading) {
        return <div>Loading please wait...</div>;
      }

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
                        <div>Loading you posts please wait...</div>
                    ) : (
                        <Post
                            photo={photo}
                            title="Your Posts"
                        />
                    )}

                        <div>
                            {photo.description}
                        </div>

                        <div className="p-5">
                            <Chat comments={photo.comments} />
                        </div>

                        <p>This comment was made at {photo.date}</p>

                        <p>------------------------------------------</p>

                        <div>
                            <AddChat photoId={photo._id} />
                        </div>

                </div>
            </div>
        </main>
    );
};

export default YourPost;