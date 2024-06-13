import './App.css';
import { useEffect, useState } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Customer from './components/Customer';

import { getEmployees } from './services/Employee';
import { getProducts } from './services/Product';

import socketio from 'socket.io-client';

const socket = socketio.connect("http://localhost:3001");

function App() {

  const [employeeId, setEmployeeId] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [customerId, setCustomerId] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(
    () =>
      {
        getEmployees(setEmployees);
        getProducts(setProducts);
      }
  , []);

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Login setEmployeeId={setEmployeeId} employees={employees}/>}></Route>
          <Route path="/home" element={<Home socket={socket} setCustomerId={setCustomerId} setCustomers={setCustomers} customers={customers} employeeId={employeeId} employees={employees}/>}></Route>
          <Route path="/customer" element={<Customer employeeId={employeeId} customerId={customerId} employees={employees} customers={customers} products={products}/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
