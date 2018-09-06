import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';

class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const categoryId = this.props.match.params.categoryId;
        const totalProducts = this.props.productCount[categoryId];
        const pages = totalProducts / this.props.productPerPage;
        
        return (
            <div className="pages">
              <p className="loadMore">
                <a href="#" className="btn btn-primary btn-lg"><i className="fa fa-chevron-down"></i> Load more</a>
              </p>

              <ul className="pagination">
                <li><a href="#">&laquo;</a>
                </li>
                {Array.from({length: pages}, (item, index) => {
                    return <li className={index === 0 ? `active` : ''} key={index}><a href="#">{index + 1}</a></li>;
                })}
                <li><a href="#">&raquo;</a>
                </li>
              </ul>
            </div>
        );
    };
}

export default Pagination;