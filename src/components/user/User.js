'use strict';

import React from 'react';
import {connect} from 'react-redux'
import {initCalc} from '../../store/actions'

class TablePrices extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <span>{this.props.userName}</span>
        )
    }
}


//container to match redux state to component props and dispatch redux actions to callback props
const mapStateToProps = state => {
    return {
        userName: state.userName
    }
};

const mapDispatchToProps = dispatch => {
    return {}
};


export default connect(mapStateToProps, mapDispatchToProps)(TablePrices);
