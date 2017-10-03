'use strict';

import React from 'react';
import {connect} from 'react-redux'
import {initCalc} from '../../store/actions'
import Select from './presentation/CFSelect'
import Button from './presentation/CFButton'


class CalculatorFast extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.initCalc(this.props.calcId);
    }

    render() {
        if (this.props.inited) {
            return (
                <div className="calc-fast-container">
                    <Select calcId={this.props.calcId}/>
                    <Button calcId={this.props.calcId}/>
                </div>
            )
        } else return (<div/>)
    }
}

//container to match redux state to component props and dispatch redux actions to callback props
const mapStateToProps = state => {
    return {
        inited: state.inited

    }
};

const mapDispatchToProps = dispatch => {
    return {
        initCalc: (calcId) => {
            dispatch(initCalc(calcId))
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CalculatorFast);
