'use strict';

import React from 'react';
import {connect} from 'react-redux'
import {changeLevel, changeDeadline, fetchService} from '../../../store/actions'

class TPService extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {discount, service, serviceList} = this.props;
        return (
            <div className="tp-service">
                <div>{service}</div>
                <div>
                    <span>Your first order</span>
                    <span>{discount}% OFF</span>
                    <span>Limited time!</span>
                </div>
            </div>
        )
    }
}

//container to match redux state to component props and dispatch redux actions to callback props
const mapStateToProps = (reduxState, ownProps) => {
    const state = reduxState.calculatorSmall[ownProps.calcId];
    return {
        discount: reduxState.discount,
        service: state.service.name,
        serviceList: state.currentServices,
    }
};

const mapDispatchToProps = (reduxState, ownProps) => {
    return {
        changeService: (id) => {
            dispatch(fetchService(id, ownProps.calcId))
        },
        changeLevel: (id) => {
            dispatch(changeLevel(id, ownProps.calcId))
        },
        changeDeadline: (id) => {
            dispatch(changeDeadline(id, ownProps.calcId))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TPService);
