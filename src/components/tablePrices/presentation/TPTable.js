'use strict';

import React from 'react';
import {connect} from 'react-redux'
import Column from './TPTableColumn'
import Top from './TPTop'

import {changeLevel, changeDeadline, fetchService} from '../../../store/actions'

class TPTable extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {levelList} = this.props;
        let list = levelList.map((lev) => {
            return <Column key={lev.id} lev={lev} calcId={this.props.calcId}/>
        });
        return (
            <div className="tp-body">
                <Top calcId={this.props.calcId}/>
                <div className="tp-table">
                    {list}
                </div>
            </div>
        )
    }
}

//container to match redux state to component props and dispatch redux actions to callback props
const mapStateToProps = (reduxState, ownProps) => {
    const state = reduxState.calculatorSmall[ownProps.calcId];
    return {
        levelList: state.currentLevels,
    }
};

const mapDispatchToProps = (reduxState, ownProps) => {
    return {
        changeLevel: (id) => {
            dispatch(changeLevel(id, ownProps.calcId))
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TPTable);
