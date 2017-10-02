'use strict';

import React from 'react';
import {connect} from 'react-redux'

class Price extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {discount, fullPrice, pageNumber} = this.props;
        return (
            <div className="cswb__price">
                <span className="cswb__price__title">Estimated price:</span>
                <div className="cswb__prices">
                    <span className="cswb__price__old"> {(fullPrice * pageNumber).toFixed(2)}</span>
                    <span className="cswb__price__value"> {(fullPrice * (1 - discount) * pageNumber).toFixed(2)}</span>
                </div>
            </div>
        )
    }
}


//container to match redux state to component props and dispatch redux actions to callback props

const mapStateToProps = (reduxState, ownProps) => {
    const state = reduxState.calculatorSmall[ownProps.calcId];
    return {
        discount: reduxState.discount,
        fullPrice: state.deadline.price,
        pageNumber: state.pageNumber,

    }
};


const mapDispatchToProps = (dispatch, ownProps) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(Price);