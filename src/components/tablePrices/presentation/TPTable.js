'use strict';

import React from 'react';
import {connect} from 'react-redux'
import TableColumn from './TPTableColumn'
import {changeLevel, changeDeadline, fetchService} from '../../../store/actions'

class TPTable extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {level, levelList} = this.props;
        let list = levelList.map((lev) => {
            return <TableColumn key={lev.id} lev={lev} calcId={this.props.calcId}/>
        });
        return (
            <div className="tp-table">
                {list}
            </div>
        )
    }
}

//container to match redux state to component props and dispatch redux actions to callback props
const mapStateToProps = (reduxState, ownProps) => {
    const state = reduxState.calculatorSmall[ownProps.calcId];
    return {
        level: state.level.name,
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
