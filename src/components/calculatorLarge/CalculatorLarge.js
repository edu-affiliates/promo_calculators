'use strict';

import React from 'react';
import {connect} from 'react-redux'
import {initCalc} from '../../store/actions'
import CLTitle from './presentation/CLTitle';
import CLSelectService from './presentation/CLSelectService';
import CLSelectLevel from './presentation/CLSelectLevel';
import CLRange from './presentation/CLRange';
import CLCounter from './presentation/CLCounter';
import CLPrices from './presentation/CLPrices';
import CLButtons from './presentation/CLButtons';


class CalculatorLarge extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.initCalc(this.props.calcId);
    }

    render() {
        const {calcId, calcTitle, containerClass, calcTitleDiscount} = this.props;
        return (
            <div className={containerClass}>
                <div className="calc-lg-container">
                    <CLTitle calcTitle={calcTitle} calcTitleDiscount={calcTitleDiscount}/>
                    <CLSelectService calcId={calcId}/>
                    <CLSelectLevel calcId={calcId}/>
                    <CLRange calcId={calcId}/>
                    <CLCounter calcId={calcId}/>
                    <CLPrices calcId={calcId}/>
                    <CLButtons calcId={calcId}/>
                </div>
            </div>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(CalculatorLarge);
