'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {changeLevel} from  '../../../store/actions';
import PropTypes from 'prop-types';


class CLSelectLevel extends React.Component {

    constructor(props) {
        super(props);
    }

    cutLevelName(levelName) {
        if (levelName === 'Undergraduate (1st and 2nd year)') {
            return 'Undergrad. (yrs 1-2)'
        } else if (levelName === 'Undergraduate (3rd and 4th year)') {
            return 'Undergrad. (yrs 3-4)'
        }
        else {
            return levelName
        }
    }

    render() {
        let levels;
        const {level, levelList, changeLevel} = this.props;

        levels = levelList.map(
            (item) => {
                return <li key={item.id}
                           className={`${(level === item.name ? 'active' : '')} cl-select-item`}
                           onClick={() => {
                               changeLevel(item.id)
                           }}>{this.cutLevelName(item.name)}</li>
            });

        return (
            <div className="cl-select-group">
                <div className="cl-select-wrap">
                    <div className="cl-select-title">Academic level:</div>
                    <ul className="cl-select-list">
                        {levels}
                    </ul>
                </div>
            </div>
        )
    }
}
CLSelectLevel.PropTypes = {
    level: PropTypes.string.isRequired,
    levelList: PropTypes.array.isRequired
};

//container to match redux state to component props and dispatch redux actions to callback props
const mapStateToProps = (reduxState, ownProps) => {
    const state = reduxState.calculatorSmall[ownProps.calcId];
    return {
        level: state.level.name,
        levelList: state.currentLevels,
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeLevel: (id) => {
            dispatch(changeLevel(id, ownProps.calcId))
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CLSelectLevel);
