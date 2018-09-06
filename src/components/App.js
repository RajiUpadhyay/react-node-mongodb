import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import { login, currentUser } from '../actions/UsersAction';

import CommentBox from './CommentBoxComponent';
import CommentForm from './CommentFormComponent';

import Header from './common/HeaderComponent';
import Footer from './common/FooterComponent';
import HomePageComponent from './HomePageComponent';
import LoginComponent from './user/LoginComponentComponent';
import RegisterComponent from './user/RegisterComponent';
import RecentlyViewed from './product/RecentlyViewedComponent';
import BasketComponent from './basket/BasketComponent';
import CategoryComponent from './category/CategoryComponent';
import CheckoutComponent from './checkout/CheckoutComponent';
import ProductComponent from './product/ProductComponent';
import MyAccountComponent from './user/MyAccountComponent';
import DashboardMainComponent from './dashboard/DashboardMainComponent';

const RequireAuth = (Component, auth, redirectTo) => {
  return class App extends Component {
      componentWillMount() { 
          if(!auth) { 
             this.props.history.replace({pathname: redirectTo});
          }
      } 
      render() { 
         return <Component {...this.props} /> 
      }
  } 

}

class App extends Component {
  componentWillMount() {
    let auth = JSON.parse(localStorage.getItem('AUTH_DETAILS') || '{}');
    if(auth.email) {
      this.props.currentUser(auth.email, () => {
        console.log('LOGIN required');
      });
    }
    
  }
  render() {
    const HeaderWithRouter = withRouter(Header);
    const FooterWithRouter = withRouter(Footer);

    return (
      <Router>
        <div>
          <HeaderWithRouter />
          <div id="all">
            <div id="content">
              <div className="container">
                <Route path='/' exact strict component={HomePageComponent} />
                <Route path='/login' exact strict component={RequireAuth(LoginComponent, !localStorage.getItem('ACCESS_TOKEN'), "/account/orders")} />
                <Route path='/register' exact strict component={RequireAuth(RegisterComponent, !localStorage.getItem('ACCESS_TOKEN'), "/account/orders")} />
                <Route path='/comments' exact strict component={CommentBox} />
                <Route path='/create' exact strict component={CommentForm} />
                <Route path='/recently-viewed' exact strict component={RecentlyViewed} />
                <Route path='/category/:categoryId' render={(props) => <CategoryComponent {...props} />} />
                <Route path='/product/:productId' exact component={ProductComponent} />
                <Route path='/basket' exact strict component={BasketComponent} />
                <Route path='/checkout' component={CheckoutComponent} />
                <Route path='/dashboard' component={RequireAuth(DashboardMainComponent, localStorage.getItem('ACCESS_TOKEN'), "/login")} />
                <Route path='/account' component={RequireAuth(MyAccountComponent, localStorage.getItem('ACCESS_TOKEN'), "/login")} />
              </div>
            </div>
          </div>
          <FooterWithRouter />
        </div>
      </Router>
    )
  }
}

App.propTypes = {
  currentUser: PropTypes.func.isRequired,
  loginCredentials: PropTypes.object
};

const mapStateToProps = state => {
  return { loginCredentials: state.loginCredentials };
}

export default connect(mapStateToProps, {currentUser})(App);