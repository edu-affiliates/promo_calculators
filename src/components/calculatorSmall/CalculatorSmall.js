'use strict';

import React from 'react';
import CalculatorSmallInput from './CalculatorSmallInput';
import CalculatorSmallCounter from "./CalculatorSmallCounter";

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
                <CalculatorSmallCounter/>
            </div>
        )
    }
}


CalculatorSmall.displayName = 'CalculatorSmall';

export default CalculatorSmall;