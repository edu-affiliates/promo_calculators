'use strict';

import React from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {changeService} from './actions'

class CalculatorSmallInput extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.serviceComponent) {
            return (
                <div onClick={this.props.changeService} className="calc-sm-select-wrap">
                    <div className="calc-sm-select">{this.props.service}</div>
                </div>
            )
        }
        if (this.props.levelComponent) {
            return (
                <div onClick={this.props.changeService} className="calc-sm-select-wrap">
                    <div>{this.props.level}</div>
                </div>
            )
        }
        if (this.props.deadlineComponent) {
            return (
                <div onClick={this.props.changeService} className="calc-sm-select-wrap">
                    <div>{this.props.deadline}</div>
                </div>
            )
        }
    }
}

CalculatorSmallInput.propTypes = {
    changeService: PropTypes.func.isRequired
};

//container to match redux state to component props and dispatch redux actions to callback props
const mapStateToProps = state => {
    return {
        service: state.current.service.name,
        level: state.current.level.name,
        deadline: state.current.deadline.name
    }
};

const mapDispatchToProps = dispatch => {
    return {
        changeService: () => {
            dispatch(changeService('2183'))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CalculatorSmallInput);