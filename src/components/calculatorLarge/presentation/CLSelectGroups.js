'use strict';

import React from 'react';
import {connect} from 'react-redux'
import {changeLevel, fetchService} from  '../../../store/actions'
import Select from './CLSelect';

class CLSelectGroups extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="calc-lg-select-group">
                <Select type={'service'}
                        current={this.props.service}
                        currentList={this.props.serviceList}
                        onChange={this.props.changeService}
                        calcId={this.props.calcId}
                />
                <Select type={'level'}
                        current={this.props.level}
                        currentList={this.props.levelList}
                        onChange={this.props.changeLevel}
                        calcId={this.props.calcId}

                />
            </div>
        )
    }
}

//container to match redux state to component props and dispatch redux actions to callback props
const mapStateToProps = (reduxState, ownProps) => {
    const state = reduxState.calculatorSmall[ownProps.calcId];
    return {
        service: state.service.name,
        level: state.level.name,
        serviceList: state.currentServices,
        levelList: state.currentLevels,
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeService: (id) => {
            dispatch(fetchService(id, ownProps.calcId))
        },
        changeLevel: (id) => {
            dispatch(changeLevel(id, ownProps.calcId))
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CLSelectGroups);
