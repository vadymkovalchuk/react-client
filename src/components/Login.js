import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({employees, setEmployeeId}) => {
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setEmployeeId(e.target.ddEmployeeId.value);
    navigate('/home');
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign in to Order Management (choose your Employee ID)</h2>
      <select id="ddEmployeeId">
        {employees.map((employee) => <option value={employee.employeeID} key={employee.employeeID}>{employee.firstName + ' ' + employee.lastName}</option>) }
      </select>
      <button>Sign In</button>
    </form>
  );
};

export default Login;