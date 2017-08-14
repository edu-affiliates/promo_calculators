'use strict';

import React from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {plusPage, minusPage, handleInputPageNumber} from '../../../store/actions'


//presentation of the counter in calc small
class CSCounter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emptyInput: false,
            alert: false
        };
        this.handleChange = this.handleChange.bind(this);
    };

    handleBlur() {
        this.setState({emptyInput: false});
    }


    handleChange(e) {
        if (e.target.value === '') {
            this.setState({emptyInput: true})
        } else {
            if (this.state.emptyInput)
                this.setState({emptyInput: false})
        }
        const number = parseInt(e.target.value);

        if (number > this.props.maxPageNumber) {
            this.setState({alert: true})
        }
        this.props.handleInputPageNumber(number);
    }

    render() {
        const {onClickPlus, onClickMinus, pageNumber, maxPageNumber} = this.props;
        const alert = (this.state.alert) ? <div className="cs-page-value__alert">
            <span>Warning! Max number of the pages are {maxPageNumber}.</span>
            <span onClick={() => {
                this.setState({alert: false})
            }} className="cs-page-value__alert--cross">&times;</span>
        </div> : <div/>;
        return (
            <div className="cs-counter-group">
                <div className="cs-counter-wrap">
                    <div onClick={onClickMinus} className="cs-counter cs-counter--minus">
                        <span>&#65293;</span>
                    </div>
                    <div className="cs-page-value">
                        <input type="text"
                               onBlur={() => this.handleBlur()}
                               value={(this.state.emptyInput) ? '' : pageNumber}
                               onChange={(e) => this.handleChange(e)}
                               className="cs-page-value__input"/>
                        <span>{(pageNumber === 1) ? 'page' : 'pages'}</span>
                    </div>
                    <div onClick={(pageNumber < maxPageNumber) ? onClickPlus : () => this.setState({alert: true})}
                         className="cs-counter cs-counter--plus">
                        <span>+</span>
                    </div>
                </div>
                {alert}
            </div>
        )
    }
}

CSCounter.propTypes = {
    onClickPlus: PropTypes.func.isRequired,
    onClickMinus: PropTypes.func.isRequired,
    pageNumber: PropTypes.number.isRequired,
    maxPageNumber: PropTypes.number.isRequired,

};

//container to match redux state to component props and dispatch redux actions to callback props
const mapStateToProps = (reduxState, ownProps) => {
    const state = reduxState.calculatorSmall[ownProps.calcId];
    return {
        pageNumber: state.pageNumber,
        maxPageNumber: state.deadline.max_pages,

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

export default connect(mapStateToProps, mapDispatchToProps)(CSCounter);
