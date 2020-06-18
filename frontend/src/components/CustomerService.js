import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class CustomerService {

    getCustomers = () => {
        const url = `${API_URL}/api/customers/`;
        return axios.get(url).then(response => response.data);
    }

    getCustomerByUrl = (link) => {
        const url = `${API_URL}${link}`;
    }

    getCustomer = (pk) => {
        const url = `${API_URL}/api/customers/${pk}`;
        return axios.get(url).then(response => response.data);
    }

    deleteCustomer = (customer) => {
        const url = `${API_URL}/api/customers/${customer.pk}`;
        return axios.delete(url);
    }

    createCustomer = (customer) => {
        const url = `${API_URL}/api/customers/`;
        return axios.post(url, customer);
    }

    updateCustomer = (customer) => {
        const url = `${API_URL}/api/customers/${customer.pk}`;
        return axios.put(url, customer);
    }
}