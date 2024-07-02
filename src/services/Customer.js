export const getCustomers = async (setter) => {
    let response = await fetch('http://localhost:5270/customers');
    let data = await response.json();
    setter(data);
}

export const addCustomer = (newCustomer, setter) => {
    fetch('http://localhost:5270/customer', {method: "POST", headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
        ,body: JSON.stringify(newCustomer)});
    getCustomers(setter);
}

export const deleteCustomer = (customerId, setter) => {
    fetch('http://localhost:5270/customer/' + customerId, {method: "DELETE"});
    getCustomers(setter);
}

export const updateCustomer = (customer, setter) => {
    fetch('http://localhost:5270/customer', {method: "PUT", headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
        , body: JSON.stringify(customer)});
    getCustomers(setter);
}

export const getCustomerOrders = async (customerId, setter) => {
    let response = await fetch('http://localhost:5270/customer/' + customerId + '/orders');
    let data = await response.json();
    setter(data);
}

export const addCustomerOrder = (customerOrder, setter) => {
    fetch('http://localhost:5270/order', {method: "POST", headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
        ,body: JSON.stringify(customerOrder)});
    getCustomerOrders(customerOrder.customerId, setter);
}
