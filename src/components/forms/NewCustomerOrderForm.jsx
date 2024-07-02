import {useState} from 'react';

const NewCustomerOrderForm = (props) => {
    return (
        <div>
            <h3>New Customer Order</h3>
            <form onSubmit={(e) => { e.preventDefault(); props.addCustomerOrder(e.target.ddProductId.value, e.target.txtQuantity.value)}}>
            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <td><select id="ddProductId">
                        {props.products.map((product) => <option value={product.productID} key={product.productID}>{product.name + ' @' + product.price}</option>) }
                        </select>
                    </td>
                    <td><input defaultValue="0" id="txtQuantity"/></td>
                </tr>              
                </tbody>
            </table>
            <div><button type="submit">Add New Order</button></div>
            </form>
        </div>
    )
}

export default NewCustomerOrderForm;
