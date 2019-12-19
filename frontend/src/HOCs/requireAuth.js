import React from 'react';
import { useSelector } from  'react-redux';

export const requireAuth = ComposedComponent => props => {
    const authenticated = useSelector(state => state.auth.token);
      
    if(!authenticated) props.history.push("/signin");
    
    return <ComposedComponent {...props} />
} 