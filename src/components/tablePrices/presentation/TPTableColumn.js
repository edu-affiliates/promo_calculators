'use strict';

import React from 'react';
import {connect} from 'react-redux'
import {changeLevel, changeDeadline, fetchService} from '../../../store/actions'
import {currentDeadlineList} from '../../../store/reducerLogic'

class TPTableColumn extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {tree, discount, currentDeadline, currentLevel, lev, changeDeadline, changeLevel} = this.props;
        let prices = currentDeadlineList(tree, lev.id).map((deadline) => {
            return <div key={deadline.id}
                        onClick={() => {
                            if(currentLevel.id !== lev.id) {
                                changeLevel(lev.id);
                            }
                            if(currentDeadline.id !== deadline.id) {
                                changeDeadline(deadline.id);
                            }
                        }
                        } className={`${(currentDeadline.id === deadline.id) ? 'active': ''} tp-table__price`}>
                <span className="tp-table__price--full">${deadline.price}</span>
                <span className="tp-table__price--dsc">${(deadline.price * (1 - discount)).toFixed(2)}</span>
            </div>
        });
        return (
            <div className="tp-table__column">
                {prices}
            </div>
        )
    }
}

//container to match redux state to component props and dispatch redux actions to callback props
const mapStateToProps = (reduxState, ownProps) => {
    const state = reduxState.calculatorSmall[ownProps.calcId];
    return {
        tree: reduxState.tree,
        discount: reduxState.discount,
        currentDeadline : state.deadline,
        currentLevel : state.level
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeLevel: (id) => {
            dispatch(changeLevel(id, ownProps.calcId))
        },
        changeDeadline: (id) => {
            dispatch(changeDeadline(id, ownProps.calcId))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TPTableColumn);
