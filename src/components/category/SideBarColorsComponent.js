import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';

class CategorySideBarColors extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  applyColorFilter(event) {
    this.props.addQueryStringToUrl({ 'product_color': event.target.value }, { add: event.target.checked });
  }

  clearColorFilter(event) {
    event.preventDefault();
    this.props.addQueryStringToUrl({ 'product_color': event.target.value }, { clear: true });
    this.colorFilterForm.reset();
  }

  submitColorFilter(event) {
    event.preventDefault();
    event.target.reset();
  }

  render() {
    return (
      <div className="panel panel-default sidebar-menu sidebar-color-filter">

        <div className="panel-heading">
          <h3 className="panel-title">Colours <a className="btn btn-xs btn-danger pull-right" onClick={(event) => this.clearColorFilter(event)}><i className="fa fa-times-circle"></i> Clear</a></h3>
        </div>

        <div className="panel-body">

          <form onSubmit={this.submitColorFilter} ref={(el) => this.colorFilterForm = el}>
            <div className="form-group scroll-container">
              {(this.props.colorList.list || []).map((color, index) => {
                return <div className="checkbox" key={`${color.color_code}-${index}`}>
                  <label><input type="checkbox" onChange={(event) => this.applyColorFilter(event)} value={color.color_code} />{color.color_name}</label>
                </div>
              })}
            </div>

            <button type="submit" className="btn btn-default btn-sm btn-primary"><i className="fa fa-pencil"></i> Apply</button>

          </form>

        </div>
      </div>
    );
  };
}

export default CategorySideBarColors;