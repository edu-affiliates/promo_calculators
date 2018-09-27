'use strict';

import React from 'react';
import {connect} from 'react-redux'
import generalOptions from '../../../config/generalOptions';

class Button extends React.Component {

    constructor(props) {
        super(props);
    }

    redirectTo(type) {
        const {serviceId, levelId, deadlineId, pageNumber} = this.props;
        let redirectTo = generalOptions.siteMyUrl
            + `/${type}?csi=` + serviceId
            + '&cli=' + levelId
            + '&cdi=' + deadlineId
            + '&ccu=' + pageNumber;
        if (generalOptions.rid) {
            redirectTo += `&rid=${generalOptions.rid}`
        }
        if (generalOptions.dsc) {
            redirectTo += `&dsc=${generalOptions.dsc}`
        }
        location.href = redirectTo;
    }



    render() {
        const {service} = this.props;
            return (

                    <div className="cswb__btns">
                        <div className="cswb__btn cswb__btn--order"
                             onClick={() => this.redirectTo('order')}>Order {service}</div>
                    </div>
            )
    }
}


//container to match redux state to component props and dispatch redux actions to callback props

const mapStateToProps = (reduxState, ownProps) => {
    const state = reduxState.calculatorSmall[ownProps.calcId];
    return {
        pageNumber: state.pageNumber,
        service: state.service.name,
        serviceId: state.service.id,
        levelId: state.level.id,
        deadlineId: state.deadline.id,
    }
};


const mapDispatchToProps = (dispatch, ownProps) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(Button);