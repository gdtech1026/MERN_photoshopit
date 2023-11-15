import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_PHOTO } from '../utils/mutations';
import { GET_PHOTO } from '../utils/queries';
import Auth from '../utils/auth';

const PostForm = () => {
    const [Title, setTitle] = useState('');
    const [imageLink, setImageLink] = useState('');
    const [description, setDescription] = useState('');

    // const [addPhoto, { error }] = useMutation(ADD_PHOTO, {
    //     refetchQueries: [
    //         GET_PHOTO,
    //         'getPhoto'
    //     ]
    // });

    const [addPhoto, { error, data }] = useMutation(ADD_PHOTO);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            console.log("addphoto", {
                photoOwner: Auth.getUser().data.username,
                imageLink,
                title: Title,
                description,
                
            })
            await addPhoto({
                variables: {
                    photoOwner: Auth.getUser().data.username,
                    imageLink,
                    title: Title,
                    description,
                },
            });

            setDescription('');
            setImageLink('');
            setTitle('');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h4> Post Your Photo Flip </h4>

            {Auth.loggedIn() ? (
                <>
                    <form
                        className="flex-row justify-center justify-space-between-md align-center"
                        onSubmit={handleFormSubmit}
                    >
                        <div className="col-12 col-lg-9 ">
                            <input
                                placeholder="Post title of your work"
                                value={Title}
                                className="form-input w-100"
                                onChange={(event) => setTitle(event.target.value)}
                            />
                        </div>

                        <div className="col-12 col-lg-9">
                            <input
                                placeholder="Image link"
                                value={imageLink}
                                className="form-input w-100"
                                onChange={(event) => setImageLink(event.target.value)}
                            />
                        </div>

                        <div className="col-12 col-lg-9">
                            <input
                                placeholder="Post description"
                                value={description}
                                className="form-input w-100"
                                onChange={(event) => setDescription(event.target.value)}
                            />
                        </div>

                        <div className="col-12 col-lg-3">
                            <button type="submit" >
                                Post Photo Flip
                            </button>
                        </div>
                        {error && (
                            <div className="col-12 my-3 bg-danger text-white p-3">
                                {error.message}
                            </div>
                        )}
                    </form>

                </>

            ) : (
                <p>
                    You need to be logged in to endorse skills. Please{' '}
                    <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
                </p>
            )}
        </div>
    );
};

export default PostForm;
