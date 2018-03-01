'use strict';

import React from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import generalOptions from '../../../config/generalOptions';

class CalculatorSmallButtons extends React.Component {

    constructor(props) {
        super(props);
    }

    redirectTo(type) {
        const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const {serviceId, levelId, deadlineId, countPages, email} = this.props;
        const emailUrl = (generalOptions.email) ? ('&email=' + encodeURIComponent(email)) : ''
        let redirectTo = generalOptions.siteMyUrl
            + `/${type}.html?csi=` + serviceId
            + '&cli='  + levelId
            + '&cdi='  + deadlineId
            + '&ccu='  + countPages 
            + emailUrl;
        if (generalOptions.rid) {
            redirectTo += `&rid=${generalOptions.rid}`
        }
        if (generalOptions.dsc) {
            redirectTo += `&dsc=${generalOptions.dsc}`
        }
        if (generalOptions.email) {
            if (email != '' && regExp.test(String(email).toLowerCase())) {
                location.href = redirectTo;
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
        email: state.email
    }
};

const mapDispatchToProps = dispatch => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(CalculatorSmallButtons);
