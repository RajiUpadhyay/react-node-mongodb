import React, { Component } from 'react';
import { BrowserRouter as Router, Link, NavLink } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { insertCategory } from '../../actions/DashboardAction';

class AddCategoryComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: { category_type: '' },
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

    insertCategory = event => {
        event.preventDefault();
        if (this.handleValidation()) {
            this.props.insertCategory(this.state.fields);
            this.setState({ fields: { category_type: ''}, });
        }
    }

    render() {
        return (
            <div>
                <h3>Create Category</h3>
                {(this.props.lastAddedCategory.failure || this.props.lastAddedCategory.success) && <div style={{ paddingBottom: '20px', display: 'inline-block' }}>
                    <span style={{ color: 'red' }}>{((this.props.lastAddedCategory || {}).failure || {}).message}</span>
                    <span style={{ color: 'green' }}>{((this.props.lastAddedCategory || {}).success || {}).message}</span>
                </div>}
                <form onSubmit={this.insertCategory}>
                    <div className="row">
                        <div className="col-sm-3">
                            <div className="form-group">
                                <label htmlFor="category_type">Category Type</label>
                                <input 
                                    onChange={(event) => this.handleChange(event, 'category_type')} 
                                    value={this.state.fields['category_type']} id="category_type" name="category_type" className="form-control" />
                                <span style={{ color: "red" }}>{this.state.errors['category_type']}</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 text-center">
                        <button type="submit" className="btn btn-primary"><i className="fa fa-save"></i> Add Category</button>

                        <NavLink className="btn btn-success view-list" exact to={`${this.props.match.url}/list`}>
                            <i className="fa fa-eye" aria-hidden="true"></i> View List
                        </NavLink>
                    </div>
                    <div className="clear"></div>
                </form>
            </div>
        );
    };
}

AddCategoryComponent.propTypes = {
    insertCategory: PropTypes.func.isRequired,
    lastAddedCategory: PropTypes.object
};

const mapStateToProps = state => {
    return { lastAddedCategory: state.lastAddedCategory };
}

export default connect(mapStateToProps, { insertCategory })(AddCategoryComponent);