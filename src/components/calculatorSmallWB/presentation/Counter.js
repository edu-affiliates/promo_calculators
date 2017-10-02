'use strict';

import React from 'react';
import {connect} from 'react-redux'
import {plusPage, minusPage, handleInputPageNumber} from '../../../store/actions'

class Counter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            emptyInput: false
        };
    }

    handleBlur() {
        this.setState({emptyInput: false});
    }


    handleChange(e) {
        const value = e.target.value;
        this.handleEmptyInput(value);
        const number = parseInt(e.target.value);
        if (number > this.props.maxPageNumber) {
            // this.handleAlert(number);
        } else {
            this.props.handleInputPageNumber(number);
        }
    }

    handleEmptyInput(value) {
        if (value === '') {
            this.setState({emptyInput: true})
        } else {
            if (this.state.emptyInput)
                this.setState({emptyInput: false})
        }
    }

    render() {
        const {onClickPlus, onClickMinus, pageNumber, maxPageNumber} = this.props;

        return (
                <div className="cswb__page-count">
                    <div className="cswb__minus-btn" onClick={onClickMinus}>-</div>
                    <div>
                        <input className="cswb__page-input"
                               type="text"
                               onBlur={() => this.handleBlur()}
                               value={(this.state.emptyInput) ? '' : pageNumber}
                               onChange={(e) => this.handleChange(e)}
                        />
                        <span className="cswb__page--subtitle">{(pageNumber === 1) ? 'page' : 'pages'}</span>
                    </div>
                    <div className="cswb__plus-btn" onClick={onClickPlus}>+</div>
                </div>
        )
    }
}


//container to match redux state to component props and dispatch redux actions to callback props

const mapStateToProps = (reduxState, ownProps) => {
    const state = reduxState.calculatorSmall[ownProps.calcId];
    return {
        maxPageNumber: state.deadline.max_pages,
        pageNumber: state.pageNumber
    }
};


const mapDispatchToProps = (dispatch, ownProps) => {
    return {

        onClickMinus: () => {
            dispatch(minusPage(ownProps.calcId))
        },
        onClickPlus: () => {
            dispatch(plusPage(ownProps.calcId))
        },
        handleInputPageNumber: (number) => {
            dispatch(handleInputPageNumber(number, ownProps.calcId));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);