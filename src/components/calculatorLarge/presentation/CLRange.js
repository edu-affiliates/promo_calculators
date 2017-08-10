'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {changeDeadline} from  '../../../store/actions'

import PropTypes from 'prop-types';


class CLCounter extends React.Component {

    constructor(props) {
        super(props);
    }

    handleChange() {

    }

    render() {
        const {currentDeadline: cd, deadlineList, changeDeadline} = this.props;
        let deadList = deadlineList.map((d) => {
            return <li
                className={`${(cd.name === d.name) ? 'active' : '' } ${(cd.id < d.id) ? 'checked' : '' } cl-range-item`}
                onClick={() => changeDeadline(d.id)}>
                <div className="cl-range-item__circle">
                    <div className="cl-range-popup">
                        <span className="cl-range-popup__text">{d.name}</span>
                    </div>
                </div>
            </li>
        });
        return (
            <div>
                <div className="cl-select-title">Deadline:</div>
                <div className="cl-range-wrap">
                    <ul className="cl-range">
                        {deadList}
                    </ul>
                </div>
            </div>
        )
    }
}

CLCounter.PropTypes = {
    currentDeadline: PropTypes.object.isRequired,
    deadlineList: PropTypes.object.isRequired,
};
//container to match redux state to component props and dispatch redux actions to callback props
const mapStateToProps = (reduxState, ownProps) => {
    const state = reduxState.calculatorSmall[ownProps.calcId];
    return {
        currentDeadline: state.deadline,
        deadlineList: state.currentDeadlines

    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeDeadline: (id) => {
            dispatch(changeDeadline(id, ownProps.calcId))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CLCounter);