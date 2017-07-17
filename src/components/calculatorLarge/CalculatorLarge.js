'use strict';

import React from 'react';
import CLTitle from './presentation/CLTitle';
import CLSelect from './presentation/CLSelect';
import CLRange from './presentation/CLRange';
import CLCounter from './presentation/CLCounter';
import CLPrices from './presentation/CLPrices';
import CLButtons from './presentation/CLButtons';

class CalculatorLarge extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="calc-lg-container">
        <CLTitle/>
        <CLSelect/>
        <CLRange/>
        <CLCounter/>
        <CLPrices/>
       <CLButtons/>
      </div>
    )
  }
}


CalculatorLarge.displayName = 'CalculatorLarge';

export default CalculatorLarge;
