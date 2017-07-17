'use strict';

import React from 'react';

class CLSelect extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="calc-lg-select-wrap">
          <div>Type of Service:</div>
          <ul className="calc-lg-select-list">
            <li className="calc-lg-select-item">Essay</li>
            <li className="calc-lg-select-item">Research Paper</li>
            <li className="calc-lg-select-item">Term Paper</li>
            <li className="calc-lg-select-item">Dissertation</li>
            <li className="calc-lg-select-item">Choose Other</li>
          </ul>
        </div>
        <div className="calc-lg-select-wrap">
          <div>Type of Service:</div>
          <ul className="calc-lg-select-list">
            <li className="calc-lg-select-item">Master's</li>
            <li className="calc-lg-select-item">PhD</li>
          </ul>
        </div>
      </div>
    )
  }
}

export default CLSelect;
