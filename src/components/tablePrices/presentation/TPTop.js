'use strict';

import React from 'react';
import {connect} from 'react-redux'
import {changeLevel, fetchService} from '../../../store/actions'


class TPTop extends React.Component {

    constructor(props) {
        super(props);
    }

    cutLevelName(levelName) {
        // if (levelName === 'Undergraduate (1st and 2nd year)') {
        //     return 'Undergrad. (yrs 1-2)'
        // } else if (levelName === 'Undergraduate (3rd and 4th year)') {
        //     return 'Undergrad. (yrs 3-4)'
        // }
        // else {
            return levelName
        // }
    }

    render() {
        const {discount, level, levelList} = this.props;
        let levels = levelList.map((l) => {
            return <div key={l.id} className={`${(level === l.name) ? 'active' : ''} tp-header__level-item`}>
                {this.cutLevelName(l.name)}</div>
        });
        const dsc = (discount === 0) ? <div className="tp-header__dsc">GET A QUICK ESTIMATE</div> : <div className="tp-header__dsc">
            <span className="tp-header__dsc--title">Your first order</span>
            <span className="tp-header__dsc--value">{discount * 100}% OFF</span>
            <span className="tp-header__dsc--text">Limited time!</span>
        </div>;

        return (
            <div className="tp-header">

                <div className="tp-header__top">
                    <div className="tp-header__title"> ACADEMIC LEVEL</div>
                    {dsc}
                </div>
                <div className="tp-header__level">
                    {levels}
                </div>
            </div>

        )
    }
}

//container to match redux state to component props and dispatch redux actions to callback props
const mapStateToProps = (reduxState, ownProps) => {
    const state = reduxState.calculatorSmall[ownProps.calcId];
    return {
        discount: reduxState.discount,
        service: state.service.name,
        serviceList: state.currentServices,
        level: state.level.name,
        levelList: state.currentLevels,
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeService: (id) => {
            dispatch(fetchService(id, ownProps.calcId))
        },
        changeLevel: (id) => {
            dispatch(changeLevel(id, ownProps.calcId))
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TPTop);
