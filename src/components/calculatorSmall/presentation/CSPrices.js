'use strict';

import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import generalOptions from '../../../config/generalOptions';
import helper from '../../../api/helper';

//presentation of the price in calc small
class CSPrices extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {fullPrice, discount, pageNumber, currency} = this.props;
        let fullPriceDsc = helper.truncateDecimals(+(fullPrice * (1 - discount)).toFixed(10), 2);
        const cs = (discount === 0 ) ? <div/> :
            <div className="cs-price ">
                <div className="cs-price--full">
                    <span className="cs-price--line-throw"/>
                    {currency}{(fullPrice * pageNumber).toFixed(2)}
                </div>
            </div>;
        

        return (
            <div className="cs-prices-group">
                <div className="cs-price-title">Estimated price:</div>
                <div className="cs-prices-wrap">
                    {cs}
                    <div className="cs-price ">
                        <div className="cs-price--dsc">
                            {currency}{(fullPriceDsc * pageNumber).toFixed(2)}
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}


CSPrices.propTypes = {
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
        pageNumber: state.pageNumber,
        currency: reduxState.currency
    }
};

const mapDispatchToProps = dispatch => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(CSPrices);
