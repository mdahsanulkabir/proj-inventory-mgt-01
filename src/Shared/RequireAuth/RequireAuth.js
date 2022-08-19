import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useLocation, Navigate } from 'react-router-dom';

const RequireAuth = ( { children } ) => {
    const [user, loading, error] = useAuthState(auth);

    let location = useLocation();
    if(!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
};

export default RequireAuth;