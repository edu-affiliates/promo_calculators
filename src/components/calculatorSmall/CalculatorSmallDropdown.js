'use strict';

import React from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {changeService} from './actions'


class CalculatorSmallDropdown extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.serviceComponent) {
            let servicesList = this.props.currentServices.map(
                (serviceItem) => {
                    return <li key={serviceItem.id} onClick={this.props.changeService}
                               className="calc-sm-dropdown__item">{serviceItem.name}</li>
                }
            );
            return (
                <div className={(this.props.open) ? 'open' : ''}>
                    <div className="calc-sm-dropdown-wrap calc-sm-dropdown-wrap--service">
                        <ul className="calc-sm-dropdown">
                            {servicesList}
                        </ul>
                    </div>
                </div>
            )
        }
        if (this.props.levelComponent) {
            let levelsList = this.props.currentLevels.map(
                (levelItem) => {
                    return <li key={levelItem.id} onClick={this.props.changeService}
                               className="calc-sm-dropdown__item">{levelItem.name}</li>
                }
            );
            return (
                <div className={(this.props.open) ? 'open' : ''}>
                    <div className="calc-sm-dropdown-wrap calc-sm-dropdown-wrap--level">
                        <ul className="calc-sm-dropdown">
                            {levelsList}
                        </ul>
                    </div>
                </div>
            )
        }
        if (this.props.deadlineComponent) {
            let deadlinesList = this.props.currentDeadlines.map(
                (deadlineItem) => {
                    return <li key={deadlineItem.id} onClick={this.props.changeService}
                               className="calc-sm-dropdown__item">{deadlineItem.name}</li>
                }
            );
            return (
                <div className={(this.props.open) ? 'open' : ''}>
                    <div className="calc-sm-dropdown-wrap calc-sm-dropdown-wrap--deadline">
                        <ul className="calc-sm-dropdown">
                            {deadlinesList}
                        </ul>
                    </div>
                </div>
            )
        }
    }
}

CalculatorSmallDropdown.propTypes = {
    changeService: PropTypes.func.isRequired
};

//container to match redux state to component props and dispatch redux actions to callback props
const mapStateToProps = state => {
    return {
        currentServices: state.currentServices,
        currentLevels: state.currentLevels,
        currentDeadlines: state.currentDeadlines,

    }
};

const mapDispatchToProps = dispatch => {
    return {
        changeService: () => {
            dispatch(changeService('2183'))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CalculatorSmallDropdown);