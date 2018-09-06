import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';

class Description extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const categoryId = this.props.match.params.categoryId;
        const selectedCategory = this.props.categoryList.list.filter(category => category._id === categoryId)[0] || {};
        
        return (
            <div className="box">
              <h1>{selectedCategory.category_type} Products</h1>
            </div>
        );
    };
}

export default Description;