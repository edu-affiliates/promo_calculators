'use strict';

import React from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import generalOptions from '../../../config/generalOptions';

class CFButtons extends React.Component {

    constructor(props) {
        super(props);
    }

    redirectTo(type) {
        const {serviceId, levelId, deadlineId, countPages} = this.props;
        let redirectTo = generalOptions.siteMyUrl
            + `/${type}?csi=` + serviceId
            + '&cli=' + levelId
            + '&cdi=' + deadlineId
            + '&ccu=' + countPages;
        if (generalOptions.rid) {
            redirectTo += `&rid=${generalOptions.rid}`
        }
        if (generalOptions.dsc) {
            redirectTo += `&dsc=${generalOptions.dsc}`
        }
        location.href = redirectTo;
    }

    render() {
        return (
            <div className="cf-btn-group">
                <div onClick={() => this.redirectTo('order')} className="cf-btn cf-btn--order">order</div>
            </div>
        )
    }
}

CFButtons.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(CFButtons);
