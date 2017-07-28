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
        //heve to chance this variables depends on conditions
        let calcTitle;
        //case when discount exist
        if (discount !== 0) {
            if (!!ctd) {
                let title, subtitle;
                //set custom title with discount
                title = (ctd.substr(0, ctd.indexOf('%')) + discount * 100 + ctd.substr(ctd.indexOf('%')));
                //check if subtitle exist
                if (title.indexOf('.') !== -1) {
                    title = title.substr(0, title.indexOf('.') + 1);
                    subtitle = ctd.substr(ctd.indexOf('.') + 1);
                }
                calcTitle =
                    <div className="calc-lg-title">
                        {title}<br/>
                        <span className="calc-lg-title--sm">{subtitle}</span>
                    </div>
            } else {
                //set default title with discount
                calcTitle =
                    <div className="calc-lg-title">
                        Your first order
                        <span className="calc-lg-title--dsc">{discount * 100}% off</span>
                        <span className="calc-lg-title--sm">Limited time!</span>
                    </div>
            }
        }
        //case when there is no any discount
        else {
            if (!!ct) {
                //set custom title without discount
                calcTitle =
                    <div className="calc-lg-title">
                        {ct}
                    </div>
            } else {
                //set default title without discount
                calcTitle =
                    <div className="calc-lg-title">Get a quick estimate</div>
            }
        }
        return (
            <div>{calcTitle}</div>
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