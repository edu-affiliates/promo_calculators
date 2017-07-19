'use strict';

import React from 'react';
import Search from './CLSearch';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class CLSelect extends React.Component {

    constructor(props) {
        super(props);
        this.openSingle = this.openSingle.bind(this);
    }

    openSingle(current) {
        this.props.allServices.slice(0, 4).forEach((s) => {
            return s !== current;
        });
    }

    ;

    render() {
        let chooseOther;
        let titleList;
        let searchService;
        let currentList;
        let currentDropdownList;
        let selectedService;

        if (this.props.type === 'service') {
            searchService = <Search calcId={this.props.calcId}/>;
            titleList = 'Type of Service:';
            chooseOther =
                <li className={`${(this.props.openDropdown[this.props.type]) ? 'active' : ''} calc-lg-select-item`}
                    onClick={() => this.props.toggleDropdown(this.props.type)}>Choose Other</li>;

            currentList = this.props.allServices.slice(0, 4).map(
                (item) => {
                    return <li key={item.id}
                               className={`${(this.props.current === item.name && !this.props.openDropdown[this.props.type]) ? 'active' : ''} calc-lg-select-item`}
                               onClick={() => {
                                   if (this.props.openDropdown[this.props.type]) {
                                       this.props.toggleDropdown(this.props.type);
                                   }
                                   this.props.onChange(item.id);
                               }}>{item.name}</li>
                });
            currentDropdownList = this.props.currentList.map(
                (item, i) => {
                    return <li key={item.id} className="calc-lg-dropdown__item"
                               onClick={() => {
                                   this.props.onChange(item.id);
                                   this.props.toggleDropdown(this.props.type)
                               }}>{item.name}</li>
                }
            );
            selectedService = <div className={`
            ${(this.props.current !== 'Essay'
            && this.props.current !== 'Research Paper'
            && this.props.current !== 'Term Paper'
            && this.props.current !== 'Case Study'
            && !this.props.openDropdown[this.props.type]) ? 'open' : ''} calc-lg-select-single`}>
                <div className="calc-lg-select-single__text">{this.props.current}</div>
                <div onClick={() => this.props.toggleDropdown(this.props.type)}
                     className="calc-lg-select-single__close">✕
                </div>
            </div>;
        }
        else if (this.props.type === 'level') {
            titleList = 'Academic level:';
            currentList = this.props.currentList.map(
                (item) => {
                    return <li
                        key={item.id}
                        className={`${(this.props.current === item.name) ? 'active' : ''} calc-lg-select-item`}
                        onClick={() => {
                            this.props.onChange(item.id);
                        }}>
                        {item.name.replace(/Undergraduate /gi, 'Undergrad.')}
                    </li>
                });
        }


        return (
            <div>
                <div className="calc-lg-select-wrap">
                    <div className="calc-lg-select-title">{titleList}</div>
                    <ul className="calc-lg-select-list">
                        {currentList}
                        {chooseOther}
                    </ul>
                    {selectedService}
                    <div className={(this.props.openDropdown[this.props.type]) ? 'open' : ''}>
                        <div className={`calc-lg-dropdown-wrap calc-lg-dropdown-wrap--${this.props.type}`}>
                            {searchService}
                            <ul className="calc-lg-dropdown">
                                {currentDropdownList}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

CLSelect.propTypes = {
    allServices: PropTypes.array.isRequired,
};

//container to match redux state to component props and dispatch redux actions to callback props

const mapStateToProps = (reduxState, ownProps) => {
    const state = reduxState.calculatorSmall[ownProps.calcId];
    return {
        allServices: reduxState.allServices,
    }
};

const mapDispatchToProps = dispatch => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(CLSelect);


