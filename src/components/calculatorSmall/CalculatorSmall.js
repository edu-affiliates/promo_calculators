'use strict';

import React from 'react';
import CalculatorSmallInput from './CalculatorSmallInput';
import ContainerSmallCounter from "./ContainerSmallCounter";
import CalculatorSmallPrices from "./CalculatorSmallPrices";

class CalculatorSmall extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="calc-sm-wrap">
                <CalculatorSmallInput/>
                <CalculatorSmallInput/>
                <CalculatorSmallInput/>
                <ContainerSmallCounter/>
                <CalculatorSmallPrices/>
            </div>
        )
    }
}


CalculatorSmall.displayName = 'CalculatorSmall';

export default CalculatorSmall;