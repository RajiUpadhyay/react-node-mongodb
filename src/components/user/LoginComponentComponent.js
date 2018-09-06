import React, { Component } from 'react';
import { BrowserRouter as Router, Link, NavLink, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login, currentUser } from '../../actions/UsersAction';

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        email: '',
        password: ''
      },
      errors: {},
      formValidationInit: false
    };
  }

  componentWillMount() { }

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

    this.setState({ errors: errors });
    return isValid;
  }

  handleChange(event, field) {
    let fields = this.state.fields;
    fields[field] = event.target.value;
    this.setState({ fields });
    this.state.formValidationInit && this.handleValidation();
  }

  login = event => {
    event.preventDefault();
    if (this.handleValidation()) {
      this.props.login(this.state.fields);
      this.setState({ fields: { email: '', password: '' } });
    } else {
      this.setState({ formValidationInit: true })
    }
  }

  render() {
    return (
      <div>
        <div className="col-md-12">
          <ul className="breadcrumb">
            <li><NavLink to='/' exact>Home</NavLink></li>
            <li>Login</li>
          </ul>
        </div>

        <div className="col-md-12">
          <div className="box">
            <h1>Login</h1>
            <p className="lead">Already our customer? or <NavLink to='/register' exact>Create New Account</NavLink></p>

            <div style={{ paddingBottom: '20px' }}>
              <span style={{ color: 'red' }}>{((this.props.loginCredentials || {}).failure || {}).message}</span>
              <span style={{ color: 'green' }}>{((this.props.loginCredentials || {}).success || {}).message}</span>
            </div>

            <form onSubmit={this.login} className="login-user">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input onChange={(event) => this.handleChange(event, 'email')} value={this.state.fields['email']} type="text" className="form-control" id="login-email" name="email" />
                <span style={{ color: "red" }}>{this.state.errors['email']}</span>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input onChange={(event) => this.handleChange(event, 'password')} value={this.state.fields['password']} type="password" className="form-control" id="password" />
                <span style={{ color: "red" }}>{this.state.errors['password']}</span>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary"><i className="fa fa-sign-in"></i> Log in</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };
}

LoginComponent.propTypes = {
  login: PropTypes.func.isRequired,
  currentUser: PropTypes.func.isRequired,
  loginCredentials: PropTypes.object,
  activeUser: PropTypes.object
};

const mapStateToProps = state => {
  return { loginCredentials: state.loginCredentials, activeUser: state.activeUser };
}

export default connect(mapStateToProps, { login, currentUser })(LoginComponent);