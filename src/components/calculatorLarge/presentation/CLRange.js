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
        const {currentDeadline, deadlineList} = this.props;
        let deadList = deadlineList.map((d) => {
            return <li
                className={`${(currentDeadline.name === d.name) ? 'active' : '' } ${(currentDeadline.id < d.id) ? 'checked' : '' } calc-lg-range-item`}
                onClick={() => {
                    this.props.changeDeadline(d.id)
                }}>
                <div className="calc-lg-range-item__circle">
                    <div className="calc-lg-range-popup">
                        <span className="calc-lg-range-popup__text">{d.name}</span>
                    </div>
                </div>
            </li>
        });
        return (
            <div>
                <div className="calc-lg-select-title">Deadline:</div>
                <div className="calc-lg-range-wrap">
                    <ul className="calc-lg-range">
                        {deadList}
                    </ul>
                </div>
            </div>
        )
    }
}

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