'use strict';

import React from 'react';
import {connect} from 'react-redux'
import {plusPage, minusPage} from './actions'
import PropTypes from 'prop-types'

//presentation of the price in calc small

const CalculatorSmallPrices = ({fullPrice, discount, pageNumber}) => (
    <div className="calc-sm-prices-wrap">
        <div className="calc-sm-price calc-sm-price--full">${(fullPrice * pageNumber).toFixed(2)}</div>
        <div className="calc-sm-price calc-sm-price--dsc">${(fullPrice * (1 - discount) * pageNumber).toFixed(2)}</div>
    </div>
);

CalculatorSmallPrices.propTypes = {
    fullPrice: PropTypes.number.isRequired,
    dcsPrice: PropTypes.number.isRequired
};

//container to match redux state to component props and dispatch redux actions to callback props

const mapStateToProps = state => {
    return {
        fullPrice: state.current.deadline.price,
        discount: state.discount,
        pageNumber: state.pageNumber
    }
};

const mapDispatchToProps = dispatch => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(CalculatorSmallPrices);
