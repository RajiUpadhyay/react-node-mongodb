import React, { Component } from 'react';
import { BrowserRouter as Router, Link, NavLink } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { insertCountry } from '../../actions/DashboardAction';

class AddCountryComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: { country_name: '', country_code: ''},
            errors: {}
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

        this.setState({ errors: errors });
        return isValid;
    }

    handleChange(event, field) {
        let fields = this.state.fields;
        fields[field] = event.target.value;
        this.setState({ fields });
    }

    insertCountry = event => {
        event.preventDefault();
        if (this.handleValidation()) {
            this.props.insertCountry(this.state.fields);
            this.setState({ fields: { country_name: '', country_code: ''}, });
        }
    }

    render() {
        return (
            <div>
                <h3>Create Country</h3>
                {(this.props.lastAddedCountry.failure || this.props.lastAddedCountry.success) && <div style={{ paddingBottom: '20px', display: 'inline-block' }}>
                    <span style={{ color: 'red' }}>{((this.props.lastAddedCountry || {}).failure || {}).message}</span>
                    <span style={{ color: 'green' }}>{((this.props.lastAddedCountry || {}).success || {}).message}</span>
                </div>}
                <form onSubmit={this.insertCountry}>
                    <div className="row">
                        <div className="col-sm-3">
                            <div className="form-group">
                                <label htmlFor="country_name">Country Name</label>
                                <input onChange={(event) => this.handleChange(event, 'country_name')} value={this.state.fields['country_name']} type="text" className="form-control" id="country_name" name="country_name" />
                                <span style={{ color: "red" }}>{this.state.errors['country_name']}</span>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="form-group">
                                <label htmlFor="country_code">Country Code</label>
                                <input onChange={(event) => this.handleChange(event, 'country_code')} value={this.state.fields['country_code']} type="text" className="form-control" id="country_code" name="country_code" />
                                <span style={{ color: "red" }}>{this.state.errors['country_code']}</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 text-center">
                        <button type="submit" className="btn btn-primary"><i className="fa fa-save"></i> Add Country</button>
                        <NavLink className="btn btn-success view-list" exact to={`${this.props.location.pathname}/list`}>
                            <i className="fa fa-eye" aria-hidden="true"></i> View List
                        </NavLink>
                    </div>
                    <div className="clear"></div>
                </form>
            </div>
        );
    };
}

AddCountryComponent.propTypes = {
    insertCountry: PropTypes.func.isRequired,
    lastAddedCountry: PropTypes.object
};

const mapStateToProps = state => {
    return { lastAddedCountry: state.lastAddedCountry };
}

export default connect(mapStateToProps, { insertCountry })(AddCountryComponent);