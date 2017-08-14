'use strict';

import React from 'react';
import Search from './CSSearch';

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
                           }} className="cs-dropdown__item">{item.name}</li>
            }
        );
        let searchService;
        if (this.props.type === 'service') {
            searchService = <Search  calcId={this.props.calcId}/>;
        }
        return (

            <div className="cs-select-wrap ">
                <div onClick={() => this.props.toggleDropdown(this.props.type)}
                     className={`cs-select cs-select--${this.props.type}`}>
                    {this.props.current}
                </div>
                <div className={(this.props.openDropdown[this.props.type]) ? 'open' : ''}>
                    <div className={`cs-dropdown-wrap cs-dropdown-wrap--${this.props.type}`}>
                        {searchService}
                        <ul className="cs-dropdown">
                            {currentList}
                        </ul>
                    </div>
                </div>
            </div>
        )

    }
}

export default CalculatorSmallSelect;
