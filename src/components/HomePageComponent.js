import React, { Component } from 'react';
import { BrowserRouter as Router, Link, NavLink } from 'react-router-dom';

class HomePageComponent extends Component {

    render() {
        return (
            <div>
                <div className="container">
                    <div className="col-md-12">
                        {/* <div id="main-slider">
                            <div className="item">
                                <img src="img/main-slider1.jpg" alt="" className="img-responsive" />
                            </div>
                            <div className="item">
                                <img className="img-responsive" src="img/main-slider2.jpg" alt="" />
                            </div>
                            <div className="item">
                                <img className="img-responsive" src="img/main-slider3.jpg" alt="" />
                            </div>
                            <div className="item">
                                <img className="img-responsive" src="img/main-slider4.jpg" alt="" />
                            </div>
                        </div> */}
                        {/* <!-- /#main-slider --> */}
                        <div className="item">
                            <img src="img/main-slider1.jpg" alt="" className="img-responsive" />
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

export default HomePageComponent;