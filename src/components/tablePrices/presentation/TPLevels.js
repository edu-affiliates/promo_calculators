'use strict';

import React from 'react';
import {connect} from 'react-redux'
import {changeLevel, changeDeadline, fetchService} from '../../../store/actions'

class TPLevels extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {level, levelList} = this.props;
        let list = levelList.map((l) => {
            return <div key={l.id} className={`${(level === l.name)? 'active': ''} tp-level__title`}>{l.name}</div>
        });
        return (
            <div className="tp-level">
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

export default connect(mapStateToProps, mapDispatchToProps)(TPLevels);

