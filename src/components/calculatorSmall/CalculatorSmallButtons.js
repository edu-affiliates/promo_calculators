'use strict';

import React from 'react';
import {connect} from 'react-redux'
import generalOptions from '../generalOptions';

class CalculatorSmallButtons extends React.Component {

    constructor(props) {
        super(props);
    }

    redirectTo(type) {
        const {serviceId, levelId, deadlineId, countPages} = this.props;
        let redirectTo = generalOptions.siteMyUrl
            + `/${type}.html?csi=` + serviceId
            + '&cli=' + levelId
            + '&cdi=' + deadlineId
            + '&ccu=' + countPages;
        if (generalOptions.apiMode !== 'M') {
            redirectTo += `&rid=${generalOptions.rid}`
        }
        location.href = redirectTo;
    }

    render() {
        return (
            <div className="calc-sm-btn-group">
                <div onClick={() => this.redirectTo('inquiry')} className="calc-sm-btn calc-sm-btn--qoute">free quote
                </div>
                <div onClick={() => this.redirectTo('order')} className="calc-sm-btn calc-sm-btn--order">order now</div>
            </div>
        )
    }
}


//container to match redux state to component props and dispatch redux actions to callback props
const mapStateToProps = state => {
    return {
        serviceId: state.service.id,
        levelId: state.level.id,
        deadlineId: state.deadline.id,
        countPages: state.pageNumber
    }
};

const mapDispatchToProps = dispatch => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(CalculatorSmallButtons);