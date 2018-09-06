import React, { Component } from 'react';
import { BrowserRouter as Router, Link, NavLink } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddNewAddressComponent from './AddNewAddressComponent';

class UpdatePersonalDetails extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <AddNewAddressComponent />
            </div>
        );
    };
}

UpdatePersonalDetails.propTypes = {
    lastAddressCreated: PropTypes.object
};

const mapStateToProps = state => {
    return { lastAddressCreated: state.lastAddressCreated };
}

export default connect(mapStateToProps, {})(UpdatePersonalDetails);