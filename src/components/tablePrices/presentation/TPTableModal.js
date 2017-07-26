'use strict';

import React from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import generalOptions from '../../../config/generalOptions';
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


    redirectTo(type) {
        const {service, level, deadline, pageNumber} = this.props;
        let redirectTo = generalOptions.siteMyUrl
            + `/${type}.html?csi=` + service.id
            + '&cli=' + level.id
            + '&cdi=' + deadline.id
            + '&ccu=' + pageNumber;
        if (generalOptions.apiMode !== 'M') {
            redirectTo += `&rid=${generalOptions.rid}`
        }
        location.href = redirectTo;
    }

    estimateDay() {
        const {deadline} = this.props;
        const nowMs = new Date().getTime();
        const deadlineMs = deadline.hours * 60 * 60 * 1000;
        const date = new Date((nowMs + deadlineMs));
        return date.getDate() +
            "/" + (date.getMonth() + 1) +
            "/" + date.getFullYear();
    }

    render() {
        const {onClickPlus, onClickMinus, fullPrice, discount, pageNumber, service, level} = this.props;
        return (
            <div className="tp-modal-wrap">
                <div className="tp-modal">
                    <div className="tp-modal-dsc-wrap">
                        <div className="tp-modal-dsc">
                            <span className="tp-modal-dsc__title">Estimate day:</span>
                            <span className="tp-modal-dsc__value">{this.estimateDay()}</span>
                        </div>
                        {/*<div className="tp-modal-dsc">*/}
                            {/*<span className="tp-modal-dsc__title">Type of service: </span>*/}
                            {/*<span className="tp-modal-dsc__value">{service.name}</span>*/}
                        {/*</div>*/}
                        {/*<div className="tp-modal-dsc">*/}
                            {/*<span className="tp-modal-dsc__title">Academic level:</span>*/}
                            {/*<span className="tp-modal-dsc__value">{level.name}</span>*/}
                        {/*</div>*/}
                    </div>
                    <div className="tp-counter-wrap">
                        <div onClick={onClickMinus} className="tp-counter tp-counter--minus">
                            <span>-</span>
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
                    <div className="tp-prices-wrap">
                        <div className="tp-price-dsc">
                            <span className="tp-price-dsc__title">Estimate price</span>
                        </div>
                        <div className="tp-price tp-price--full">${(fullPrice * pageNumber).toFixed(2)}</div>
                        <div className="tp-price tp-price--dsc">
                            ${(fullPrice * (1 - discount) * pageNumber).toFixed(2)}</div>
                    </div>
                    <div className="tp-btn-group">
                        <div onClick={() => this.redirectTo('inquiry')} className="tp-btn tp-btn--qoute">free quote
                        </div>
                        <div onClick={() => this.redirectTo('order')} className="tp-btn tp-btn--order">order now</div>
                    </div>
                </div>
            </div>
        )
    }
}

TPTableCounter.propTypes = {
    onClickPlus: PropTypes.func.isRequired,
    onClickMinus: PropTypes.func.isRequired,
    pageNumber: PropTypes.number.isRequired,
    fullPrice: PropTypes.number.isRequired,
    discount: PropTypes.number.isRequired,
    service: PropTypes.object.isRequired,
    level: PropTypes.object.isRequired,
    deadline: PropTypes.object.isRequired,

};

//container to match redux state to component props and dispatch redux actions to callback props
const mapStateToProps = (reduxState, ownProps) => {
    const state = reduxState.calculatorSmall[ownProps.calcId];
    return {
        discount: reduxState.discount,
        fullPrice: state.deadline.price,
        pageNumber: state.pageNumber,
        currentDeadline: state.deadline,
        service: state.service,
        level: state.level,
        deadline: state.deadline,
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
