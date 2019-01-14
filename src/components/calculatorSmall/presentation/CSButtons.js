'use strict';

import React from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import generalOptions from '../../../config/generalOptions';
import helper from '../../../api/helper'
import {appendLead} from '../../../api/mautic'
import {handleValidEmail, loadingLead} from '../../../store/actions';
import { width } from 'window-size';

class CalculatorSmallButtons extends React.Component {

    constructor(props) {
        super(props);
    }

    redirectTo(type) {
        const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const {service: serviceId, level: levelId, deadline: deadlineId, countPages, email, loading_lead} = this.props;
        let emailUrl = (generalOptions.email) ? ('&email=' + encodeURIComponent(email)) : '';
        let redirectTo = generalOptions.siteMyUrl
            + `/${type}?csi=` + serviceId.id
            + '&cli='  + levelId.id
            + '&cdi='  + deadlineId.id
            + '&ccu='  + countPages 
            + emailUrl;
        let data_lead = {
            email: email,
            serviceName: serviceId.name,
            deadlineName: deadlineId.name,
            levelName: levelId.name,
            dsc: (generalOptions.dsc) ? generalOptions.dsc : '',
            countPages: countPages
        }
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
                this.props.handleValidEmail(false);
                this.props.loadingLead(true);
                appendLead(data_lead, redirectTo);
            } else {
                this.props.handleValidEmail(true);
            }
        } else {
            location.href = redirectTo;
        }
    }

    render() {
        const {calcButtonOrderTitle: cbot, calcButtonInquiryTitle: cbit, loading_lead: loadingLead} = this.props;
        let Buttons;
        const loading = (this.props.loading_lead) ? <div>
            <img style={{width: '30px'}} src="https://s3.amazonaws.com/genericapps/resources/calculators/spiner.svg" />
        </div> : <div/>;
        
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
            <div style={{flex: '1'}}>
                <div style={{display: !this.props.loading_lead ? 'block' : 'none'}}>{Buttons}</div>
                {loading}
            </div>
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
        service: state.service,
        level: state.level,
        deadline: state.deadline,
        countPages: state.pageNumber,
        email: state.email,
        loading_lead: state.loading_lead
    }
};


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleValidEmail: (emailValid) => {
            dispatch(handleValidEmail(emailValid, ownProps.calcId));
        },
        loadingLead: (loading_lead) => {
            dispatch(loadingLead(loading_lead, ownProps.calcId));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CalculatorSmallButtons);
