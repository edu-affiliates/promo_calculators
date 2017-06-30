'use strict';

import React from 'react';

class CalculatorSmallInput extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="calc-sm-input"/>
        )
    }
}


CalculatorSmallInput.displayName = 'CalculatorSmallInput';

export default CalculatorSmallInput;