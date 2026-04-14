import React from 'react';
import useAuth from '../hooks/UseAuth';
import useRole from '../hooks/useRole';

const RiderRoutes = ({children}) => {
    const {loading, user}= useAuth()
    const {role, roleLoading} = useRole()

    if(loading || !user || roleLoading){
        return <span className="loading loading-infinity loading-xl"></span>

    }

    if(role !== 'rider'){
        return <Forbidden></Forbidden>
    }

    return children;
};

export default RiderRoutes;