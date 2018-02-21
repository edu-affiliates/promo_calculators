'use strict';

import React from 'react';
import {connect} from 'react-redux'
import generalOptions from '../../config/generalOptions'

class Button extends React.Component {

    constructor(props) {
        super(props);
    }


    redirectTo() {
        const {type, serviceId, levelId, deadlineId} = this.props;
        let redirectTo = generalOptions.siteMyUrl
            + `/${type}.html?csi=` + serviceId
            + '&cli=' + levelId
            + '&cdi=' + deadlineId
            + '&ccu=' + 1;
        if (generalOptions.rid) {
            redirectTo += `&rid=${generalOptions.rid}`
        }
        if (generalOptions.dsc) {
            redirectTo += `&dsc=${generalOptions.dsc}`
        }
        if (type != 'dashboard') {
            location.href = redirectTo;
        } else {
            location.href = generalOptions.siteMyUrl + `/${type}.html`;
        }
    }

    render() {
        return (
            <div onClick={() => this.redirectTo()} className={this.props.class}>{this.props.name}</div>
        )

    }
}


//container to match redux state to component props and dispatch redux actions to callback props
const mapStateToProps = state => {
    return {
        serviceId: state.serviceId,
        levelId: state.levelId,
        deadlineId: state.deadlineId,
    }
};

const mapDispatchToProps = dispatch => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(Button);