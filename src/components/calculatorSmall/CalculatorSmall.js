'use strict';

import React from 'react';
import {connect} from 'react-redux'
import {changeService, fetchInitTree} from './actions'

import Title from './CalculatorSmallTitle';
import Select from './CalculatorSmallSelect';
import Counter from "./CalculatorSmallCounter";
import Prices from "./CalculatorSmallPrices";
import Buttons from "./CalculatorSmallButtons";

class CalculatorSmall extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="calc-sm-wrap">
                <Title/>
                <Select type={'service'} current={this.props.service} currentList={this.props.serviceList}/>
                <Select type={'level'} current={this.props.level} currentList={this.props.serviceList}/>
                <Select type={'deadline'} current={this.props.deadline} currentList={this.props.serviceList}/>
                <Counter/>
                <Prices/>
                <Buttons/>
            </div>
        )
    }
}

//container to match redux state to component props and dispatch redux actions to callback props
const mapStateToProps = state => {
    return {
        inited: state.inited,
        service: state.current.service.name,
        level: state.current.level.name,
        deadline: state.current.deadline.name,
        serviceList: state.currentServices,
        levelList: state.currentLevels,
        deadlineList: state.currentDeadlines

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

export default connect(mapStateToProps, mapDispatchToProps)(CalculatorSmall);