import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Row } from 'react-bootstrap';
import { ADD_COMMENT } from '../utils/mutations';

import Auth from '../utils/auth';

const AddChat = ({ photoId }) => {
    const [commentBody, setCommentBody] = useState('');
    const [imageLink, setImageLink] = useState('');
    const [characterCount, setCharacterCount] = useState(0);

    const [addComment, { error }] = useMutation(ADD_COMMENT);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            await addComment({
                variables: {
                    photoId,
                    commentBody,
                    imageLink,
                    username: Auth.getUser().data.username,
                    createdAt: new Date().toISOString(),
                    likes: 0,
                    dislikes: 0,
                },
            });

            setCommentBody('');
            setImageLink('');
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'commentBody' && value.length <= 280) {
            setCommentBody(value);
            setCharacterCount(value.length);
        }
    };

    return (
        <div>
            <h4>What are your comments to this photo?</h4>

            {Auth.loggedIn() ? (
                <>
                    <p
                        className={`m-0 ${characterCount === 280 || error ? 'text-danger' : ''
                            }`}
                    >
                        Character Count: {characterCount}/280
                        {error && <span className="ml-2">{error.message}</span>}
                    </p>
                    <form
                        className="flex-row justify-center justify-space-between-md align-center"
                        onSubmit={handleFormSubmit}
                    >
                        <div className="col-12 col-lg-9">
                            <textarea
                                name="commentBody"
                                placeholder="Enter your comment..."
                                value={commentBody}
                                className="form-input w-100"
                                style={{ lineHeight: '1.5', resize: 'vertical' }}
                                onChange={handleChange}
                            ></textarea>
                        </div>

                     
                        <div className="col-12 col-lg-9">
                            <textarea
                            name="imageLink"
                            placeholder="Enter the image link here..."
                            value={imageLink}
                            className="form-input w-100"
                            style={{ lineHeight: '0.5' }}
                            onChange={handleChange}
                            >
                            </textarea>
                        </div>

                        <div className="col-12 text-center">
                            <button type="submit">
                                Add Comment
                            </button>
                        </div>
                        
                    </form>
                </>
            ) : (
                <p>
                    You need to be logged in to share your comments and photos. Please{' '}
                    <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
                </p>
            )}
        </div>
    );
};

export default AddChat;