'use strict';

import React from 'react';
import {connect} from 'react-redux'
import {changeDeadline} from '../../../store/actions'
class TPService extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {deadlineList, deadline} = this.props;
        let list = deadlineList.map((d) => {
            return <li className={`${(deadline === d.name) ? 'active' : ''} tp-deadline__item`}>{d.name}</li>
        });
        return (
            <ul className="tp-deadline">
                {list}
            </ul>
        )
    }
}

//container to match redux state to component props and dispatch redux actions to callback props
const mapStateToProps = (reduxState, ownProps) => {
    const state = reduxState.calculatorSmall[ownProps.calcId];
    return {
        deadlineList: state.currentDeadlines,
        deadline: state.deadline.name,
    }
};

const mapDispatchToProps = (reduxState, ownProps) => {
    return {
        changeDeadline: (id) => {
            dispatch(changeDeadline(id, ownProps.calcId))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TPService);
