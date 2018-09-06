import React, { Component } from 'react';
import { BrowserRouter as Router, Link, NavLink } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { insertColor } from '../../actions/DashboardAction';

class AddColorComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: { color_name: '', color_code: ''},
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

    insertColor = event => {
        event.preventDefault();
        if (this.handleValidation()) {
            this.props.insertColor(this.state.fields);
            this.setState({ fields: { color_name: '', color_code: ''}, });
        }
    }

    render() {
        return (
            <div>
                <h3>Create Color</h3>
                {(this.props.lastAddedColor.failure || this.props.lastAddedColor.success) && <div style={{ paddingBottom: '20px', display: 'inline-block' }}>
                    <span style={{ color: 'red' }}>{((this.props.lastAddedColor || {}).failure || {}).message}</span>
                    <span style={{ color: 'green' }}>{((this.props.lastAddedColor || {}).success || {}).message}</span>
                </div>}
                <form onSubmit={this.insertColor}>
                    <div className="row">
                        <div className="col-sm-3">
                            <div className="form-group">
                                <label htmlFor="color_name">Color Name</label>
                                <input onChange={(event) => this.handleChange(event, 'color_name')} value={this.state.fields['color_name']} type="text" className="form-control" id="color_name" name="color_name" />
                                <span style={{ color: "red" }}>{this.state.errors['color_name']}</span>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="form-group">
                                <label htmlFor="color_code">Color Code</label>
                                <input onChange={(event) => this.handleChange(event, 'color_code')} value={this.state.fields['color_code']} type="text" className="form-control" id="color_code" name="color_code" />
                                <span style={{ color: "red" }}>{this.state.errors['color_code']}</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 text-center">
                        <button type="submit" className="btn btn-primary"><i className="fa fa-save"></i> Add Color</button>
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

AddColorComponent.propTypes = {
    insertColor: PropTypes.func.isRequired,
    lastAddedColor: PropTypes.object
};

const mapStateToProps = state => {
    return { lastAddedColor: state.lastAddedColor };
}

export default connect(mapStateToProps, { insertColor })(AddColorComponent);