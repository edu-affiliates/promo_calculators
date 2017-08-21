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
        //show if discount more than zero
        const fullPriceElement = (discount === 0) ? <div/> : <div className="cl-price cl-price--full">
            <span className="cl-price--line-throw"/>
            <span className="cl-price--currency">$</span>{(fullPrice * pageNumber).toFixed(2)}
        </div>;
        const dscPriceElement = <div className="cl-price cl-price--dsc">
                        <span
                            className="cl-price--currency">$</span>{(fullPrice * (1 - discount) * pageNumber).toFixed(2)}
        </div>;
        return (
            <div className="cl-prices-group">
                <div className="cl-price-title">ESTIMATED PRICE:</div>
                <div className="cl-prices-wrap">
                    {fullPriceElement}
                    {dscPriceElement}
                </div>
            </div>
        )
    }
}

CLPrices.PropTypes = {
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