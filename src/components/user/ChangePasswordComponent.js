import React, { Component } from 'react';
import { BrowserRouter as Router, Link, NavLink } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changePassword, passwordChanged } from '../../actions/UsersAction';

const initialState = { password_old: '', password_1: '', password_2: '' };

class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: Object.assign({}, initialState),
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

        fields["password_2"] !== fields["password_1"] && (isValid = false, errors["password_2"] = "Password is not matching");
        fields["password_1"] === fields["password_old"] && (isValid = false, errors["password_1"] = "Password can not be same as old one");
        this.setState({ errors: errors });
        return isValid;
    }

    handleChange(event, field) {
        let fields = this.state.fields;
        fields[field] = event.target.value;
        this.setState({ fields });
        this.state.formValidationInit && this.handleValidation();
    }

    changePassword = event => {
        event.preventDefault();
        if (this.handleValidation()) {
            const authDetails = JSON.parse(localStorage.getItem('AUTH_DETAILS'));
            this.props.changePassword({ password_old: this.state.fields.password_old, password: this.state.fields.password_1, email: authDetails.email });
            this.setState({ fields: Object.assign({}, initialState) });
        } else {
            this.setState({ formValidationInit: true });
        }
    }

    render() {
        return (
            <div>
                <h3>Change password</h3>
                {(this.props.passwordChanged.failure || this.props.passwordChanged.success) && <div style={{ paddingBottom: '20px', display: 'inline-block' }}>
                    <span style={{ color: 'red' }}>{((this.props.passwordChanged || {}).failure || {}).message}</span>
                    <span style={{ color: 'green' }}>{((this.props.passwordChanged || {}).success || {}).message}</span>
                </div>}
                <form onSubmit={this.changePassword}>
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label htmlFor="password_old">Old password</label>
                                <input onChange={(event) => this.handleChange(event, 'password_old')} value={this.state.fields['password_old']} type="password" className="form-control" id="password_old" name="password_old" />
                                <span style={{ color: "red" }}>{this.state.errors['password_old']}</span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label htmlFor="password_1">New password</label>
                                <input onChange={(event) => this.handleChange(event, 'password_1')} value={this.state.fields['password_1']} type="password" className="form-control" id="password_1" name="password_1" />
                                <span style={{ color: "red" }}>{this.state.errors['password_1']}</span>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label htmlFor="password_2">Retype new password</label>
                                <input onChange={(event) => this.handleChange(event, 'password_2')} value={this.state.fields['password_2']} type="password" className="form-control" id="password_2" name="password_2" />
                                <span style={{ color: "red" }}>{this.state.errors['password_2']}</span>
                            </div>
                        </div>
                    </div>
                    {/* <!-- /.row --> */}

                    <div className="col-sm-12 text-center">
                        <button type="submit" className="btn btn-primary"><i className="fa fa-save"></i> Save new password</button>
                    </div>
                </form>
            </div>
        );
    };
}

ChangePassword.propTypes = {
    changePassword: PropTypes.func.isRequired,
    passwordChanged: PropTypes.object
};

const mapStateToProps = state => {
    return { passwordChanged: state.passwordChanged };
}

export default connect(mapStateToProps, { changePassword })(ChangePassword);