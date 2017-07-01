'use strict';

import React from 'react';
import PropTypes from 'prop-types'

const CalculatorSmallCounter = ({onClickPlus, onClickMinus, pageNumber}) => (
    <div className="calc-sm-input">
        <div className="calc-sm-counter">
            <div onClick={onClickMinus}>-</div>
            <div>
                <input value={pageNumber} type="text"/><span>page</span>
            </div>
            <div onClick={onClickPlus}>+</div>
        </div>
    </div>
);

CalculatorSmallCounter.propTypes = {
    onClickPlus: PropTypes.func.isRequired,
    onClickMinus: PropTypes.func.isRequired,
    pageNumber: PropTypes.number.isRequired
};

export default CalculatorSmallCounter;