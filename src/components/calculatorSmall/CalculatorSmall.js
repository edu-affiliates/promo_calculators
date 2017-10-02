'use strict';

import React from 'react';
import {connect} from 'react-redux'
import {initCalc} from '../../store/actions'
import Title from './presentation/CSTitle';
import SelectGroup from './presentation/CSSelectGroup';
import Prices from "./presentation/CSPrices";
import Buttons from "./presentation/CSButtons";

class CalculatorSmall extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.initCalc(this.props.calcId);
    }

    render() {
        const {inited, calcId, calcType, calcTitle, calcTitleDiscount} = this.props;
        if (inited) {
            return (
                <div className={(calcType) ? calcType : ''}>
                    <div className="cs-wrap">
                        <Title calcTitle={calcTitle} calcTitleDiscount={calcTitleDiscount}/>
                        <SelectGroup calcId={calcId}/>
                        <Prices calcId={calcId}/>
                        <Buttons calcId={calcId}/>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(CalculatorSmall);
