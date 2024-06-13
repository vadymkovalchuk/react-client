export const getCustomers = async (setter) => {
    let response = await fetch('http://localhost:5270/customers');
    let data = await response.json();
    setter(data);
}

export const addCustomer = (firstName, middleName, lastName, setter) => {
    fetch('http://localhost:5270/customer', {method: "POST", headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
        ,body: JSON.stringify({"firstName": firstName, "middleName": middleName, "lastName": lastName})});
    getCustomers(setter);
}

export const deleteCustomer = (customerId, setter) => {
    fetch('http://localhost:5270/customer/' + customerId, {method: "DELETE"});
    getCustomers(setter);
}

export const updateCustomer = (customerId, firstName, middleName, lastName, setter) => {
    fetch('http://localhost:5270/customer', {method: "PUT", headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
        , body: JSON.stringify({"customerID":customerId, "firstName": firstName, "middleName": middleName, "lastName": lastName})});
    getCustomers(setter);
}

export const getCustomerOrders = async (customerId, setter) => {
    let response = await fetch('http://localhost:5270/customer/' + customerId + '/orders');
    let data = await response.json();
    setter(data);
}

export const addCustomerOrder = (customerId, salesPersonId, productId, quantity, setter) => {
    console.log(JSON.stringify({"customerID": customerId, "salesPersonID": salesPersonId, "productID": productId, "quantity": quantity}));
    fetch('http://localhost:5270/order', {method: "POST", headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
        ,body: JSON.stringify({"customerID": customerId, "salesPersonID": salesPersonId, "productID": productId, "quantity": quantity})});
    getCustomerOrders(customerId, setter);
}
