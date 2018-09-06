import React, { Component } from 'react';
import { BrowserRouter as Router, Link, NavLink } from 'react-router-dom';

class TopUtility extends Component {
  render() {
    return (
      <div style={style.topUtilityBox}>
          <div id="top">
              <div className="container">
                  <div className="col-md-6 offer" data-animate="fadeInDown">
                      <a href="#" className="btn btn-success btn-sm" data-animate-hover="shake">Offer of the day</a>  <a href="#">Get flat 35% off on orders over $50!</a>
                  </div>
                  <div className="col-md-6" data-animate="fadeInDown">
                      <ul className="menu">
                          <li><a href="#" data-toggle="modal" data-target="#login-modal">Login</a>
                          </li>
                          <li><a href="register.html">Register</a>
                          </li>
                          <li><a href="contact.html">Contact</a>
                          </li>
                          <li><a href="#">Recently viewed</a>
                          </li>
                      </ul>
                  </div>
              </div>
              <div className="modal fade" id="login-modal" tabIndex="-1" role="dialog" aria-labelledby="Login" aria-hidden="true">
                  <div className="modal-dialog modal-sm">

                      <div className="modal-content">
                          <div className="modal-header">
                              <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                              <h4 className="modal-title" id="Login">Customer login</h4>
                          </div>
                          <div className="modal-body">
                              <form action="customer-orders.html" method="post">
                                  <div className="form-group">
                                      <input type="text" className="form-control" id="email-modal" placeholder="email" />
                                  </div>
                                  <div className="form-group">
                                      <input type="password" className="form-control" id="password-modal" placeholder="password" />
                                  </div>

                                  <p className="text-center">
                                      <button className="btn btn-primary"><i className="fa fa-sign-in"></i> Log in</button>
                                  </p>

                              </form>

                              <p className="text-center text-muted">Not registered yet?</p>
                              <p className="text-center text-muted"><a href="register.html"><strong>Register now</strong></a>! It is easy and done in 1&nbsp;minute and gives you access to special discounts and much more!</p>

                          </div>
                      </div>
                  </div>
              </div>

          </div>
      </div>
    );
  };
}

export default TopUtility;