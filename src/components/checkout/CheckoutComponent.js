import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink, Redirect } from 'react-router-dom';

import Address from './AddressComponent';
import DeliveryMethod from './DeliveryMethodComponent';
import PaymentMethod from './PaymentMethodComponent';
import OrderReview from './OrderReviewComponent';
import SingleOrderDetails from './SingleOrderDetailsComponent';

class CheckoutComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="col-md-12">
          <ul className="breadcrumb">
            <li><NavLink to='/' exact>Home</NavLink></li>
            <li>Checkout - Address</li>
          </ul>
        </div>

        <div className="col-md-9" id="checkout">

          <div className="box">
            <h1>Checkout</h1>
            <form method="post" action="checkout2.html">
              {/* <Route exact path={this.props.match.url} render={() => (<h1>Checkout, {this.props.match.url}, {this.props.match.path}</h1>)} /> */}
              <ul className="nav nav-pills nav-justified">
                <li><NavLink activeClassName="active" to={`${this.props.match.url}/address`} ><i className="fa fa-map-marker"></i><br />Address</NavLink></li>
                <li><NavLink activeClassName="active" to={`${this.props.match.url}/delivery-method`}><i className="fa fa-truck"></i><br />Delivery Method</NavLink></li>
                <li><NavLink activeClassName="active" to={`${this.props.match.url}/payment-method`}><i className="fa fa-money"></i><br />Payment Method</NavLink></li>
                <li><NavLink activeClassName="active" to={`${this.props.match.url}/order-review`}><i className="fa fa-eye"></i><br />Order Review</NavLink></li>
              </ul>
              <div>
                <Route path={`${this.props.match.path}/address`} exact name="Address" component={Address} />
                <Route path={`${this.props.match.url}/delivery-method`} name="Delivery Method" exact component={DeliveryMethod} />
                <Route path={`${this.props.match.url}/payment-method`} name="Payment Method" exact component={PaymentMethod} />
                <Route path={`${this.props.match.url}/order-review`} name="Order Review" exact component={OrderReview} />
              </div>
            </form>
          </div>
          {/* <!-- /.box --> */}


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

        </div>
      </div>
    );
  };
}

export default CheckoutComponent;