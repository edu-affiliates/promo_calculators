'use strict';

import React from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import generalOptions from '../../../config/generalOptions';

class CLButtons extends React.Component {

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
            <div className="calc-lg-btn-group">
                <div onClick={() => this.redirectTo('inquiry')} className="calc-lg-btn calc-lg-btn--qoute">free quote
                </div>
                <div onClick={() => this.redirectTo('order')} className="calc-lg-btn calc-lg-btn--order">order now</div>
            </div>
        )
    }
}

CLButtons.propTypes = {
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
        countPages: state.pageNumber
    }
};

const mapDispatchToProps = dispatch => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(CLButtons);