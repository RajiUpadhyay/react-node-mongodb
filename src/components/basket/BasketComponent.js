import React, { Component } from 'react';
import { BrowserRouter as Router, Link, NavLink } from 'react-router-dom';

class BasketComponent extends Component {

    render() {
        return (
            <div>
                <div className="col-md-12">
                    <ul className="breadcrumb">
                        <li><NavLink to='/' exact>Home</NavLink></li>
                        <li>Shopping cart</li>
                    </ul>
                </div>

                <div className="col-md-9" id="basket">

                    <div className="box">

                        <form method="post" action="checkout1.html">

                            <h1>Shopping cart</h1>
                            <p className="text-muted">You currently have 3 item(s) in your cart.</p>
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th colSpan="2">Product</th>
                                            <th>Quantity</th>
                                            <th>Unit price</th>
                                            <th>Discount</th>
                                            <th colSpan="2">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <a href="#">
                                                    <img src="img/detailsquare.jpg" alt="White Blouse Armani" />
                                                </a>
                                            </td>
                                            <td><a href="#">White Blouse Armani</a>
                                            </td>
                                            <td>
                                                <input type="number" defaultValue="2" className="form-control" />
                                            </td>
                                            <td>$123.00</td>
                                            <td>$0.00</td>
                                            <td>$246.00</td>
                                            <td><a href="#"><i className="fa fa-trash-o"></i></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <a href="#">
                                                    <img src="img/basketsquare.jpg" alt="Black Blouse Armani" />
                                                </a>
                                            </td>
                                            <td><a href="#">Black Blouse Armani</a>
                                            </td>
                                            <td>
                                                <input type="number" defaultValue="1" className="form-control" />
                                            </td>
                                            <td>$200.00</td>
                                            <td>$0.00</td>
                                            <td>$200.00</td>
                                            <td><a href="#"><i className="fa fa-trash-o"></i></a>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th colSpan="5">Total</th>
                                            <th colSpan="2">$446.00</th>
                                        </tr>
                                    </tfoot>
                                </table>

                            </div>
                            {/* <!-- /.table-responsive --> */}

                            <div className="box-footer">
                                <div className="pull-left">
                                    <a href="category.html" className="btn btn-default"><i className="fa fa-chevron-left"></i> Continue shopping</a>
                                </div>
                                <div className="pull-right">
                                    <button className="btn btn-default"><i className="fa fa-refresh"></i> Update basket</button>
                                    <NavLink className="btn btn-primary" to='/checkout/address' exact>Proceed to checkout <i className="fa fa-chevron-right"></i></NavLink>
                                    {/* <button type="submit" className="btn btn-primary">Proceed to checkout <i className="fa fa-chevron-right"></i></button> */}
                                </div>
                            </div>

                        </form>

                    </div>
                    {/* <!-- /.box --> */}


                    <div className="row same-height-row">
                        <div className="col-md-3 col-sm-6">
                            <div className="box same-height">
                                <h3>You may also like these products</h3>
                            </div>
                        </div>

                        <div className="col-md-3 col-sm-6">
                            <div className="product same-height">
                                <div className="flip-container">
                                    <div className="flipper">
                                        <div className="front">
                                            <a href="detail.html">
                                                <img src="img/product2.jpg" alt="" className="img-responsive" />
                                            </a>
                                        </div>
                                        <div className="back">
                                            <a href="detail.html">
                                                <img src="img/product2_2.jpg" alt="" className="img-responsive" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <a href="detail.html" className="invisible">
                                    <img src="img/product2.jpg" alt="" className="img-responsive" />
                                </a>
                                <div className="text">
                                    <h3>Fur coat</h3>
                                    <p className="price">$143</p>
                                </div>
                            </div>
                            {/* <!-- /.product --> */}
                        </div>

                        <div className="col-md-3 col-sm-6">
                            <div className="product same-height">
                                <div className="flip-container">
                                    <div className="flipper">
                                        <div className="front">
                                            <a href="detail.html">
                                                <img src="img/product1.jpg" alt="" className="img-responsive" />
                                            </a>
                                        </div>
                                        <div className="back">
                                            <a href="detail.html">
                                                <img src="img/product1_2.jpg" alt="" className="img-responsive" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <a href="detail.html" className="invisible">
                                    <img src="img/product1.jpg" alt="" className="img-responsive" />
                                </a>
                                <div className="text">
                                    <h3>Fur coat</h3>
                                    <p className="price">$143</p>
                                </div>
                            </div>
                            {/* <!-- /.product --> */}
                        </div>


                        <div className="col-md-3 col-sm-6">
                            <div className="product same-height">
                                <div className="flip-container">
                                    <div className="flipper">
                                        <div className="front">
                                            <a href="detail.html">
                                                <img src="img/product3.jpg" alt="" className="img-responsive" />
                                            </a>
                                        </div>
                                        <div className="back">
                                            <a href="detail.html">
                                                <img src="img/product3_2.jpg" alt="" className="img-responsive" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <a href="detail.html" className="invisible">
                                    <img src="img/product3.jpg" alt="" className="img-responsive" />
                                </a>
                                <div className="text">
                                    <h3>Fur coat</h3>
                                    <p className="price">$143</p>

                                </div>
                            </div>
                            {/* <!-- /.product --> */}
                        </div>

                    </div>


                </div>
                {/* <!-- /.col-md-9 --> */}

                <div className="col-md-3">
                    <div className="box" id="order-summary">
                        <div className="box-header">
                            <h3>Order summary</h3>
                        </div>
                        <p className="text-muted">Shipping and additional costs are calculated based on the values you have entered.</p>

                        <div className="table-responsive">
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <td>Order subtotal</td>
                                        <th>$446.00</th>
                                    </tr>
                                    <tr>
                                        <td>Shipping and handling</td>
                                        <th>$10.00</th>
                                    </tr>
                                    <tr>
                                        <td>Tax</td>
                                        <th>$0.00</th>
                                    </tr>
                                    <tr className="total">
                                        <td>Total</td>
                                        <th>$456.00</th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>


                    <div className="box">
                        <div className="box-header">
                            <h4>Coupon code</h4>
                        </div>
                        <p className="text-muted">If you have a coupon code, please enter it in the box below.</p>
                        <form>
                            <div className="input-group">

                                <input type="text" className="form-control" />

                                <span className="input-group-btn">

                                    <button className="btn btn-primary" type="button"><i className="fa fa-gift"></i></button>

                                </span>
                            </div>
                            {/* <!-- /input-group --> */}
                        </form>
                    </div>

                </div>
            </div>
        );
    };
}

export default BasketComponent;