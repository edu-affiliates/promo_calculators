'use strict';

import React from 'react';
import {connect} from 'react-redux'
import generalOptions from '../../config/generalOptions'

class Button extends React.Component {

    constructor(props) {
        super(props);
    }


    redirectTo() {
        const {type, service, serviceId, levelId, deadlineId, serviceName} = this.props;
        let srvcId;
        if (this.props.service !== undefined) {
            for (const i in this.props.serviceName) {
                if (this.props.serviceName[i].name.toLowerCase() == this.props.service.toLowerCase()) {
                    srvcId = this.props.serviceName[i].id;
                }
            }
        }
        let redirectTo = generalOptions.siteMyUrl
            + `/${type}.html?cli=` + levelId
            + '&cdi=' + deadlineId
            + '&ccu=' + 1;
        
        if (generalOptions.rid) {
            redirectTo += `&rid=${generalOptions.rid}`
        }
        if (generalOptions.dsc) {
            redirectTo += `&dsc=${generalOptions.dsc}`
        }
        if (this.props.service === undefined || this.props.service == '') {
            redirectTo += `&csi=${serviceId}`
        } else {
            redirectTo += `&csi=${srvcId}`
        }
        if (type != 'dashboard') {
            location.href = redirectTo;
        } else {
            if (generalOptions.new_api) {
                location.href = generalOptions.siteMyUrl + `/${type}`;
            } else {
                location.href = generalOptions.siteMyUrl + `/${type}.html`;
            }
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
        serviceName: state.allServices
    }
};

const mapDispatchToProps = dispatch => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(Button);