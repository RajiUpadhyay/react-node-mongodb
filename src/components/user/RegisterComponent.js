import React, { Component } from 'react';
import { BrowserRouter as Router, Link, NavLink } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createUser } from '../../actions/UsersAction';

const initialFieldState = { user_name: '', first_name: '', last_name: '', email: '', phone: '', password: '', confirm_password: ''};

class RegisterComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: Object.assign({}, initialFieldState),
            errors: {},
            formValidationInit: false
        };
    }

    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let isValid = true;

        for (const prop in fields) {
            const isFilled = fields[prop].join ? fields[prop].length : fields[prop];
            !isFilled ? (isValid = false, errors[prop] = 'Cannot be empty') : errors[prop] = '';
        }

        if (typeof fields["email"] !== "undefined") {
            let lastAtPos = fields["email"].lastIndexOf('@');
            let lastDotPos = fields["email"].lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
                isValid = false;
                errors["email"] = "Email is not valid";
            }
        }

        console.log(fields)

        !fields["phone"].match(/^[0-9]+$/) && (isValid = false, errors["phone"] = "Only Numbers");
        fields["confirm_password"] !== fields["password"] && (isValid = false, errors["confirm_password"] = "Password is not matching");

        this.setState({ errors: errors });
        return isValid;
    }

    handleChange(event, field) {
        let fields = this.state.fields;
        fields[field] = event.target.value;
        this.setState({ fields });
        this.state.formValidationInit && this.handleValidation();
    }

    createUser = event => {
        event.preventDefault();
        if (this.handleValidation()) {
            this.props.createUser(this.state.fields);
            this.setState({
                fields: Object.assign({}, initialFieldState)
            });
        } else {
            this.setState({ formValidationInit: true })
        }
    }
    render() {
        return (
            <div>
                <div>

                    <div className="col-md-12">
                        <ul className="breadcrumb">
                            <li><NavLink to='/' exact>Home</NavLink></li>
                            <li>New Account / Register</li>
                        </ul>
                    </div>

                    <div className="col-md-12">
                        <div className="box">
                            <h1>New account</h1>
                            <p className="lead">Not our registered customer yet? or <NavLink to='/login' exact>Sign In</NavLink></p>

                            <div style={{ paddingBottom: '20px' }}>
                                <span style={{ color: 'red' }}>{((this.props.lastUserCreated || {}).failure || {}).message}</span>
                                <span style={{ color: 'green' }}>{((this.props.lastUserCreated || {}).success || {}).message}</span>
                            </div>

                            <form onSubmit={this.createUser} className="create-user">
                                <div className="form-group">
                                    <div className="col-md-3 remove-padding-left">
                                        <label htmlFor="user_name">Username</label>
                                        <input onChange={(event) => this.handleChange(event, 'user_name')} value={this.state.fields['user_name']} type="text" className="form-control" id="user_name" name="user_name" />
                                        <span style={{ color: "red" }}>{this.state.errors['user_name']}</span>
                                    </div>

                                    <div className=" col-md-3 remove-padding-left">
                                        <label htmlFor="first_name">First Name</label>
                                        <input onChange={(event) => this.handleChange(event, 'first_name')} value={this.state.fields['first_name']} type="text" className="form-control" id="first_name" name="first_name" />
                                        <span style={{ color: "red" }}>{this.state.errors['first_name']}</span>
                                    </div>

                                    <div className=" col-md-3 remove-padding-left">
                                        <label htmlFor="last_name">Last Name</label>
                                        <input onChange={(event) => this.handleChange(event, 'last_name')} value={this.state.fields['last_name']} type="text" className="form-control" id="last_name" name="last_name" />
                                        <span style={{ color: "red" }}>{this.state.errors['last_name']}</span>
                                    </div>
                                </div>

                                <div className="clear"></div>

                                <div className="form-group">
                                    <div className=" col-md-6 remove-padding-left">
                                        <label htmlFor="email">Email</label>
                                        <input onChange={(event) => this.handleChange(event, 'email')} value={this.state.fields['email']} type="text" className="form-control" id="email" name="email" />
                                        <span style={{ color: "red" }}>{this.state.errors['email']}</span>
                                    </div>

                                    <div className=" col-md-6 remove-padding-left">
                                        <label htmlFor="phone">Phone</label>
                                        <input onChange={(event) => this.handleChange(event, 'phone')} value={this.state.fields['phone']} type="text" className="form-control" id="phone" name="phone" />
                                        <span style={{ color: "red" }}>{this.state.errors['phone']}</span>
                                    </div>
                                </div>

                                <div className="clear"></div>

                                <div className="form-group">
                                    <div className=" col-md-6 remove-padding-left">
                                        <label htmlFor="password">Password</label>
                                        <input onChange={(event) => this.handleChange(event, 'password')} value={this.state.fields['password']} type="password" className="form-control" id="password" name="password" />
                                        <span style={{ color: "red" }}>{this.state.errors['password']}</span>
                                    </div>

                                    <div className=" col-md-6 remove-padding-left">
                                        <label htmlFor="password">Confirm Password</label>
                                        <input onChange={(event) => this.handleChange(event, 'confirm_password')} value={this.state.fields['confirm_password']} type="password" className="form-control" id="confirm_password" name="confirm_password" />
                                        <span style={{ color: "red" }}>{this.state.errors['confirm_password']}</span>
                                    </div>
                                </div>

                                <div className="clear"></div>

                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary"><i className="fa fa-user-md"></i> Register</button>
                                </div>

                                <div className="clear"></div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        );
    };
}

RegisterComponent.propTypes = {
    createUser: PropTypes.func.isRequired,
    lastUserCreated: PropTypes.object
};

const mapStateToProps = state => {
    return { lastUserCreated: state.lastUserCreated };
}

export default connect(mapStateToProps, { createUser })(RegisterComponent);