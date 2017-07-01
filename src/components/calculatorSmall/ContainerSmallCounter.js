'use strict';

import {connect} from 'react-redux'
import CalculatorSmallCounter from './CalculatorSmallCounter'
import {plusPage, minusPage} from './actions'


//match redux state to component props
const mapStateToProps = state => {
    return {
        pageNumber: state.pageNumber
    }
};

//match dispatch redux actions to callback props

const mapDispatchToProps = dispatch => {
    return {
        onClickMinus: () => {
            dispatch(minusPage())
        },
        onClickPlus: () => {
            dispatch(plusPage())
        }
    }
};

const ContainerSmallCounter = connect(
    mapStateToProps,
    mapDispatchToProps
)(CalculatorSmallCounter);

export default ContainerSmallCounter;