import React, { Component } from 'react';
import { BrowserRouter as Router, Link, NavLink } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createAddress } from '../../actions/UsersAction';
import { getCountryList } from '../../actions/DashboardAction';

const initialFieldState = { city_name: '', first_name: '', last_name: '', email: '', phone: '', apartment: '', zip: '', state_code: '', country_code: '', street: '' };

class AddNewAddress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: Object.assign({}, initialFieldState),
            errors: {},
            formValidationInit: false
        };
    }

    componentDidMount() {
        this.props.getCountryList();
    }

    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let isValid = true;

        for (const prop in fields) {
            const isFilled = fields[prop].join ? fields[prop].length : fields[prop];
            !isFilled ? (isValid = false, errors[prop] = 'Cannot be empty') : errors[prop] = '';
        }
        
        !fields["phone"].match(/^[0-9]+$/) && (isValid = false, errors["phone"] = "Only Numbers");

        if (typeof fields["email"] !== "undefined") {
            let lastAtPos = fields["email"].lastIndexOf('@');
            let lastDotPos = fields["email"].lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
                isValid = false;
                errors["email"] = "Email is not valid";
            }
        }

        this.setState({ errors: errors });
        return isValid;
    }

    handleChange(event, field) {
        let fields = this.state.fields;
        fields[field] = event.target.value;
        this.setState({ fields });
        this.state.formValidationInit && this.handleValidation();
    }

    createAddress = event => {
        event.preventDefault();
        if (this.handleValidation()) {
            this.props.createAddress(this.state.fields);
            this.setState({ fields: Object.assign({}, initialFieldState) });
        } else {
            this.setState({ formValidationInit: true });
        }
    }

    render() {
        return (
            <div>
                <h3>Add New Address</h3>
                {(this.props.lastAddressCreated.failure || this.props.lastAddressCreated.success) && <div style={{ paddingBottom: '20px', display: 'inline-block' }}>
                    <span style={{ color: 'red' }}>{((this.props.lastAddressCreated || {}).failure || {}).message}</span>
                    <span style={{ color: 'green' }}>{((this.props.lastAddressCreated || {}).success || {}).message}</span>
                </div>}
                <form onSubmit={this.createAddress}>
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label htmlFor="first_name">First Name</label>
                                <input onChange={(event) => this.handleChange(event, 'first_name')} value={this.state.fields['first_name']} type="text" className="form-control" id="first_name" name="first_name" />
                                <span style={{ color: "red" }}>{this.state.errors['first_name']}</span>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label htmlFor="last_name">Lastname</label>
                                <input onChange={(event) => this.handleChange(event, 'last_name')} value={this.state.fields['last_name']} type="text" className="form-control" id="last_name" name="last_name" />
                                <span style={{ color: "red" }}>{this.state.errors['last_name']}</span>
                            </div>
                        </div>
                    </div>
                    {/* <!-- /.row --> */}

                    <div className="row">
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label htmlFor="apartment">Apartment</label>
                                <input onChange={(event) => this.handleChange(event, 'apartment')} value={this.state.fields['apartment']} type="text" className="form-control" id="apartment" name="apartment" />
                                <span style={{ color: "red" }}>{this.state.errors['apartment']}</span>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label htmlFor="street">Street</label>
                                <input onChange={(event) => this.handleChange(event, 'street')} value={this.state.fields['street']} type="text" className="form-control" id="street" name="street" />
                                <span style={{ color: "red" }}>{this.state.errors['street']}</span>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-6 col-md-3">
                            <div className="form-group">
                                <label htmlFor="country_code">Country</label>
                                
                                <select onChange={(event) => this.handleChange(event, 'country_code')} value={this.state.fields['country_code']} className="form-control" id="country_code" name="country_code">
                                    <option value="">Select</option>
                                    {(this.props.countryList.list || []).map(item => {
                                        return <option value={item.country_code} key={item.country_code}>{item.country_name}</option>
                                    })}
                                </select>
                                
                                <span style={{ color: "red" }}>{this.state.errors['country_code']}</span>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-3">
                            <div className="form-group">
                                <label htmlFor="state_code">State</label>
                                <select onChange={(event) => this.handleChange(event, 'state_code')} value={this.state.fields['state_code']} className="form-control" id="state_code" name="state_code">
                                    <option value="">Select</option>
                                    <option value="DL">Delhi</option>
                                    <option value="KA">Karnatkta</option>
                                    <option value="MH">Maharashtra</option>
                                    <option value="TN">Tamil Nadu</option>
                                </select>
                                <span style={{ color: "red" }}>{this.state.errors['state_code']}</span>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-3">
                            <div className="form-group">
                                <label htmlFor="city_name">City</label>
                                <input onChange={(event) => this.handleChange(event, 'city_name')} value={this.state.fields['city_name']} type="text" className="form-control" id="city_name" name="city_name" />
                                <span style={{ color: "red" }}>{this.state.errors['city_name']}</span>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-3">
                            <div className="form-group">
                                <label htmlFor="zip">ZIP</label>
                                <input onChange={(event) => this.handleChange(event, 'zip')} value={this.state.fields['zip']} type="text" className="form-control" id="zip" name="zip" />
                                <span style={{ color: "red" }}>{this.state.errors['zip']}</span>
                            </div>
                        </div>

                        <div className="col-sm-6">
                            <div className="form-group">
                                <label htmlFor="phone">Telephone</label>
                                <input onChange={(event) => this.handleChange(event, 'phone')} value={this.state.fields['phone']} type="text" className="form-control" id="phone" name="phone" />
                                <span style={{ color: "red" }}>{this.state.errors['phone']}</span>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input onChange={(event) => this.handleChange(event, 'email')} value={this.state.fields['email']} type="text" className="form-control" id="email" name="email" />
                                <span style={{ color: "red" }}>{this.state.errors['email']}</span>
                            </div>
                        </div>
                        <div className="col-sm-12 text-center">
                            <button type="submit" className="btn btn-primary"><i className="fa fa-save"></i> Add Address</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    };
}

AddNewAddress.propTypes = {
    createAddress: PropTypes.func.isRequired,
    getCountryList: PropTypes.func.isRequired,
    lastAddressCreated: PropTypes.object,
    countryList: PropTypes.object
};

const mapStateToProps = state => {
    return { lastAddressCreated: state.lastAddressCreated, countryList: state.countryList };
}

export default connect(mapStateToProps, { createAddress, getCountryList })(AddNewAddress);