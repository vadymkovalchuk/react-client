import {useState} from 'react';

const CustomersList = (props) => {

    const defaultCustomer = {customerID: null, firstName: '', middleName: '', lastName: ''};
    const [customerInEditMode, setCustomerInEditMode] = useState(defaultCustomer);

    const updateCustomerAttribute = (e) => {
        const {name, value} = e.target;
        setCustomerInEditMode({...customerInEditMode, [name]: value});
    }

    return (
        <div>
            <h3>Customers List</h3>
            <table>
                <thead>
                    <tr>
                        <th>Customer ID</th>
                        <th>First Name</th>
                        <th>Middle Name</th>
                        <th>Last Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { props.customers.length > 0 ? (
                        props.customers.sort((a, b) => a.customerID > b.customerID ? 1 : -1).map(customer => {
                            const {customerID, firstName, middleName, lastName} = customer;
                            return (
                                    customerID !== customerInEditMode.customerID ? ( 
                                    <tr key={customerID}>
                                        <td>{customerInEditMode.customerID == null ? (
                                            <a href="#" onClick={(e) => { e.preventDefault(); props.openCustomer(customerID)}}>{customerID}</a>
                                            ) : (<div>{customerID}</div>)}
                                        </td>
                                        <td>{firstName}</td><td>{middleName}</td><td>{lastName}</td>
                                        <td>
                                            {(customerInEditMode.customerID == null ? (
                                            <div>
                                            <button onClick={() => setCustomerInEditMode({customerID: customerID, firstName: firstName, middleName: middleName, lastName: lastName})}>Edit</button>
                                            <button onClick={() => props.deleteCustomer(customerID)}>Delete</button>
                                            </div>
                                            ) : (<div/>))}
                                        </td>
                                    </tr>
                                    ) :
                                    (
                                        <tr key={customerID}>
                                            <td>{customerID}</td>
                                            <td><input type="text" value={customerInEditMode.firstName} name="firstName" onChange={updateCustomerAttribute} /></td>
                                            <td><input type="text" value={customerInEditMode.middleName} name="middleName" onChange={updateCustomerAttribute} /></td>
                                            <td><input type="text" value={customerInEditMode.lastName} name="lastName" onChange={updateCustomerAttribute} /></td>
                                            <td>
                                                <button onClick={() => {props.updateCustomer(customerInEditMode); setCustomerInEditMode(defaultCustomer);}}>Save</button>
                                                <button onClick={() => setCustomerInEditMode(defaultCustomer)}>Cancel</button>
                                            </td>
                                        </tr>
                                    )                            
                            )
                        })
                    ) : (
                        <tr>
                            <td colSpan={4}>No customers - add a new one</td>
                        </tr>
                    )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default CustomersList;
