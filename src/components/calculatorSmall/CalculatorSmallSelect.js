'use strict';

import React from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

class CalculatorSmallSelect extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        let currentList = this.props.currentList.map(
            (item) => {
                return <li key={item.id}
                           onClick={() => {
                               this.props.toggleDropdown(this.props.type);
                               this.props.onChange(item.id);
                           }} className="calc-sm-dropdown__item">{item.name}</li>
            }
        );
        return (
            <div className="calc-sm-select-wrap ">
                <div onClick={() => this.props.toggleDropdown(this.props.type)}
                     className={`calc-sm-select calc-sm-select--${this.props.type}`}>
                    {this.props.current}
                </div>
                <div className={(this.props.openDropdown[this.props.type]) ? 'open' : ''}>
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

export default CalculatorSmallSelect;