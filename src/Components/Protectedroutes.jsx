import React from 'react';
import { Navigate } from 'react-router';
import Panel from './Panel/Panel'


// const ProtectedRoute = ({ children }) => {
  //   const token = localStorage.getItem('token');
  //   if (!token) {
  //     return <Navigate to="/login" />;
  //   }
  
  //   return children;
  // };
  const Adminchk = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return <Navigate to="/Login" />;
    }
  
    return <Panel />;
  };
  // const Admincash = () => {
  //   const token = localStorage.getItem('admintoken');
  //   if (!token) {
  //     return <Navigate to="/login" />;
  //   }
  
  //   return < Admincah/>;
  // };
  // const Homechk = () => {
  
  //   const token = localStorage.getItem('token');
    
  //   if (token) {
      
  //       return <Dash />;
  //   }
  //   else {
        
  //       return <Home />;
  
  //   }

  // }
  
export  {Adminchk};
  