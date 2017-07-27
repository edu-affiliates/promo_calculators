'use strict';

import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class CLTitle extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {discount, calcTitleDiscount: ctd, calcTitle: ct} = this.props;
        let title;
        if (discount !== 0) {
            if (!!ctd) {
                //set custom title with discount
                title =
                    <div className="calc-lg-title">
                        {ctd.substr(0, ctd.indexOf('%')) + discount * 100 + ctd.substr(ctd.indexOf('%'))}
                    </div>
            } else {
                //set default title with discount
                title =
                    <div className="calc-lg-title">
                        Your first order
                        <span className="calc-lg-title--dsc">{discount * 100}% off</span>
                        <span className="calc-lg-title--sm">Limited time!</span>
                    </div>
            }
        } else {
            if (!!ct) {
                //set custom title without discount
                title =
                    <div className="calc-lg-title">
                        {ct}
                    </div>
            } else {
                //set default title without discount
                title =
                    <div className="calc-lg-title">Get a quick estimate</div>
            }
        }
        return (
            <div>{title}</div>
        )
    }
}


CLTitle
    .PropTypes = {
    discount: PropTypes.number.isRequired,
};

//container to match redux state to component props and dispatch redux actions to callback props
const
    mapStateToProps = (reduxState, ownProps) => {
        return {
            discount: reduxState.discount,
        }
    };

const
    mapDispatchToProps = (dispatch, ownProps) => {
        return {}
    };

export
default

connect(mapStateToProps, mapDispatchToProps)

(
    CLTitle
)
;