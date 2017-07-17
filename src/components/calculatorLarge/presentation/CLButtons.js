'use strict';

import React from 'react';

class CLButtons extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="calc-lg-btn-group">
        <div className="calc-lg-btn calc-lg-btn--qoute">free quote
        </div>
        <div className="calc-lg-btn calc-lg-btn--order">order now</div>
      </div>
    )
  }
}

export default CLButtons;
