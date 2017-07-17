'use strict';

import React from 'react';

class CLCounter extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="calc-lg-counter-wrap">
        <div className="calc-lg-counter">
          <div className="calc-lg-counter calc-lg-counter--minus">
            <span>&#65293;</span>
          </div>
          <div className="calc-lg-page-value">
            <input type="text" className="calc-lg-page-value__input"/>
            <span>1</span>
          </div>
          <div className="calc-lg-counter calc-lg-counter--plus">
            <span>+</span>
          </div>
        </div>
        <div className="calc-lg-single-price">$12</div>
      </div>
    )
  }
}

export default CLCounter;
