'use strict';

import React from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import generalOptions from '../../../config/generalOptions';
import {plusPage, minusPage, handleInputPageNumber} from '../../../store/actions'


//presentation of the counter in calc small
class TPTableModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emptyInput: false,
            alert: false
        };
        this.handleChange = this.handleChange.bind(this);
    };

    handleChange(e) {
        if (e.target.value === '') {
            this.setState({emptyInput: true})
        } else {
            if (this.state.emptyInput)
                this.setState({emptyInput: false})
        }
        const number = parseInt(e.target.value);

        if (number > this.props.maxPageNumber) {
            this.setState({alert: true})
        }
        this.props.handleInputPageNumber(number);
    }

    handleBlur() {
        this.setState({emptyInput: false});
    }

    redirectTo(type) {
        const {service, level, deadline, pageNumber} = this.props;
        let redirectTo = generalOptions.siteMyUrl
            + `/${type}.html?csi=` + service.id
            + '&cli=' + level.id
            + '&cdi=' + deadline.id
            + '&ccu=' + pageNumber;
        if (generalOptions.rid) {
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
        const fullPriceDiv = (discount === 0) ? <div/> : <div className="tp-modal__price-full-container">
            <div className="tp-modal__price-full">
                <span className="tp-modal__price-line-throw"/>
                ${(fullPrice * pageNumber).toFixed(2)}
            </div>
        </div>;
        return (
            <div className="tp-modal-wrap">
                <div onClick={(e) => {
                    e.stopPropagation();
                    this.props.closeModal();
                }} className="tp-modal__cross">&times;</div>
                <div className="tp-modal">
                    <div className="tp-modal__date">
                        <span className="tp-modal__date--title">Estimate date:</span>
                        <span className="tp-modal__date--value">{this.estimateDay()}</span>
                    </div>
                    <div className="tp-modal__counter">
                        <div onClick={onClickMinus} className="tp-modal__counter-btn tp-modal__counter-btn--minus">
                            <span>-</span>
                        </div>
                        <div className="tp-modal__page-value">
                            <input type="text"
                                   className="tp-modal__page-input"
                                   onBlur={() => this.handleBlur()}
                                   value={(this.state.emptyInput) ? '' : pageNumber}
                                   onChange={(e) => this.handleChange(e)}
                            />
                            <span>{(pageNumber === 1) ? 'page' : 'pages'}</span>
                        </div>
                        <div onClick={onClickPlus} className="tp-modal__counter-btn tp-modal__counter-btn--plus">
                            <span>+</span>
                        </div>
                    </div>
                    <div className="tp-modal__price">
                        <span className="tp-modal__price-title">Estimated price</span>
                        <div className="tp-modal__price-container">
                            {fullPriceDiv}
                            <div className="tp-modal__price-dsc">
                                ${(fullPrice * (1 - discount) * pageNumber).toFixed(2)}
                            </div>
                        </div>
                    </div>
                    <div className="tp-modal__btn-group">
                        <div onClick={() => this.redirectTo('inquiry')} className="tp-modal__btn tp-modal__btn--qoute">
                            free quote
                        </div>
                        <div onClick={() => this.redirectTo('order')} className="tp-modal__btn tp-modal__btn--order">
                            order now
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

TPTableModal.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(TPTableModal);
