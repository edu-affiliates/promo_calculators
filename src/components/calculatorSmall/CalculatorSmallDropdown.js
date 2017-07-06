'use strict';
import React from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'


class CalculatorSmallDropdown extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let currentList = this.props.currentList.map(
            (item) => {
                return <li key={item.id} onClick={this.props.changeService}
                           className="calc-sm-dropdown__item">{item.name}</li>
            }
        );
        return (
            <div className={(this.props.open) ? 'open' : ''}>
                <div className={`calc-sm-dropdown-wrap calc-sm-dropdown-wrap--${this.props.type}`}>
                    <ul className="calc-sm-dropdown">
                        {currentList}
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
    return {}
};

const mapDispatchToProps = dispatch => {
    return {
        changeService: () => {
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CalculatorSmallDropdown);