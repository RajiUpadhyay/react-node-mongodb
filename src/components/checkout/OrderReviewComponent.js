import React, { Component } from 'react';
import { BrowserRouter as Router, Link, NavLink } from 'react-router-dom';

class CheckoutOrderReview extends Component {

    render() {
        return (
            <div>
                <div className="content">
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th colSpan="2">Product</th>
                                    <th>Quantity</th>
                                    <th>Unit price</th>
                                    <th>Discount</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <a href="#">
                                            <img src="../img/detailsquare.jpg" alt="White Blouse Armani" />
                                        </a>
                                    </td>
                                    <td><a href="#">White Blouse Armani</a>
                                    </td>
                                    <td>2</td>
                                    <td>$123.00</td>
                                    <td>$0.00</td>
                                    <td>$246.00</td>
                                </tr>
                                <tr>
                                    <td>
                                        <a href="#">
                                            <img src="../img/basketsquare.jpg" alt="Black Blouse Armani" />
                                        </a>
                                    </td>
                                    <td><a href="#">Black Blouse Armani</a>
                                    </td>
                                    <td>1</td>
                                    <td>$200.00</td>
                                    <td>$0.00</td>
                                    <td>$200.00</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th colSpan="5">Total</th>
                                    <th>$446.00</th>
                                </tr>
                            </tfoot>
                        </table>

                    </div>
                    {/* <!-- /.table-responsive --> */}
                </div>
                {/* <!-- /.content --> */}

                <div className="box-footer">
                    <div className="pull-left">
                        <NavLink to="/checkout/payment-method" className="btn btn-default"><i className="fa fa-chevron-left"></i>Back to Payment method</NavLink>
                    </div>
                    <div className="pull-right">
                        <NavLink to="/checkout/order-details" className="btn btn-primary">Place an order<i className="fa fa-chevron-right"></i></NavLink>
                    </div>
                </div>
            </div>
        );
    };
}

export default CheckoutOrderReview;