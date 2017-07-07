'use strict';

import React from 'react';
import {connect} from 'react-redux'
import {changeService, changeLevel, changeDeadline, fetchInitTree} from './actions'

import Title from './CalculatorSmallTitle';
import Select from './CalculatorSmallSelect';
import Counter from "./CalculatorSmallCounter";
import Prices from "./CalculatorSmallPrices";
import Buttons from "./CalculatorSmallButtons";

class CalculatorSmall extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.init();
    }

    render() {
        if (this.props.inited) {
            return (
                <div className="calc-sm-wrap">
                    <Title/>
                    <Select type={'service'} current={this.props.service} currentList={this.props.serviceList}
                            onChange={this.props.changeService}/>
                    <Select type={'level'} current={this.props.level} currentList={this.props.levelList}
                            onChange={this.props.changeLevel}/>
                    <Select type={'deadline'} current={this.props.deadline} currentList={this.props.deadlineList}
                            onChange={this.props.changeDeadline}/>
                    <Counter/>
                    <Prices/>
                    <Buttons/>
                </div>
            )
        } else return (<div></div>)
    }
}

//container to match redux state to component props and dispatch redux actions to callback props
const mapStateToProps = state => {
    return {
        inited: state.inited,
        service: state.service.name,
        level: state.level.name,
        deadline: state.deadline.name,
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
        changeService: (id) => {
            dispatch(changeService(id))
        },
        changeLevel: (id) => {
            dispatch(changeLevel(id))
        },
        changeDeadline: (id) => {
            dispatch(changeDeadline(id))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CalculatorSmall);