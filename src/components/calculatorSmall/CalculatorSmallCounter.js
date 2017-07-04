'use strict';

import React from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {plusPage, minusPage, changeService} from './actions'


//presentation of the counter in calc small

const CalculatorSmallCounter = ({onClickPlus, onClickMinus, pageNumber, changeService, deadline}) => (
    <div className="calc-sm-counter-wrap">
        <div onClick={onClickMinus} className="calc-sm-counter calc-sm-counter--minus">
            <span>&#65293;</span>
        </div>
        <div className="calc-sm-page-value">
            <input value={pageNumber} type="text" className="calc-sm-page-value__input"/>
            <span>{(pageNumber == 1) ? 'page' : 'pages'}</span>
        </div>
        <div onClick={onClickPlus} className="calc-sm-counter calc-sm-counter--plus">
            <span>+</span>
        </div>
    </div>
);

CalculatorSmallCounter.propTypes = {
    onClickPlus: PropTypes.func.isRequired,
    onClickMinus: PropTypes.func.isRequired,
    changeService: PropTypes.func.isRequired,
    pageNumber: PropTypes.number.isRequired
};

//container to match redux state to component props and dispatch redux actions to callback props
const mapStateToProps = state => {
    return {
        pageNumber: state.pageNumber,
        deadline: state.current.deadline
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onClickMinus: () => {
            dispatch(minusPage())
        },
        onClickPlus: () => {
            dispatch(plusPage())
        },
        changeService: () => {
            dispatch(changeService('2183'))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CalculatorSmallCounter);