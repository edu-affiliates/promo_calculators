'use strict';

import React from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {plusPage, minusPage, handleInputPageNumber} from '../../../store/actions'


//presentation of the counter in calc small
class CalculatorSmallCounter extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    };

    handleChange(e) {
        const number = parseInt(e.target.value);
        this.props.handleInputPageNumber(number);
    }

    render() {
        const {onClickPlus, onClickMinus, pageNumber} = this.props;
        return (
            <div className="cs-counter-wrap">
                <div onClick={onClickMinus} className="cs-counter cs-counter--minus">
                    <span>&#65293;</span>
                </div>
                <div className="cs-page-value">
                    <input value={pageNumber}
                           onChange={(e) => this.handleChange(e)}
                           type="text" className="cs-page-value__input"/>
                    <span>{(pageNumber == 1) ? 'page' : 'pages'}</span>
                </div>
                <div onClick={onClickPlus} className="cs-counter cs-counter--plus">
                    <span>+</span>
                </div>
            </div>
        )
    }
}

CalculatorSmallCounter.propTypes = {
    onClickPlus: PropTypes.func.isRequired,
    onClickMinus: PropTypes.func.isRequired,
    pageNumber: PropTypes.number.isRequired
};

//container to match redux state to component props and dispatch redux actions to callback props
const mapStateToProps =  (reduxState, ownProps)  => {
  const state = reduxState.calculatorSmall[ownProps.calcId];
  return {
        pageNumber: state.pageNumber
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClickMinus: () => {
            dispatch(minusPage(ownProps.calcId))
        },
        onClickPlus: () => {
            dispatch(plusPage(ownProps.calcId))
        },
        handleInputPageNumber: (number) => {
            dispatch(handleInputPageNumber(number, ownProps.calcId));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CalculatorSmallCounter);
