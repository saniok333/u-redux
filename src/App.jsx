import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import {
  addCustomerAction,
  removeCustomerAction,
  removeCustomersAction,
} from './store/customerReducer';
import { fetchCustomers } from './asyncActions/customers';

function App() {
  const dispatch = useDispatch();
  const cash = useSelector((state) => state.cash.cash);
  const customers = useSelector((state) => state.customers.customers);
  const addCash = (sum) => {
    dispatch({ type: 'ADD_CASH', payload: sum });
  };
  const getCash = (sum) => {
    dispatch({ type: 'GET_CASH', payload: sum });
  };
  const addClient = (name) => {
    const customer = {
      name,
      id: Date.now(),
    };
    dispatch(addCustomerAction(customer));
  };
  const removeCustomer = (id) => {
    dispatch(removeCustomerAction(id));
  };
  const removeCustomers = () => {
    dispatch(removeCustomersAction());
  };
  const addManyCustomers = () => {
    dispatch(fetchCustomers());
  };

  return (
    <>
      <div className="App">
        <div style={{ display: 'flex' }}>
          <div>{cash}</div>
          <button onClick={() => addCash(Number(prompt()))}>ADD CASH</button>
          <button onClick={() => getCash(Number(prompt()))}>GET CASH</button>
          <button onClick={() => addClient(prompt())}>ADD CLIENT</button>
          <button onClick={removeCustomers}>DELETE CLIENTS</button>
          <button onClick={addManyCustomers}>ADD MANY CLIENTS</button>
        </div>
      </div>
      {customers.length > 0 ? (
        <div>
          {customers.map((customer) => (
            <div key={customer.id} onClick={() => removeCustomer(customer.id)}>
              {customer.name}
            </div>
          ))}
        </div>
      ) : (
        <div>Clients are absent!</div>
      )}
    </>
  );
}

export default App;
