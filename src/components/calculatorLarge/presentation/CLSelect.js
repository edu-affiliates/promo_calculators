'use strict';

import React from 'react';
import Search from './CLSearch';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class CLSelect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            active: {
                service: false,
                level: false,
            }
        };
        this.setActive = this.setActive.bind(this);

    }

    setActive(type) {
        const active = Object.assign({}, this.state.active);
        for (let t in active) {
            if (t === type) {
                active[t] = !active[t];
            } else {
                active[t] = false;
            }
        }
        this.setState({active: active});
    }

    render() {
        let chooseOther;
        let titleList;
        let searchService;
        let currentList;

        if (this.props.type === 'service') {
            searchService = <Search calcId={this.props.calcId}/>;
            titleList = 'Type of Service:';
            chooseOther =
                <li className="calc-lg-select-item" onClick={() => this.props.toggleDropdown(this.props.type)}>Choose
                    Other</li>;

            currentList = this.props.allServices.slice(0, 4).map(
                (item) => {
                    return <li key={item.id}
                               className={`${(this.state.active[this.props.type] && this.props.current === item.name) ? 'active' : ''} calc-lg-select-item`}
                               onClick={() => {
                                   this.setActive(this.props.type);
                                   this.props.onChange(item.id);
                               }}>{item.name}</li>
                });
        }
        else if (this.props.type === 'level') {
            titleList = 'Academic level:';
            currentList = this.props.currentList.map(
                (item) => {
                    return <li
                        key={item.id}
                        className="calc-lg-select-item"
                        onClick={() => {
                            this.props.onChange(item.id);
                            this.props.toggleDropdown(this.props.type)
                        }}>
                        {item.name.replace(/Undergraduate /gi, 'Undergrad.')}
                    </li>
                });
        }

        let currentDropdownList;
        currentDropdownList = this.props.currentList.map(
            (item, i) => {
                return <li key={item.id} className="calc-lg-dropdown__item"
                           onClick={() => {
                               this.props.onChange(item.id);
                               this.props.toggleDropdown(this.props.type)
                           }}>{item.name}</li>
            }
        );

        return (
            <div>
                <div className="calc-lg-select-wrap">
                    <div className="calc-lg-select-title">{titleList}</div>
                    <ul className="calc-lg-select-list">
                        {currentList}
                        {chooseOther}
                    </ul>
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
    allServices: PropTypes.number.isRequired,
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


