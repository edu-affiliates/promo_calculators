'use strict';

import React from 'react';

class CLPrices extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="calc-lg-prices-wrap">
        <div className="calc-lg-price calc-lg-price--full"></div>
        <div className="calc-lg-price calc-lg-price--dsc"></div>
      </div>
    )
  }
}

export default CLPrices;
