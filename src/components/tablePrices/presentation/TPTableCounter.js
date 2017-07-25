'use strict';

import React from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {plusPage, minusPage, handleInputPageNumber} from '../../../store/actions'


//presentation of the counter in calc small
class TPTableCounter extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    };

    handleChange(e) {
        const number = parseInt(e.target.value);
        this.props.handleInputPageNumber(number);
    }

    render() {
        const {onClickPlus, onClickMinus, pageNumber, currentDeadline, deadlineId} = this.props;
        return (
            <div className={`${(currentDeadline.id === deadlineId)? 'active' : ''} tp-counter-wrap`}>
                <div onClick={onClickMinus} className="tp-counter tp-counter--minus">
                    <span>&#65293;</span>
                </div>
                <div className="tp-page-value">
                    <input value={pageNumber}
                           onChange={(e) => this.handleChange(e)}
                           type="text" className="tp-page-value__input"/>
                    <span>{(pageNumber === 1) ? 'page' : 'pages'}</span>
                </div>
                <div onClick={onClickPlus} className="tp-counter tp-counter--plus">
                    <span>+</span>
                </div>
            </div>
        )
    }
}

TPTableCounter.propTypes = {
    onClickPlus: PropTypes.func.isRequired,
    onClickMinus: PropTypes.func.isRequired,
    pageNumber: PropTypes.number.isRequired
};

//container to match redux state to component props and dispatch redux actions to callback props
const mapStateToProps =  (reduxState, ownProps)  => {
    const state = reduxState.calculatorSmall[ownProps.calcId];
    return {
        pageNumber: state.pageNumber,
        currentDeadline: state.deadline
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

export default connect(mapStateToProps, mapDispatchToProps)(TPTableCounter);
