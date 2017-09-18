'use strict';

import React from 'react';
import {connect} from 'react-redux'

class Title extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        const {service} = this.props;
        return (
            <div className="ecs__title">
                <img src="wp-content/uploads/calculaters/essay-icon.svg"/>
                <span className="writing_type">{service}</span>
            </div>
        )

    }
}


//container to match redux state to component props and dispatch redux actions to callback props

const mapStateToProps = (reduxState, ownProps) => {
    const state = reduxState.calculatorSmall[ownProps.calcId];
    return {
        service: state.service.name,

    }
};


const mapDispatchToProps = (dispatch, ownProps) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(Title);