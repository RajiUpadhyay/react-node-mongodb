import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';

class CategorySideBarBanner extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="banner">
              <a href="/category/">
                <img src="../img/banner.jpg" alt="sales 2014" className="img-responsive" />
              </a>
            </div>
        );
    };
}

export default CategorySideBarBanner;