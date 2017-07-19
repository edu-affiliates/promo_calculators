'use strict';

import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class CLPrices extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {fullPrice, discount, pageNumber} = this.props;
        return (
            <div className="calc-lg-prices-group">
                <div className="calc-lg-price-payment"></div>
                <div className="calc-lg-prices-wrap">
                    <div className="calc-lg-price calc-lg-price--full">
                        <span className="calc-lg-price--currency">$</span>{(fullPrice * pageNumber).toFixed(2)}</div>
                    <div className="calc-lg-price calc-lg-price--dsc">
                        <span className="calc-lg-price--currency">$</span>{(fullPrice * (1 - discount) * pageNumber).toFixed(2)}</div>
                </div>
            </div>
        )
    }
}

CLPrices.propTypes = {
    fullPrice: PropTypes.number.isRequired,
    discount: PropTypes.number.isRequired,
    pageNumber: PropTypes.number.isRequired
};
//container to match redux state to component props and dispatch redux actions to callback props

const mapStateToProps = (reduxState, ownProps) => {
    const state = reduxState.calculatorSmall[ownProps.calcId];
    return {
        fullPrice: state.deadline.price,
        discount: reduxState.discount,
        pageNumber: state.pageNumber
    }
};

const mapDispatchToProps = dispatch => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(CLPrices);