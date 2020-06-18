import React, { Component } from 'react';
import CustomerService from "./CustomerService";

const customerService = new CustomerService();

class CustomerCreateUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount = () => {
        const { match: { params } } = this.props;
        if (params && params.pk ) {
            {
                customerService.getCustomer(params.pk).then((c) => {
                    this.setState({
                        first_name:  c.first_name,
                        last_name:  c.last_name,
                        email:  c.email,
                        phone:  c.phone,
                        address:  c.address,
                        description:  c.description,
                    })
                })
            }
        }
    }

    handleCreate = () => {
        customerService.createCustomer(
            this.state
        ).then((result) => {
            alert("Customer created!");
        }).catch(() => {
            alert('There was an error! Please re-check your form.')
        })
    }

    handleUpdate = (pk) => {
        customerService.updateCustomer(
            {
                "pk":  pk,
                "first_name":  this.state.first_name,
                "last_name":  this.state.last_name,
                "email":  this.state.email,
                "phone":  this.state.phone,
                "address":  this.state.address,
                "description":  this.state.description
            }
        ).then((result) => {
            alert("Customer updated!");
        }).catch(() => {
            alert('There was an error! Please re-check your form.');
        })
    }

    handleSubmit = (event) => {
        const { match: { params }} = this.props;
        if (params && params.pk){
           this.handleUpdate(params.pk);
        } else {
            this.handleCreate();
        }
        event.preventDefault();
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return(
            <form onSubmit={ this.handleSubmit }>
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Customers</h4>
                    <div className='form-group'>
                        <label>First Name</label>
                        <input
                            className="form-control"
                            type="text"
                            name="first_name"
                            onChange={ this.handleChange }
                            value={ this.state.first_name }
                        />

                        <label>Last Name</label>
                        <input
                            className="form-control"
                            type="text"
                            name="last_name"
                            onChange={ this.handleChange }
                            value={ this.state.last_name }
                        />

                        <label>Email</label>
                        <input
                            className="form-control"
                            type="text"
                            name="email"
                            onChange={ this.handleChange }
                            value={ this.state.email }
                        />

                        <label>Phone</label>
                        <input
                            className="form-control"
                            type="text"
                            name="phone"
                            onChange={ this.handleChange }
                            value={ this.state.phone }
                        />

                        <label>Address</label>
                        <input
                            className="form-control"
                            type="text"
                            name="address"
                            onChange={ this.handleChange }
                            value={ this.state.address }
                        />

                        <label>Description</label>
                        <textarea
                            className="form-control"
                            name="description"
                            onChange={ this.handleChange }
                            value={ this.state.description }
                        />
                    </div>
                        <input className="btn btn-primary" type="submit" value="Submit" />
                        <a className="btn btn-success"  href="/">Atras</a>
                    </div>
                </div>
            </form>
        )
    }
}

export default CustomerCreateUpdate;