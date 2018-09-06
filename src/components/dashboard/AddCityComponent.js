import React, { Component } from 'react';
import { BrowserRouter as Router, Link, NavLink } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { insertCity } from '../../actions/DashboardAction';

class AddCityComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: { city_name: '', state_code: '', country_code: ''},
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

    insertCity = event => {
        event.preventDefault();
        if (this.handleValidation()) {
            this.props.insertCity(this.state.fields);
            this.setState({ fields: { city_name: '', state_code: '', country_code: ''}, });
        }
    }

    render() {
        return (
            <div>
                <h3>Create City</h3>
                {(this.props.lastAddedCity.failure || this.props.lastAddedCity.success) && <div style={{ paddingBottom: '20px', display: 'inline-block' }}>
                    <span style={{ color: 'red' }}>{((this.props.lastAddedCity || {}).failure || {}).message}</span>
                    <span style={{ color: 'green' }}>{((this.props.lastAddedCity || {}).success || {}).message}</span>
                </div>}
                <form onSubmit={this.insertCity}>
                    <div className="row">
                        <div className="col-sm-3">
                            <div className="form-group">
                                <label htmlFor="city_name">City Name</label>
                                <input onChange={(event) => this.handleChange(event, 'city_name')} value={this.state.fields['city_name']} type="text" className="form-control" id="city_name" name="city_name" />
                                <span style={{ color: "red" }}>{this.state.errors['city_name']}</span>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="form-group">
                                <label htmlFor="state_code">State Code</label>
                                <input onChange={(event) => this.handleChange(event, 'state_code')} value={this.state.fields['state_code']} type="text" className="form-control" id="state_code" name="state_code" />
                                <span style={{ color: "red" }}>{this.state.errors['state_code']}</span>
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
                        <button type="submit" className="btn btn-primary"><i className="fa fa-save"></i> Add City</button>
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

AddCityComponent.propTypes = {
    insertCity: PropTypes.func.isRequired,
    lastAddedCity: PropTypes.object
};

const mapStateToProps = state => {
    return { lastAddedCity: state.lastAddedCity };
}

export default connect(mapStateToProps, { insertCity })(AddCityComponent);