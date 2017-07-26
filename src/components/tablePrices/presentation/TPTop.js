'use strict';

import React from 'react';
import {connect} from 'react-redux'
import {changeLevel, fetchService} from '../../../store/actions'
import Search from './TPSearch'


class TPTop extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            openDropdown: false
        };
        this.toggleDropdown = this.toggleDropdown.bind(this);
    }

    toggleDropdown() {
        let openDropdown = this.state.openDropdown;
        this.setState({openDropdown: !openDropdown});
    }


    render() {
        const {discount, level, levelList, service, serviceList, changeService, changeLevel} = this.props;
        let levels = levelList.map((l) => {
            return <div key={l.id} className={`${(level === l.name) ? 'active' : ''} tp-level__title`}>{l.name}</div>
        });
        let services = serviceList.map((service) => {
            return <li key={service.id}
                       onClick={() => {
                           this.toggleDropdown();
                           changeService(service.id);
                       }}
                       className="tp-dropdown__item">{service.name}</li>
        });
        return (
            <div className="tp-header">
                <div className="tp-header__dsc">
                    <span className="tp-header__dsc--title">Your first order</span>
                    <span className="tp-header__dsc--value">{discount * 100}% OFF</span>
                    <span className="tp-header__dsc-text">Limited time!</span>
                </div>
                <div className="tp-header__deadline">
                    <div className="tp-header__deadline-top">
                        <img src={require("../../../images/icons/tp.svg")}/>
                    </div>
                    {/*<div className="tp-header__deadline-bottom">*/}
                        {/*<span></span>*/}
                    {/*</div>*/}
                </div>
                <div className="tp-header__body">
                    <div className="tp-service">
                        <div className="tp-service__group">
                            <div onClick={() => this.toggleDropdown()} className="tp-service__select">{service}</div>
                            <div className={(this.state.openDropdown) ? 'open' : ''}>
                                <div className="tp-service__dropdown-wrap">
                                    <Search calcId={this.props.calcId}/>
                                    <ul className="tp-service-dropdown">
                                        {services}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tp-level">
                        {levels}
                    </div>
                </div>
            </div>

        )
    }
}

//container to match redux state to component props and dispatch redux actions to callback props
const mapStateToProps = (reduxState, ownProps) => {
    const state = reduxState.calculatorSmall[ownProps.calcId];
    return {
        discount: reduxState.discount,
        service: state.service.name,
        serviceList: state.currentServices,
        level: state.level.name,
        levelList: state.currentLevels,
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeService: (id) => {
            dispatch(fetchService(id, ownProps.calcId))
        },
        changeLevel: (id) => {
            dispatch(changeLevel(id, ownProps.calcId))
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TPTop);
