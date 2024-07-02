import {useState} from 'react';

const NewCustomerForm = (props) => {
    const [customer, setCustomer] = useState({firstName: '', middleName: '', lastName: ''});

    const updateCustomerAttribute = (e) => {
        const {name, value} = e.target;
        setCustomer({...customer, [name]: value});
    }

    return (
        <div>
            <h3>New Customer</h3>
            <form onSubmit={(e) => { e.preventDefault(); props.addCustomer(customer)}}>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Middle Name</th>
                        <th>Last Name</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <td><input type="text" value={customer.firstName} name="firstName" onChange={updateCustomerAttribute} /></td>
                    <td><input type="text" value={customer.middleName} name="middleName" onChange={updateCustomerAttribute} /></td>
                    <td><input type="text" value={customer.lastName} name="lastName" onChange={updateCustomerAttribute} /></td>
                </tr>              
                </tbody>
            </table>
            <div><button type="submit">Add New Customer</button></div>
            </form>
        </div>
    )
}

export default NewCustomerForm;
