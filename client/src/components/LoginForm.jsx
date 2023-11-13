import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Login = (props) => {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error, data }] = useMutation(LOGIN_USER);

    // update state based on form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    // submit form
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);
        try {
            const { data } = await login({
                variables: { ...formState },
            });

            Auth.login(data.login.token);
        } catch (e) {
            console.error(e);
        }

        // clear form values
        setFormState({
            email: '',
            password: '',
        });
    };

    return (
        <main className="flex-row justify-center mb-4">
            <div className="col-12 col-lg-10">
                <div className="card">
                    <h4 className="card-header bg-dark text-light p-2">Login</h4>
                    <div className="card-body">
                        {data ? (
                            <p>
                                Success! You may now head{' '}
                                <Link to="/">back to the homepage.</Link>
                            </p>
                        ) : (
                            <Form onSubmit={handleFormSubmit}>
                                <Form.Group className='mb-3'>
                                    <Form.Label htmlFor='email'>Email</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Your email'
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
                                    disabled={!(formState.email && formState.password)}
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

export default Login;

{/* <>
<Form noValidate validated={validated} onSubmit={handleFormSubmit}>
    <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
        Something went wrong with your login credentials!
    </Alert>
    <Form.Group className='mb-3'>
        <Form.Label htmlFor='email'>Email</Form.Label>
        <Form.Control
            type='text'
            placeholder='Your email'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
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
            onChange={handleInputChange}
            value={userFormData.password}
            required
        />
        <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
    </Form.Group>
    <Button
        disabled={!(userFormData.email && userFormData.password)}
        type='submit'
        variant='success'>
        Submit
    </Button>
</Form>
</> */}