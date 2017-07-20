'use strict';

import React from 'react';
import {connect} from 'react-redux'
import {changeLevel, changeDeadline, fetchService} from  '../../../store/actions'
import Select from './CSSelect';


class CalculatorSmallSelectGroup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            openDropdown: {
                service: false,
                level: false,
                deadline: false
            }
        };
        this.toggleDropdown = this.toggleDropdown.bind(this);
    }

    toggleDropdown(type) {
        const openDropdown = Object.assign({}, this.state.openDropdown);
        for (let toggleType in openDropdown) {
            if (toggleType === type) {
                openDropdown[toggleType] = !openDropdown[toggleType];
            } else {
                openDropdown[toggleType] = false;
            }
        }
        this.setState({openDropdown: openDropdown});
    }

    render() {

        return (
            <div className="calc-sm-select-group">
                <Select type={'service'}
                        current={this.props.service}
                        currentList={this.props.serviceList}
                        onChange={this.props.changeService}
                        toggleDropdown={this.toggleDropdown}
                        openDropdown={this.state.openDropdown}
                        calcId={this.props.calcId}
                />
                <Select type={'level'}
                        current={this.props.level}
                        currentList={this.props.levelList}
                        onChange={this.props.changeLevel}
                        toggleDropdown={this.toggleDropdown}
                        openDropdown={this.state.openDropdown}
                        calcId={this.props.calcId}

                />
                <Select type={'deadline'}
                        current={this.props.deadline}
                        currentList={this.props.deadlineList}
                        onChange={this.props.changeDeadline}
                        toggleDropdown={this.toggleDropdown}
                        openDropdown={this.state.openDropdown}
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
        deadline: state.deadline.name,
        serviceList: state.currentServices,
        levelList: state.currentLevels,
        deadlineList: state.currentDeadlines

    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeService: (id) => {
            dispatch(fetchService(id,ownProps.calcId))
        },
        changeLevel: (id) => {
            dispatch(changeLevel(id, ownProps.calcId))
        },
        changeDeadline: (id) => {
            dispatch(changeDeadline(id, ownProps.calcId))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CalculatorSmallSelectGroup);
