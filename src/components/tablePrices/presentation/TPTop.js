'use strict';

import React from 'react';
import {connect} from 'react-redux'
import {fetchService} from '../../../store/actions';

class TPTop extends React.Component {

    constructor(props) {
        super(props);
    }



    render() {
        const {discount, service, serviceList, changeService} = this.props;

        return (
            <div className="tp-top">
                <div className="tp-top__title">ACADEMIC LEVEL</div>
                <div className="tp-top__dsc">
                    <span className="tp-top__dsc--title">Your first order</span>
                    <span className="tp-top__dsc--value">{discount * 100}% OFF</span>
                    <span className="tp-top__dsc-text">Limited time!</span>
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

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeService: (id) => {
            dispatch(fetchService(id, ownProps.calcId))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TPTop);
