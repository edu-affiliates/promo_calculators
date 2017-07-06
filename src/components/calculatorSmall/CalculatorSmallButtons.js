'use strict';

import React from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {changeService} from './actions'

class CalculatorSmallButtons extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="calc-sm-btn-group">
                <div className="calc-sm-btn calc-sm-btn--qoute">free quote</div>
                <div className="calc-sm-btn calc-sm-btn--order">order now</div>
            </div>
        )
    }
}

CalculatorSmallButtons.propTypes = {};

//container to match redux state to component props and dispatch redux actions to callback props
const mapStateToProps = state => {
    return {}
};

const mapDispatchToProps = dispatch => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(CalculatorSmallButtons);