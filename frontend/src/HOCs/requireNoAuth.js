import React from 'react';
import { useSelector } from  'react-redux';

export const requireNoAuth = ComposedComponent => props => {
    const authenticated = useSelector(state => state.auth.token);
        
    if(authenticated) props.history.push("/");
    
    return <ComposedComponent {...props} />
}