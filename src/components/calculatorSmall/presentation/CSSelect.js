'use strict';

import React from 'react';
import Search from './CSSearch';

class CalculatorSmallSelect extends React.Component {

    constructor(props) {
        super(props);
    }

    cutLevelName(levelName) {
        if (levelName === 'Undergraduate (1st and 2nd year)') {
            return 'Undergrad. (yrs 1-2)'
        } else if (levelName === 'Undergraduate (3rd and 4th year)') {
            return 'Undergrad. (yrs 3-4)'
        }
        else {
            return levelName
        }
    }


    render() {
        let service;
        let currentList = this.props.currentList.map(
            (item) => {
                return <li key={item.id}
                           onClick={() => {
                               this.props.toggleDropdown(this.props.type);
                               this.props.onChange(item.id);
                           }} className="cs-dropdown__item">{this.cutLevelName(item.name)}</li>
            }
        );
        let searchService;
        if (this.props.type === 'service') {
            searchService = <Search calcId={this.props.calcId}/>;
            if (!!this.props.current && this.props.current.length > 15) {
                service = this.props.current.substr(0, 15) + '...'
            }
        }
        return (

            <div className="cs-select-wrap ">
                <div onClick={() => this.props.toggleDropdown(this.props.type)}
                     className={`cs-select cs-select--${this.props.type}`}>
                    {(!!service) ? service : this.cutLevelName(this.props.current)}
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
