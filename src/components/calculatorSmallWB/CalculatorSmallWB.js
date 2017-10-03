'use strict';

import React from 'react';
import Title from './presentation/Title';
import Counter from './presentation/Counter';
import Price from './presentation/Price';
import Button from './presentation/Button';
import {connect} from 'react-redux'
import {initCalc, fetchService, plusPage, minusPage, handleInputPageNumber} from '../../store/actions'

import generalOptions from '../../config/generalOptions'

class CalculatorSmallWB extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.init(this.props.calcId);
        this.props.changeService(this.props.serviceId);
    }

    render() {
        const {inited} = this.props;

        if (inited) {
            return (
                <div className="cswb">
                    <Title calcId={this.props.calcId}/>
                    <Counter calcId={this.props.calcId}/>
                    <Price calcId={this.props.calcId}/>
                    <Button calcId={this.props.calcId}/>
                </div>
            )
        } else return (<div/>)
    }
}


//container to match redux state to component props and dispatch redux actions to callback props

const mapStateToProps = (reduxState, ownProps) => {
    const state = reduxState.calculatorSmall[ownProps.calcId];
    return {
        inited: reduxState.inited

    }
};


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        init: (calcId) => {
            dispatch(initCalc(calcId))
        },
        changeService: (id) => {
            dispatch(fetchService(id, ownProps.calcId))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CalculatorSmallWB);