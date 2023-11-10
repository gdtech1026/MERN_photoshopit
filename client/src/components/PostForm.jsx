import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_PHOTO } from '../../utils/mutations';

import Auth from '../../utils/auth';

const PostForm = ({ userId }) => {
    const [photo, setPhoto] = useState('');

    const [addPhoto, { error }] = useMutation(ADD_PHOTO);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const data = await addPhoto({
                variables: { userId, photo },
            });

            setPhoto('');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h4> Post Your Photo Flip </h4>

            {Auth.loggedIn() ? (
                <form
                    className="flex-row justify-center justify-space-between-md align-center"
                    onSubmit={handleFormSubmit}
                >
                    <div className="col-12 col-lg-9">
                        <input
                            placeholder="Post Photo Flip..."
                            value={photo}
                            className="form-input w-100"
                            onChange={(event) => setPhoto(event.target.value)}
                        />
                    </div>

                    <div className="col-12 col-lg-3">
                        <button className="btn btn-info btn-block py-3" type="submit">
                            Post Photo Flip
                        </button>
                    </div>
                    {error && (
                        <div className="col-12 my-3 bg-danger text-white p-3">
                            {error.message}
                        </div>
                    )}
                </form>
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
