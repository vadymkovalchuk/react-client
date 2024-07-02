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

  const [chatHistory, setChatHistory] = useState([]);
  const [subscriptionEstablished, setSubscriptionEstablished] = useState(false);

  const [refreshKey, setRefreshKey] = useState(0);

  if(!subscriptionEstablished)
  {
    setSubscriptionEstablished(true);
    socket.on('message', (message) => {
      setChatHistory((prevHistory) => [message, ...prevHistory]);
      refresh();
    });
  }

  const refresh = () => {
    setRefreshKey(rk => rk + 1);
  }

  const sendMessage = (message, type) => {
    if(message)
    {
      let currentEmployee = employees.find(e => e.employeeID == employeeId);
      let fullName = currentEmployee.firstName + " " + currentEmployee.lastName + " (" + currentEmployee.employeeID + ")";
      socket.emit('message', { time: new Date(), name: fullName, text: message, type: type });
    }
  };

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
          <Route path="/home" element={<Home refreshKey={refreshKey} doRefresh={refresh} setCustomerId={setCustomerId} setCustomers={setCustomers} customers={customers} employeeId={employeeId} employees={employees} chatHistory={chatHistory} sendMessage={sendMessage}/>}></Route>
          <Route path="/customer" element={<Customer refreshKey={refreshKey} doRefresh={refresh} employeeId={employeeId} customerId={customerId} employees={employees} customers={customers} products={products} chatHistory={chatHistory} sendMessage={sendMessage}/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
