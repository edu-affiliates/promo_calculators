'use strict';

import React from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {changeService, fetchInitTree} from './actions'
import CalculatorSmallDropdown from './CalculatorSmallDropdown'

class CalculatorSmallSelect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {openDropdown: false};
        this.openDropdown = this.openDropdown.bind(this);
    }
    componentWillMount(){
        this.props.init();
    }

    openDropdown() {
        const openDropdown = !this.state.openDropdown;
        console.log(openDropdown);
        this.setState({openDropdown: openDropdown});
    }

    render() {
        if(this.props.inited) {
            if (this.props.serviceComponent) {
                return (
                    <div className="calc-sm-select-wrap ">
                        <div onClick={this.openDropdown} className="calc-sm-select calc-sm-select--service">
                            {this.props.service}
                        </div>
                        <CalculatorSmallDropdown serviceComponent={this.props.serviceComponent}
                                                 open={this.state.openDropdown}/>
                    </div>
                )
            }
            if (this.props.levelComponent) {
                return (
                    <div className="calc-sm-select-wrap">
                        <div onClick={this.openDropdown}
                             className="calc-sm-select calc-sm-select--level">{this.props.level}</div>
                        <CalculatorSmallDropdown levelComponent={this.props.levelComponent}
                                                 open={this.state.openDropdown}/>
                    </div>

                )
            }
            if (this.props.deadlineComponent) {
                return (
                    <div className="calc-sm-select-wrap">
                        <div onClick={this.openDropdown}
                             className="calc-sm-select calc-sm-select--deadline">{this.props.deadline}</div>
                        <CalculatorSmallDropdown deadlineComponent={this.props.deadlineComponent}
                                                 open={this.state.openDropdown}/>
                    </div>
                )
            }
        } else return (<div></div>)
    }
}

CalculatorSmallSelect.propTypes = {
    changeService: PropTypes.func.isRequired
};

//container to match redux state to component props and dispatch redux actions to callback props
const mapStateToProps = state => {
    return {
        inited: state.inited,
        service: state.current.service.name,
        level: state.current.level.name,
        deadline: state.current.deadline.name
    }
};

const mapDispatchToProps = dispatch => {
    return {
        init: () => {
            dispatch(fetchInitTree())
        },
        changeService: () => {
            dispatch(changeService('2183'))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CalculatorSmallSelect);