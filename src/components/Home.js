import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getCustomers, deleteCustomer, updateCustomer, addCustomer } from '../services/Customer';

const Home = ({socket, setCustomerId, setCustomers, customers, employeeId, employees}) => {
  const navigate = useNavigate();

  let currentEmployee = employees.find(e => e.employeeID == employeeId);
  let fullName = currentEmployee.firstName + " " + currentEmployee.lastName + " (" + currentEmployee.employeeID + ")";
  
  const [chatHistory, setChatHistory] = useState([]);
  const [messageToSend, setMessageToSend] = useState('');
  const [subscriptionEstablished, setSubscriptionEstablished] = useState(false);
  const [customerIdInEditMode, setCustomerIdInEditMode] = useState(null);

  // fields that are being edited
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');

  if(!subscriptionEstablished)
  {
    setSubscriptionEstablished(true);
    socket.on('message', (message) => {
      setChatHistory((prevHistory) => [message, ...prevHistory]);
    });
  }

  const sendMessage = (e) => {
    e.preventDefault();
    if(messageToSend)
    {
      socket.emit('message', { time: new Date(), name: fullName, text: messageToSend });
      setMessageToSend('');
    }
  };

  useEffect(
    () =>
      {
        getCustomers(setCustomers);
      }
  , []);

  const saveNewHandler = (e) =>
    {
      addCustomer(firstName, middleName, lastName, setCustomers);
      setCustomerIdInEditMode(null);
      navigate('/home');
    }

    const openCustomerHandler = (e, customerId) =>
    {
      setCustomerId(customerId);
      navigate('/customer');
    }

  const editCustomerHandler = (e, customerId) =>
  {
    setCustomerIdInEditMode(customerId);
  }

  const saveEditHandler = (e, customerId) =>
    {
      updateCustomer(customerId, firstName, middleName, lastName, setCustomers);
      setCustomerIdInEditMode(null);
      navigate('/home');
    }

  const cancelEditHandler = (e, customerId) =>
    {
      setCustomerIdInEditMode(null);
      navigate('/home');
    }

  const deleteCustomerHandler = (e, customerId) =>
  {
    deleteCustomer(customerId, setCustomers);
    navigate('/home');
  }
  
  return (
    <div>
      <div className="HomeCustomersView">
        <h2>Customers</h2>
        <button onClick={(e) => { e.preventDefault(); navigate('/home')}}>Refresh</button>
        <div><button onClick={(e) => { e.preventDefault(); saveNewHandler(e)}}>Add</button>
            First Name: <input defaultValue="" onChange={(e) => setFirstName(e.target.value)}/> Middle Name: <input defaultValue="" onChange={(e) => setMiddleName(e.target.value)}/> Last Name: <input defaultValue="" onChange={(e) => setLastName(e.target.value)}/></div>
        <div>
        {
        customers.map((customer) => 
        <div key={customer.customerID}>
          {customer.customerID !== customerIdInEditMode &&
            <div><button onClick={(e) => { e.preventDefault(); editCustomerHandler(e, customer.customerID)}}>Edit</button> <button onClick={(e) => { e.preventDefault(); deleteCustomerHandler(e, customer.customerID)}}>Delete</button>
            <a href="#" onClick={(e) => { e.preventDefault(); openCustomerHandler(e, customer.customerID)}}>{customer.customerID} First: {customer.firstName} Middle: {customer.middleName} Last: {customer.lastName}</a></div>
          }
          {customer.customerID === customerIdInEditMode &&
            <div><button onClick={(e) => { e.preventDefault(); saveEditHandler(e, customer.customerID)}}>Save</button> <button onClick={(e) => { e.preventDefault(); cancelEditHandler(e, customer.customerID)}}>Cancel</button>
            {customer.customerID} First: <input defaultValue={customer.firstName} onChange={(e) => setFirstName(e.target.value)}/> Middle: <input defaultValue={customer.middleName} onChange={(e) => setMiddleName(e.target.value)}/> Last: <input defaultValue={customer.lastName} onChange={(e) => setLastName(e.target.value)}/></div>
          }
        </div>
        )
        }
        </div>
      </div>
      <div className="HomeChat">
          <h1>Hello {fullName}</h1>
          <h3>Send your message to your colleagues:</h3> 
          <form onSubmit={sendMessage}>
            <input id="message" type="text" value={messageToSend} onChange={(e) => setMessageToSend(e.target.value)}/>
            <button>Send</button>
          </form>
          <h2>Messages from your colleagues</h2>
          <div>
            {chatHistory.map((message, index) => (
              <div key={index}>
                At {message.time} {message.name} wrote: {message.text}
              </div>
          ))}
          </div>
      </div>
    </div>
  );
};

export default Home;