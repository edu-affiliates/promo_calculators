'use strict';

import React from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

class CalculatorSmallTitle extends React.Component {

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
                //set custom title with discount
                title = (ctd.substr(0, ctd.indexOf('%')) + discount * 100 + ctd.substr(ctd.indexOf('%')));
                //check if subtitle exist
                if (title.indexOf('.') !== -1) {
                    title = title.substr(0, title.indexOf('.') + 1);
                    subtitle = ctd.substr(ctd.indexOf('.') + 1);
                }
                calcTitle =
                    <div className="cs-title">
                        <div>{title}</div>
                        <div className="cs-title--sm">{subtitle}</div>
                    </div>
            } else {
                //set default title with discount
                calcTitle =
                    <div className="cs-title">
                        <div className="cs-title__first-line">Your first order</div>
                        <div className="cs-title__second-line">
                            <span className="cs-title--dsc">{discount * 100}% off</span>
                            <span className="cs-title--sm">Limited time!</span>
                        </div>
                    </div>
            }
        }
        //case when there is no any discount
        else {
            if (!!ct) {
                //set custom title without discount
                calcTitle =
                    <div className="cs-title">
                        {ct}
                    </div>
            } else {
                //set default title without discount
                calcTitle =
                    <div className="cs-title">Get a quick <br/>estimate</div>
            }
        }
        return (
            <div>{calcTitle}</div>
        )
    }
}

CalculatorSmallTitle.propTypes = {
    discount: PropTypes.number.isRequired,
};

//container to match redux state to component props and dispatch redux actions to callback props
const mapStateToProps = reduxState => {
    return {
        discount: reduxState.discount,
    }
};

const mapDispatchToProps = dispatch => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(CalculatorSmallTitle);
