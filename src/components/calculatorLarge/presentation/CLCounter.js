'use strict';

import React from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {plusPage, minusPage, handleInputPageNumber} from '../../../store/actions'
import generalOptions from '../../../config/generalOptions';

class CLCounter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            emptyInput: false,
            alert: false
        };
        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(e) {
        const value = e.target.value;
        this.handleEmptyInput(value);
        const number = parseInt(e.target.value);
        if (number > this.props.maxPageNumber) {
            this.handleAlert(number);
        }
        this.props.handleInputPageNumber(number);
    }

    handleEmptyInput(value) {
        if (value === '') {
            this.setState({emptyInput: true})
        } else {
            if (this.state.emptyInput)
                this.setState({emptyInput: false})
        }
    }

    handleAlert() {
        this.setState({alert: true});
        setTimeout(() => this.setState({alert: false}), 3000);
    }

    handleBlur() {
        this.setState({emptyInput: false});
    }

    render() {
        const {onClickPlus, onClickMinus, pageNumber, maxPageNumber, fullPrice, discount} = this.props;
        const alert = (this.state.alert) ? <div className="cl-page-value__alert">
            <span>This is maximum number of pages for current deadline.</span>
            <span onClick={() => {
                this.setState({alert: false})
            }} className="cl-page-value__alert--cross">&times;</span>
        </div> : <div/>
        return (
            <div className="cl-counter-group">
                <div className="cl-select-title">Number of Pages:</div>
                <div className="cl-counter-wrap">
                    <div>
                        <div className="cl-counter">
                            <div onClick={onClickMinus} className="cl-counter-btn cl-counter-btn--minus">
                                <span/>
                            </div>
                            <div className="cl-page-value">
                                <input type="text"
                                       onBlur={() => this.handleBlur()}
                                       value={(this.state.emptyInput) ? '' : pageNumber}
                                       onChange={(e) => this.handleChange(e)}
                                       className="cl-page-value__input"/>
                            </div>
                            <div
                                onClick={(pageNumber < maxPageNumber) ? onClickPlus : () => this.handleAlert()}
                                className="cl-counter-btn cl-counter-btn--plus">
                                <span/>
                            </div>
                        </div>
                    </div>
                    <div className="cl-single-price">
                        <span className="cl-single-price__title">Price per page:</span>
                        <span className="cl-single-price__value">{generalOptions.currency} {(fullPrice * (1 - discount)).toFixed(2)}</span>
                    </div>
                </div>
                {alert}
            </div>

        )
    }
}

CLCounter.PropTypes = {
    onClickPlus: PropTypes.func.isRequired,
    onClickMinus: PropTypes.func.isRequired,
    pageNumber: PropTypes.number.isRequired,
    maxPageNumber: PropTypes.number.isRequired,
    fullPrice: PropTypes.number.isRequired,
    discount: PropTypes.number.isRequired,
};

//container to match redux state to component props and dispatch redux actions to callback props
const mapStateToProps = (reduxState, ownProps) => {
    const state = reduxState.calculatorSmall[ownProps.calcId];
    return {
        discount: reduxState.discount,
        fullPrice: state.deadline.price,
        maxPageNumber: state.deadline.max_pages,
        pageNumber: state.pageNumber,
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
