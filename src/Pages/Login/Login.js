import React, { useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import useFirebase from '../../Hooks/useFirebase';

const Login = () => {
    const { signInWithEmail } = useFirebase();
    const emailRef = useRef('');
    const passwordRef = useRef('');

    const handleSubmit = event => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        signInWithEmail(email, password);
    }

    return (
        <div className='container w-50 mx-auto'>
            <h1>Log in to Singer Inventory System</h1>
            <Form onSubmit={handleSubmit}>

                <Form.Group className="mb-5" controlId="formBasicEmail">
                    <Form.Control ref={emailRef} type="email" placeholder="Enter email" required/>
                </Form.Group>

                <Form.Group className="mb-5" controlId="formBasicPassword">
                    <Form.Control ref={passwordRef} type="password" placeholder="Password" required/>
                </Form.Group>
                <Button variant="danger w-25 d-block mx-auto" type="submit">
                    Log In
                </Button>
            </Form>
        </div>
    );
};

export default Login;