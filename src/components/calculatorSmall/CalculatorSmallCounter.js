'use strict';

import React from 'react';

class CalculatorSmallCounter extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="calc-sm-input">
                <div className="calc-sm-counter">
                    <div>-</div>
                    <div>
                        <input type="text"/><span>page</span>
                    </div>
                    <div>+</div>
                </div>
            </div>
        )
    }
}


CalculatorSmallCounter.displayName = 'CalculatorSmallCounter';

export default CalculatorSmallCounter;