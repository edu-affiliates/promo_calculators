'use strict';

import React from 'react';
import {connect} from 'react-redux'
import {fetchService} from  '../../../store/actions'
import Search from './CLSearch';
import PropTypes from 'prop-types';


class CLSelectService extends React.Component {

    constructor(props) {
        super(props);
        this.state = {openDropdown: false};
        this.toggleDropdown = this.toggleDropdown.bind(this);
    }

    toggleDropdown() {
        let openDropdown = this.state.openDropdown;
        this.setState({openDropdown: !openDropdown});
    }


    render() {
        let chooseOther, services, currentDropdownList, selectedService;
        const {allServices, service, serviceList, changeService} = this.props;
        //take first 4 services from the list
        const defaultServices = allServices.slice(0, 4);
        const defaultServiceNames = defaultServices.map(service => service.name);
        services = defaultServices.map(
            (item) => {
                return <li key={item.id}
                           className={`${(service === item.name && !this.state.openDropdown ? 'active' : '')} cl-select-item`}
                           onClick={() => {
                               if(this.state.openDropdown) this.toggleDropdown();
                               changeService(item.id);
                           }}>{item.name}</li>
            });

        chooseOther =
            <li className={`${(this.state.openDropdown) ? 'active' : ''} cl-select-item`}
                onClick={() => this.toggleDropdown()}>Choose Other</li>;

        currentDropdownList = serviceList
            .filter(item => !defaultServiceNames.includes(item.name))
            .map(
            (item) => {
                return (item.name !== '---------------') ? <li key={item.id} itemID={item.id} className="cl-dropdown__item"
                                                onClick={() => {
                                                    changeService(item.id);
                                                    this.toggleDropdown()
                                                }}>{item.name}</li>
                    : <li className="cl-dropdown__item-separator"/>
            }
        );
        selectedService = <div className={`${!defaultServiceNames.includes(service) && !this.state.openDropdown ? 'open' : ''} cl-select-single`}>
            <div className="cl-select-single__text">{service}</div>
            <div onClick={() => this.toggleDropdown()}
                 className="cl-select-single__close">✕
            </div>
        </div>;


        return (
            <div className="service cl-select-wrap">
                <div className="cl-select-title">Type of service:</div>
                <ul className="cl-select-list">
                    {services}
                    {chooseOther}
                </ul>
                {selectedService}
                <div className={`${(this.state.openDropdown) ? 'open' : ''} cl-dropdown-wrap`}>
                    <Search calcId={this.props.calcId}/>
                    <ul className="cl-dropdown">
                        {currentDropdownList}
                    </ul>
                </div>
            </div>
        )
    }
}
CLSelectService.PropTypes = {
    service: PropTypes.string.isRequired,
    serviceList: PropTypes.array.isRequired
};
//container to match redux state to component props and dispatch redux actions to callback props
const mapStateToProps = (reduxState, ownProps) => {
    const state = reduxState.calculatorSmall[ownProps.calcId];
    return {
        allServices: reduxState.allServices,
        service: state.service.name,
        serviceList: state.currentServices,
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeService: (id) => {
            dispatch(fetchService(id, ownProps.calcId))
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CLSelectService);
