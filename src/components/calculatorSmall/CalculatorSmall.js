'use strict';

import React from 'react';
import CalculatorSmallTitle from './CalculatorSmallTitle';
import CalculatorSmallSelect from './CalculatorSmallSelect';
import CalculatorSmallCounter from "./CalculatorSmallCounter";
import CalculatorSmallPrices from "./CalculatorSmallPrices";
import CalculatorSmallButtons from "./CalculatorSmallButtons";

class CalculatorSmall extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="calc-sm-wrap">
                <CalculatorSmallTitle/>
                <CalculatorSmallSelect serviceComponent={true}/>
                <CalculatorSmallSelect levelComponent={true}/>
                <CalculatorSmallSelect deadlineComponent={true}/>
                <CalculatorSmallCounter/>
                <CalculatorSmallPrices/>
                <CalculatorSmallButtons/>
            </div>
        )
    }
}


CalculatorSmall.displayName = 'CalculatorSmall';

export default CalculatorSmall;