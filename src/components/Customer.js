import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getCustomerOrders, addCustomerOrder } from '../services/Customer';
import Chat from './Chat';
import CustomerOrdersList from './lists/CustomerOrdersList';
import NewCustomerOrderForm from './forms/NewCustomerOrderForm';

const Customer = ({refreshKey, doRefresh, employeeId, customerId, employees, customers, products, chatHistory, sendMessage}) => {
  const navigate = useNavigate();

  const [customerOrders, setCustomerOrders] = useState([]);

   // fields that are being edited

   useEffect(
     () =>
       {
         getCustomerOrders(customerId, setCustomerOrders);
       }
   , [refreshKey]);

  return (<div>
        <button onClick={(e) => { e.preventDefault(); doRefresh()}}>Refresh</button>
        <button onClick={(e) => { e.preventDefault(); navigate('/home')}}>Back to Customers</button>

        <NewCustomerOrderForm products={products} addCustomerOrder={(productId, quantity) => { addCustomerOrder({"customerID": customerId, "salesPersonID": employeeId, "productID": productId, "quantity": quantity}, setCustomerOrders); sendMessage('New order created for customer ' + customerId + ' by ' + employeeId, 'system'); doRefresh()}}/>
        <CustomerOrdersList employeeId={employeeId} employees={employees} customerId={customerId} customers={customers} products={products} customerOrders={customerOrders}/>
        <Chat refreshKey={refreshKey} doRefresh={doRefresh} chatHistory={chatHistory} sendMessage={sendMessage} employeeId={employeeId} employees={employees}/>
      </div>
    );
};

export default Customer;
