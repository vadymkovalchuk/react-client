import {useState} from 'react';

const CustomerOrdersList = (props) => {

    let currentCustomer = props.customers.find(e => e.customerID == props.customerId);
    let fullCustomerName = currentCustomer.firstName + " " + currentCustomer.lastName + " (" + currentCustomer.customerID + ")";

    const getSalesPersonDescription = (salesPersonID) => {
        let salesPerson = props.employees.find((e) => e.employeeID == salesPersonID); 
        return salesPerson.firstName + " " + salesPerson.lastName + " (" + salesPerson.employeeID + ")" 
     }
     const getProductDescription = (productID) => {
        let product = props.products.find((p) => p.productID == productID); 
        return product.name + " (@" + product.price + ")";
     }

    return (<div>
        <h2>Orders for customer {fullCustomerName}</h2>
        <table>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Salesperson</th>
                        <th>Product</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    { props.customerOrders.length > 0 ? (
                        props.customerOrders.sort((a, b) => a.orderID > b.orderID ? 1 : -1).map(order => {
                            const { orderID, salesPersonID, productID, quantity } = order;
                            return (
                                <tr key={orderID}>
                                    <td>{orderID}</td>
                                    <td>{getSalesPersonDescription(salesPersonID)}</td>
                                    <td>{getProductDescription(productID)}</td>
                                    <td>{quantity}</td>
                                </tr>
                            )
                        })
                        ) : (
                        <tr>
                            <td colSpan={4}>No orders - add a new one</td>
                        </tr>
                    )
                    }
                </tbody>
            </table>
        </div>
        );
}

export default CustomerOrdersList;
