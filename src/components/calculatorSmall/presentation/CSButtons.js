'use strict';

import React from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import generalOptions from '../../../config/generalOptions';
import helper from '../../../api/helper'
import {handleValidEmail, initCalc} from '../../../store/actions';

class CalculatorSmallButtons extends React.Component {

    constructor(props) {
        super(props);
    }

    redirectTo(type) {
        const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const {serviceId, levelId, deadlineId, countPages, email, emailValid} = this.props;
        const emailUrl = (generalOptions.email) ? ('&email=' + encodeURIComponent(email)) : '';
        let emlValid;
        let redirectTo = generalOptions.siteMyUrl
            + `/${type}?csi=` + serviceId
            + '&cli='  + levelId
            + '&cdi='  + deadlineId
            + '&ccu='  + countPages 
            + emailUrl;
        if (generalOptions.rid) {
            redirectTo += `&rid=${generalOptions.rid}`
        }
        if (helper.getUrlParam('dsc') && helper.isFakeAccount(helper.getUrlParam('rid'))) {
            redirectTo += `&dsc=${helper.getUrlParam('dsc')}`
        } else {
            if (generalOptions.dsc) { 
                redirectTo += `&dsc=${generalOptions.dsc}`
            }
        }
        if (generalOptions.email) {
            if (email != '' && regExp.test(String(email).toLowerCase())) {
                let emlValid = false;
                this.props.handleValidEmail(emlValid);
                location.href = redirectTo;
            } else {
                emlValid = true;
                this.props.handleValidEmail(emlValid);
            }
        } else {
            location.href = redirectTo;
        }
    }

    render() {
        const {serviceId, levelId, deadlineId, countPages, email, calcButtonOrderTitle: cbot, calcButtonInquiryTitle: cbit} = this.props;
        let Buttons;
        if (!!cbot && !!cbit) {
            Buttons =
                <div className="cs-btn-group">
                    <div onClick={() => this.redirectTo('inquiry')} className="cs-btn cs-btn--qoute">{cbit}</div>
                    <div onClick={() => this.redirectTo('order')} className="cs-btn cs-btn--order">{cbot}</div>
                </div>
        } else if (cbot) {
            Buttons =
                <div className="cs-btn-group">
                    <div onClick={() => this.redirectTo('inquiry')} className="cs-btn cs-btn--qoute">free quote</div>
                    <div onClick={() => this.redirectTo('order')} className="cs-btn cs-btn--order">{cbot}</div>
                </div>
        } else if (cbit) {
            Buttons =
                <div className="cs-btn-group">
                    <div onClick={() => this.redirectTo('inquiry')} className="cs-btn cs-btn--qoute">{cbit}</div>
                    <div onClick={() => this.redirectTo('order')} className="cs-btn cs-btn--order">order now</div>
                </div>
        } 
        else {
            Buttons =
                <div className="cs-btn-group">
                    <div onClick={() => this.redirectTo('inquiry')} className="cs-btn cs-btn--qoute">free quote</div>
                    <div onClick={() => this.redirectTo('order')} className="cs-btn cs-btn--order">order now</div>
                </div>
        }
        return (
            Buttons
        )
    }
}

CalculatorSmallButtons.propTypes = {
    serviceId: PropTypes.number.isRequired,
    levelId: PropTypes.number.isRequired,
    deadlineId: PropTypes.number.isRequired,
    countPages: PropTypes.number.isRequired
};

//container to match redux state to component props and dispatch redux actions to callback props
const mapStateToProps = (reduxState, ownProps) => {
    const state = reduxState.calculatorSmall[ownProps.calcId];
    return {
        serviceId: state.service.id,
        levelId: state.level.id,
        deadlineId: state.deadline.id,
        countPages: state.pageNumber,
        email: state.email,
        emailValid: state.emailValid
    }
};


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleValidEmail: (emailValid) => {
            dispatch(handleValidEmail(emailValid, ownProps.calcId));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CalculatorSmallButtons);
