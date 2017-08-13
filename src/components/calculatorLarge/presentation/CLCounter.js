'use strict';

import React from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {plusPage, minusPage, handleInputPageNumber} from '../../../store/actions'

class CLCounter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            emptyInput: false
        };
        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(e) {
        console.log(e.target.value === '');
        if (e.target.value === '') {
            this.setState({emptyInput: true})
        } else {
            if (this.state.emptyInput)
                this.setState({emptyInput: false})
        }
        const number = parseInt(e.target.value);
        this.props.handleInputPageNumber(number);
    }

    render() {
        const {onClickPlus, onClickMinus, pageNumber, fullPrice, discount} = this.props;
        return (
            <div className="cl-counter-group">
                <div className="cl-counter-wrap">
                    <div>
                        <div className="cl-select-title">Number of Pages:</div>
                        <div className="cl-counter">
                            <div onClick={onClickMinus} className="cl-counter-btn cl-counter-btn--minus">
                                <span></span>
                            </div>
                            <div className="cl-page-value">
                                <input type="text"
                                       onBlur={console.log('lost focus')}
                                       value={(this.state.emptyInput) ? '' : pageNumber}
                                       onChange={(e) => this.handleChange(e)}
                                       className="cl-page-value__input"/>
                            </div>
                            <div onClick={onClickPlus} className="cl-counter-btn cl-counter-btn--plus">
                                <span></span>
                            </div>
                        </div>
                    </div>
                    <div className="cl-single-price">
                        <span className="cl-single-price__title">Price per page:</span>
                        <span className="cl-single-price__value">$ {(fullPrice * (1 - discount)).toFixed(2)}</span>
                    </div>
                </div>
            </div>
        )
    }
}

CLCounter.propTypes = {
    onClickPlus: PropTypes.func.isRequired,
    onClickMinus: PropTypes.func.isRequired,
    pageNumber: PropTypes.number.isRequired,
    fullPrice: PropTypes.number.isRequired,
    discount: PropTypes.number.isRequired,
};

//container to match redux state to component props and dispatch redux actions to callback props
const mapStateToProps = (reduxState, ownProps) => {
    const state = reduxState.calculatorSmall[ownProps.calcId];
    return {
        fullPrice: state.deadline.price,
        discount: reduxState.discount,
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