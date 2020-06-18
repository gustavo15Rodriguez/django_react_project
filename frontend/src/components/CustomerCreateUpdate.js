import React, { Component } from 'react';
import CustomerService from "./CustomerService";

const customerService = new CustomerService();

class CustomerCreateUpdate extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount = () => {
        const { match: { params } } = this.props;
        if (params && params.pk ) {
            {
                customerService.getCustomer(params.pk).then((c) => {
                    this.refs.firstName.value  =  c.first_name;
                    this.refs.lastName.value  =  c.last_name;
                    this.refs.email.value  =  c.email;
                    this.refs.phone.value  =  c.phone;
                    this.refs.address.value  =  c.address;
                    this.refs.description.value  =  c.description;
                })
            }
        }
    }

    handleCreate = () => {
        customerService.createCustomer(
            {
                "first_name": this.refs.firstName.value,
                "last_name":  this.refs.lastName.value,
                "email":  this.refs.email.value,
                "phone":  this.refs.phone.value,
                "address":  this.refs.address.value,
                "description":  this.refs.description.value
            }
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
                "first_name":  this.refs.firstName.value,
                "last_name":  this.refs.lastName.value,
                "email":  this.refs.email.value,
                "phone":  this.refs.phone.value,
                "address":  this.refs.address.value,
                "description":  this.refs.description.value
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

    render() {
        return(
            <form onSubmit={ this.handleSubmit }>
                <div className='form-group'>
                    <label>First Name</label>
                    <input className="form-control" type="text" ref="firstName" />

                    <label>Last Name</label>
                    <input className="form-control" type="text" ref="lastName" />

                    <label>Email</label>
                    <input className="form-control" type="text" ref="email" />

                    <label>Phone</label>
                    <input className="form-control" type="text" ref="phone" />

                    <label>Address</label>
                    <input className="form-control" type="text" ref="address" />

                    <label>Description</label>
                    <textarea className="form-control" ref="description" />

                    <input className="btn btn-primary" type="submit" value="Submit" />
                </div>
            </form>
        )
    }
}

export default CustomerCreateUpdate;