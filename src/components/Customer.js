import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getCustomerOrders, addCustomerOrder } from '../services/Customer';

//const Customer = ({employeeId, customerId, employees, products, customers}) => {
const Customer = ({employeeId, customerId, employees, customers, products}) => {
  const navigate = useNavigate();

console.log(products);

   let currentCustomer = customers.find(e => e.customerID == customerId);
   let fullCustomerName = currentCustomer.firstName + " " + currentCustomer.lastName + " (" + currentCustomer.customerID + ")";
  
   const [customerOrders, setCustomerOrders] = useState([]);

   // fields that are being edited

   useEffect(
     () =>
       {
         getCustomerOrders(customerId, setCustomerOrders);
       }
   , []);

   const saveNewHandler = (e) =>
     {
        e.preventDefault();
        console.log(e.target.ddProductId);
       addCustomerOrder(customerId, employeeId, e.target.ddProductId.value, e.target.txtQuantity.value, setCustomerOrders);
       navigate('/customer');
     }

     const getSalesPersonDescription = (salesPersonID) => {
        let salesPerson = employees.find((e) => e.employeeID == salesPersonID); 
        return salesPerson.firstName + " " + salesPerson.lastName + " (" + salesPerson.employeeID + ")" 
     }
     const getProductDescription = (productID) => {
        let product = products.find((p) => p.productID == productID); 
        return product.name + " (@" + product.price + ")";
     }
  
  return (<div>
    <h2>Orders for customer {fullCustomerName}</h2>
        <button onClick={(e) => { e.preventDefault(); navigate('/customer')}}>Refresh</button>
        <button onClick={(e) => { e.preventDefault(); navigate('/home')}}>Back to Customers</button>
        <div>
        <form onSubmit={saveNewHandler}>
            <button>Add</button>
            Product: <select id="ddProductId">
                {products.map((product) => <option value={product.productID} key={product.productID}>{product.name + ' @' + product.price}</option>) }
            </select>
            Quantity: <input defaultValue="0" id="txtQuantity"/>
        </form>
        </div>
        <div>
        {
        customerOrders.map((order) => 
        <div key={order.orderID}>
            ID {order.orderID}, Sales Person {getSalesPersonDescription(order.salesPersonID)}, Product {getProductDescription(order.productID)}, Quantity {order.quantity}
        </div>
        )
        }
        </div>

    </div>
    );
};

export default Customer;
