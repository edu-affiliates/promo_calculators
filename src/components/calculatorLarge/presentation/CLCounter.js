'use strict';

import React from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {plusPage, minusPage, handleInputPageNumber} from '../../../store/actions'

class CLCounter extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(e) {
        const number = parseInt(e.target.value);
        this.props.handleInputPageNumber(number);
    }

    render() {
        const {onClickPlus, onClickMinus, pageNumber, fullPrice} = this.props;
        return (
            <div className="calc-lg-counter-group">
                <div className="calc-lg-counter-wrap">
                    <div onClick={onClickMinus} className="calc-lg-counter calc-lg-counter--minus">
                        <span>-</span>
                    </div>
                    <div className="calc-lg-page-value">
                        <input type="text"
                               value={pageNumber}
                               onChange={(e) => this.handleChange(e)}
                               className="calc-lg-page-value__input"/>
                        <span>{(pageNumber === 1) ? 'page' : 'pages'}</span>
                    </div>
                    <div onClick={onClickPlus} className="calc-lg-counter calc-lg-counter--plus">
                        <span>+</span>
                    </div>
                </div>
                <div className="calc-lg-single-price">
                    <span className="calc-lg-single-price__title">Price per page</span>
                    <span className="calc-lg-single-price__value">$ {fullPrice.toFixed(2)}</span></div>
            </div>
        )
    }
}

CLCounter.propTypes = {
    onClickPlus: PropTypes.func.isRequired,
    onClickMinus: PropTypes.func.isRequired,
    pageNumber: PropTypes.number.isRequired
};

//container to match redux state to component props and dispatch redux actions to callback props
const mapStateToProps = (reduxState, ownProps) => {
    const state = reduxState.calculatorSmall[ownProps.calcId];
    return {
        fullPrice: state.deadline.price,
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

export default connect(mapStateToProps, mapDispatchToProps)(CLCounter);