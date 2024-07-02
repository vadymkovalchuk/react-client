import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCustomers, deleteCustomer, updateCustomer, addCustomer } from '../services/Customer';

import CustomersList from './lists/CustomersList';
import NewCustomerForm from './forms/NewCustomerForm';
import Chat from './Chat';

const Home = ({refreshKey, doRefresh, setCustomerId, setCustomers, customers, employeeId, employees, chatHistory, sendMessage}) => {
  const navigate = useNavigate();

  useEffect(
    () =>
      {
        getCustomers(setCustomers);
      }
  , [refreshKey]);

  return (
    <div>
      <div className="HomeCustomersView">
        <h2>Customers</h2>
        <button onClick={(e) => { e.preventDefault(); doRefresh()}}>Refresh</button>
        <NewCustomerForm addCustomer={(customer) => { addCustomer(customer, setCustomers); sendMessage('New customer created by ' + employeeId, 'system'); doRefresh()}}/>
        <CustomersList customers={customers} 
          deleteCustomer={(customerId) => { deleteCustomer(customerId, setCustomers); doRefresh()}} 
          updateCustomer={(customer) => { updateCustomer(customer, setCustomers); doRefresh()}} 
          openCustomer={(customerId) => {setCustomerId(customerId); navigate('/customer');}} />
      </div>
      <div>
          <Chat refreshKey={refreshKey} doRefresh={doRefresh} chatHistory={chatHistory} sendMessage={sendMessage} employeeId={employeeId} employees={employees}/>
      </div>
    </div>
  );
};

export default Home;