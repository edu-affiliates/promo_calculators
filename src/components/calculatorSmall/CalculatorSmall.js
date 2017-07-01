'use strict';

import React from 'react';
import CalculatorSmallInput from './CalculatorSmallInput';
import ContainerSmallCounter from "./ContainerSmallCounter";

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
            </div>
        )
    }
}


CalculatorSmall.displayName = 'CalculatorSmall';

export default CalculatorSmall;