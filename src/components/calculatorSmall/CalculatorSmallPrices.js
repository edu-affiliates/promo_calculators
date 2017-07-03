'use strict';

import React from 'react';
import {connect} from 'react-redux'
import {plusPage, minusPage} from './actions'
import PropTypes from 'prop-types'

let fullPrice = 12;
let dcsPrice = 10.20;

//presentation of the price in calc small

const CalculatorSmallPrices = ({fullPrice, dcsPrice}) => (
    <div className="calc-sm-prices-wrap">
        <div className="calc-sm-price calc-sm-price--full">{fullPrice}</div>
        <div className="calc-sm-price calc-sm-price--dsc">{dcsPrice}</div>
    </div>
);

CalculatorSmallPrices.propTypes = {
    fullPrice: PropTypes.number.isRequired,
    dcsPrice: PropTypes.number.isRequired
};

//container to match redux state to component props and dispatch redux actions to callback props

const mapStateToProps = state => {
    return {
        fullPrice: state.fullPrice,
        dcsPrice: state.dcsPrice
    }
};

const mapDispatchToProps = dispatch => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(CalculatorSmallPrices);
