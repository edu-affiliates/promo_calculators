'use strict';

import React from 'react';

class CLCounter extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="calc-lg-range-wrap">
        <ul className="calc-lg-range">
          <li className="calc-lg-range-item">
            <div className="calc-lg-range-popup">
              <span className="calc-lg-range-popup__text">15 days+</span></div>
          </li>
          <li className="calc-lg-range-item">
            <div className="calc-lg-range-popup">
              <span className="calc-lg-range-popup__text">10 days</span></div>
          </li>
          <li className="calc-lg-range-item">
            <div className="calc-lg-range-popup">
              <span className="calc-lg-range-popup__text">5 days</span></div>
          </li>
          <li className="calc-lg-range-item">
            <div className="calc-lg-range-popup">
              <span className="calc-lg-range-popup__text">2 days</span></div>
          </li>
        </ul>
      </div>
    )
  }
}

export default CLCounter;

