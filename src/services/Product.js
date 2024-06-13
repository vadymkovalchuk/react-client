export const getProducts = async (setter) => { 
    let response = await fetch('http://localhost:5270/products');
    let data = await response.json();
    setter(data);
}
