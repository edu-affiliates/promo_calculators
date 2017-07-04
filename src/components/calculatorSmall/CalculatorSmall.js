'use strict';

import React from 'react';
import CalculatorSmallInput from './CalculatorSmallSelect';
import CalculatorSmallCounter from "./CalculatorSmallCounter";
import CalculatorSmallPrices from "./CalculatorSmallPrices";

class CalculatorSmall extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="calc-sm-wrap">
                <CalculatorSmallInput serviceComponent={true}/>
                <CalculatorSmallInput levelComponent={true}/>
                <CalculatorSmallInput deadlineComponent={true}/>
                <CalculatorSmallCounter/>
                <CalculatorSmallPrices/>
            </div>
        )
    }
}


CalculatorSmall.displayName = 'CalculatorSmall';

export default CalculatorSmall;