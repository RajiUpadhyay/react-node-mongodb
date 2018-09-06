import React, { Component } from 'react';
import { BrowserRouter as Router, Link, NavLink } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { insertState } from '../../actions/DashboardAction';

class AddStateComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: { state_name: '', state_code: '', country_code: ''},
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

    insertState = event => {
        event.preventDefault();
        if (this.handleValidation()) {
            this.props.insertState(this.state.fields);
            this.setState({ fields: { state_name: '', state_code: '', country_code: ''}, });
        }
    }

    render() {
        return (
            <div>
                <h3>Create State</h3>
                {(this.props.lastAddedState.failure || this.props.lastAddedState.success) && <div style={{ paddingBottom: '20px', display: 'inline-block' }}>
                    <span style={{ color: 'red' }}>{((this.props.lastAddedState || {}).failure || {}).message}</span>
                    <span style={{ color: 'green' }}>{((this.props.lastAddedState || {}).success || {}).message}</span>
                </div>}
                <form onSubmit={this.insertState}>
                    <div className="row">
                        <div className="col-sm-3">
                            <div className="form-group">
                                <label htmlFor="country_code">Country Code</label>
                                <input onChange={(event) => this.handleChange(event, 'country_code')} value={this.state.fields['country_code']} type="text" className="form-control" id="country_code" name="country_code" />
                                <span style={{ color: "red" }}>{this.state.errors['country_code']}</span>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="form-group">
                                <label htmlFor="state_name">State Name</label>
                                <input onChange={(event) => this.handleChange(event, 'state_name')} value={this.state.fields['state_name']} type="text" className="form-control" id="state_name" name="state_name" />
                                <span style={{ color: "red" }}>{this.state.errors['state_name']}</span>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="form-group">
                                <label htmlFor="state_code">State Code</label>
                                <input onChange={(event) => this.handleChange(event, 'state_code')} value={this.state.fields['state_code']} type="text" className="form-control" id="state_code" name="state_code" />
                                <span style={{ color: "red" }}>{this.state.errors['state_code']}</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 text-center">
                        <button type="submit" className="btn btn-primary"><i className="fa fa-save"></i> Add State</button>
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

AddStateComponent.propTypes = {
    insertState: PropTypes.func.isRequired,
    lastAddedState: PropTypes.object
};

const mapStateToProps = state => {
    return { lastAddedState: state.lastAddedState };
}

export default connect(mapStateToProps, { insertState })(AddStateComponent);