import React from 'react';
import {  Outlet } from 'react-router-dom';

const Display = () => {
  return (
    <div>
    
      <Outlet></Outlet>
      
    </div>
  );
};

export default Display;