import React, { Component } from 'react';
import CustomerService from "./CustomerService";

const customerService = new CustomerService();

class CustomerList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            nextPageUrl: ''
        }

        this.nextPage = this.nextPage.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount = () => {
        let self = this;
        customerService.getCustomers().then(function(result) {
            self.setState({
                customers: result.data,
                nextPageUrl: result.nextlink
            })
        })
    }

    handleDelete = (e, pk) => {
        let self = this;
        customerService.deleteCustomer({pk: pk}).then(() => {
            let newArr = self.state.customers.filter(function(obj) {
                return obj.pk !== pk;
            })
            self.setState({
                customers: newArr
            })
        })
    }

    nextPage = () => {
        let self = this;
        customerService.getCustomerByUrl(this.state.nextPageUrl).then((result) => {
            self.setState({
                customers: result.data,
                nextPageUrl: result.nextlink
            })
        })
    }

    render() {
        return(
            <div className="customers--list">
                <table className="table">
                    <thead key="thead">
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.customers.map(c =>
                                <tr key={ c.pk }>
                                    <td>{ c.pk }</td>
                                    <td>{ c.first_name }</td>
                                    <td>{ c.last_name }</td>
                                    <td>{ c.phone }</td>
                                    <td>{ c.email }</td>
                                    <td>{ c.address }</td>
                                    <td>{ c.description }</td>
                                    <td>
                                        <button className="btn btn-warning" onClick={(e) => this.handleDelete(e, c.pk)} >
                                            Eliminar
                                        </button>
                                        <a className="btn btn-success" href={ "/customer/" + c.pk }>Actualizar</a>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                <button className="btn btn-primary" onClick={ this.nextPage }>Siguiente</button>
            </div>
        )
    }
}

export default CustomerList;