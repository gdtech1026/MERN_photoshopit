import { Form, Button } from 'react-bootstrap';

import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = () => {
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [addUser, { error, data }] = useMutation(ADD_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);

        try {
            const { data } = await addUser({
                variables: { ...formState },
            });

            Auth.login(data.addUser.token);
        } catch (e) {
            console.error(e);
        }
    };

    return (

        <main className="flex-row justify-center mb-4">
            <div className="col-12 col-lg-10">
                <div className="card">
                    <h4 className="card-header bg-dark text-light p-2">Sign Up</h4>
                    <div className="card-body">
                        {data ? (
                            <p>
                                Success! You may now head{' '}
                                <Link to="/">back to the homepage.</Link>
                            </p>
                        ) : (
                            <Form onSubmit={handleFormSubmit}>

                                <Form.Group className='mb-3'>
                                    <Form.Label htmlFor='username'>Username</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Your username'
                                        name='username'
                                        onChange={handleChange}
                                        value={formState.username}
                                        required
                                    />
                                    <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className='mb-3'>
                                    <Form.Label htmlFor='email'>Email</Form.Label>
                                    <Form.Control
                                        type='email'
                                        placeholder='Your email address'
                                        name='email'
                                        onChange={handleChange}
                                        value={formState.email}
                                        required
                                    />
                                    <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className='mb-3'>
                                    <Form.Label htmlFor='password'>Password</Form.Label>
                                    <Form.Control
                                        type='password'
                                        placeholder='Your password'
                                        name='password'
                                        onChange={handleChange}
                                        value={formState.password}
                                        required
                                    />
                                    <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
                                </Form.Group>
                                <Button
                                    disabled={!(formState.username && formState.email && formState.password)}
                                    type='submit'
                                    variant='success'>
                                    Submit
                                </Button>
                            </Form>
                        )}

                        {error && (
                            <div className="my-3 p-3 bg-danger text-white">
                                {error.message}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>

    );
};

export default Signup;
