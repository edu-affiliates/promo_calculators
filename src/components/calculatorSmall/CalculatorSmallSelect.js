'use strict';

import React from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

class CalculatorSmallSelect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {openDropdown: false};
        this.toggleDropdown = this.toggleDropdown.bind(this);
    }

    toggleDropdown() {
        const openDropdown = !this.state.openDropdown;
        this.setState({openDropdown: openDropdown});
    }

    render() {
        let currentList = this.props.currentList.map(
            (item) => {
                return <li key={item.id} onClick={() => {
                    this.toggleDropdown();
                    this.props.onChange(item.id)
                }} className="calc-sm-dropdown__item">{item.name}</li>
            }
        );
        return (
            <div className="calc-sm-select-wrap ">
                <div onClick={this.toggleDropdown} className={`calc-sm-select calc-sm-select--${this.props.type}`}>
                    {this.props.current}
                </div>
                <div className={(this.state.openDropdown) ? 'open' : ''}>
                    <div className={`calc-sm-dropdown-wrap calc-sm-dropdown-wrap--${this.props.type}`}>
                        <ul className="calc-sm-dropdown">
                            {currentList}
                        </ul>
                    </div>
                </div>
            </div>
        )

    }
}

CalculatorSmallSelect.propTypes = {
    changeService: PropTypes.func.isRequired
};

//container to match redux state to component props and dispatch redux actions to callback props
const mapStateToProps = state => {
    return {}
};

const mapDispatchToProps = dispatch => {
    return {
        init: () => {
        },
        changeService: () => {
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CalculatorSmallSelect);