'use strict';

import React from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {changeService} from './actions'


class CalculatorSmallDropdown extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let servicesList = this.props.currentServices.map(
            (serviceItem) => {
                return <li key={serviceItem.name} onClick={this.props.changeService}
                           className="calc-sm-dropdown__item">{serviceItem.name}</li>
            }
        );
        return (
            <div className={(this.props.open) ? 'open' : ''}>
                <div className="calc-sm-dropdown-wrap">
                    <ul className="calc-sm-dropdown">
                        {servicesList}
                    </ul>
                </div>
            </div>
        )
    }
}

CalculatorSmallDropdown.propTypes = {
    changeService: PropTypes.func.isRequired
};

//container to match redux state to component props and dispatch redux actions to callback props
const mapStateToProps = state => {
    return {
        currentServices: state.currentServices,
        service: state.current.service.name,
        level: state.current.level.name,
        deadline: state.current.deadline.name
    }
};

const mapDispatchToProps = dispatch => {
    return {
        changeService: () => {
            dispatch(changeService('2183'))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CalculatorSmallDropdown);