import React, { useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';


const Login = () => {

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    
    const emailRef = useRef('');
    const passwordRef = useRef('');

    const handleSignIn = event => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        signInWithEmailAndPassword(email, password)
        
    }

    if (error) {
        return (
            <div>
                <p>Error: {error.message}</p>
            </div>
        );
    }
    if (loading) {
        return <p>Loading...</p>;
    }
    if (user) {
        return (
        <div>
            <p>Signed In User: {user?.email}</p>
        </div>
        );
    }

    return (
        <div className='container w-50 mx-auto'>
            <h1>Log in to Singer Inventory System</h1>
            <Form onSubmit={handleSignIn}>

                <Form.Group className="mb-5" controlId="formBasicEmail">
                    <Form.Control ref={emailRef} type="email" placeholder="Enter email" required/>
                </Form.Group>

                <Form.Group className="mb-5" controlId="formBasicPassword">
                    <Form.Control ref={passwordRef} type="password" placeholder="Password" required/>
                </Form.Group>
                <Button variant="danger w-25 d-block mx-auto" type="submit">
                    Log In ...
                </Button>
            </Form>
        </div>
    );
};

export default Login;