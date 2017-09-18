'use strict';

import React from 'react';
import {connect} from 'react-redux'

class Price extends React.Component {

    constructor(props) {
        super(props);
    }
    

    render() {
        const {discount, fullPrice, service, pageNumber} = this.props;
            return (
                <div>
                    <div className="ecs__price">
                        <span className="ecs__price__title">Estimated price:</span>
                        <div className="ecs__prices">
                            <span className="ecs__price__old"> {(fullPrice * pageNumber).toFixed(2)}</span>
                            <span className="ecs__price__value"> {(fullPrice * (1 - discount) * pageNumber).toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="ecs__btns">
                        <div className="ecs__btn ecs__btn--order">Order {service}</div>
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

        service: state.service.name
    }
};


const mapDispatchToProps = (dispatch, ownProps) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(Price);