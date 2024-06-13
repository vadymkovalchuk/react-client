export const getEmployees = async (setter) => {
  let response = await fetch('http://localhost:5270/employees');
  let data = await response.json();
  setter(data);
}
