'use strict';

import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import generalOptions from '../../../config/generalOptions';

//presentation of the price in calc small
class CSPrices extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {fullPrice, discount, pageNumber} = this.props;
        const cs = (discount === 0 ) ? <div/> :
            <div className="cs-price ">
                <div className="cs-price--full">
                    <span className="cs-price--line-throw"/>
                    {generalOptions.currency}{(fullPrice * pageNumber).toFixed(2)}
                </div>
            </div>;

        return (
            <div className="cs-prices-group">
                <div className="cs-price-title">Estimated price:</div>
                <div className="cs-prices-wrap">
                    {cs}
                    <div className="cs-price ">
                        <div className="cs-price--dsc">
                            {generalOptions.currency}{(fullPrice * (1 - discount) * pageNumber).toFixed(2)}
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
        pageNumber: state.pageNumber
    }
};

const mapDispatchToProps = dispatch => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(CSPrices);
