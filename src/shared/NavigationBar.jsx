import React from 'react';
import { IoHomeOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const NavigationBar = () => {
  const navigate = useNavigate();

  const handleNavigate = (route) => {
    navigate(route);
  };

  return (
    <div style={{ width: '100%', height: '40px', boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', padding: '0 20px' }}>
      <div onClick={() => handleNavigate("/")} style={{ display: 'flex', alignItems: 'center', cursor: "pointer", marginRight: '20px' }}>
        <IoHomeOutline />
        <p style={{ marginLeft: '5px' }}>Dashboard</p>
      </div>
      <div onClick={() => handleNavigate("/register")} style={{ display: 'flex', alignItems: 'center', cursor: "pointer", marginRight: '20px' }}>
        <IoHomeOutline />
        <p style={{ marginLeft: '5px' }}>Registro</p>
      </div>
    </div>
  );
};

export default NavigationBar;
