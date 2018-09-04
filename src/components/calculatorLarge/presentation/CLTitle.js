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
        //have to chance this variables depends on conditions
        let calcTitle;
        //case when discount exist
        if (discount !== 0) {
            if (!!ctd) {
                let title, subtitle;
                // if there is %-sign in title discount
                if (ctd.indexOf('%') !== -1) {
                  //put before % discount-value
                  title = (ctd.substr(0, ctd.indexOf('%')) + discount * 100 + ctd.substr(ctd.indexOf('%')));
                } else {
                  title = ctd;
                }
                //check if subtitle exist
                if (title.indexOf('.') !== -1) {
                    title = title.substr(0, title.indexOf('.') + 1);
                    subtitle = ctd.substr(ctd.indexOf('.') + 1);
                }
                calcTitle =
                    <div className="cl-title">
                        <div>{title}</div>
                        <span className="cl-title--sm">{subtitle}</span>
                    </div>
            } else {
                //set default title with discount
                calcTitle =
                    <div className="cl-title">
                        <div className="cl-title__first-line">Your first order</div>
                        <div className="cl-title__second-line">
                            <span className="cl-title--dsc">{discount * 100}% off</span>
                            <span className="cl-title--sm">Limited <br/>time!</span>
                        </div>
                    </div>
            }
        }
        //case when there is no any discount
        else {
            if (!!ct) {
                //set custom title without discount
                calcTitle =
                    <div className="cl-title">
                        {ct}
                    </div>
            } else {
                //set default title without discount
                calcTitle =
                    <div className="cl-title">Get a quick estimate</div>
            }
        }
        return (
            <div>{calcTitle}</div>
        )
    }
}


CLTitle.PropTypes = {
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

connect(mapStateToProps, mapDispatchToProps)(CLTitle);
