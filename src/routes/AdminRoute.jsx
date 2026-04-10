import React from 'react';
import useAuth from '../hooks/UseAuth';
import useRole from '../hooks/useRole';
import Forbidden from '../components/Forbidden/Forbidden';

const AdminRoute = ({children}) => {
    const {user, loading}= useAuth()
    const {role, roleLoading} = useRole()

    if(loading || roleLoading){
        return <span className="loading loading-infinity loading-xl"></span>

    }

    if(role !== 'admin'){
        return <Forbidden></Forbidden>
    }

    return children;
};

export default AdminRoute;