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
        this.openSingle = this.openSingle.bind(this);
    }

    toggleDropdown() {
        let openDropdown = this.state.openDropdown;
        this.setState({openDropdown: !openDropdown});
    }


    openSingle(current) {
        this.props.allServices.slice(0, 4).forEach((s) => {
            return s !== current;
        });
    }

    render() {
        let chooseOther, services, currentDropdownList, selectedService;
        const {allServices, service, serviceList, changeService} = this.props;

        services = allServices.slice(0, 4).map(
            (item) => {
                return <li key={item.id}
                           className={`${(service === item.name && !this.state.openDropdown ? 'active' : '')} calc-lg-select-item`}
                           onClick={() => {
                               if (this.state.openDropdown) {
                                   this.toggleDropdown();
                               }
                               changeService(item.id);
                           }}>{item.name}</li>
            });

        chooseOther =
            <li className={`${(this.state.openDropdown) ? 'active' : ''} calc-lg-select-item`}
                onClick={() => this.toggleDropdown()}>Choose Other</li>;

        currentDropdownList = serviceList.map(
            (item) => {
                return <li key={item.id} className="calc-lg-dropdown__item"
                           onClick={() => {
                               changeService(item.id);
                               this.toggleDropdown()
                           }}>{item.name}</li>
            }
        );
        selectedService = <div
            className={`${(service !== 'Essay' && service !== 'Research Paper' && service !== 'Term Paper' && service !== 'Case Study'
            && !this.state.openDropdown) ? 'open' : ''} calc-lg-select-single`}>
            <div className="calc-lg-select-single__text">{service}</div>
            <div onClick={() => this.toggleDropdown()}
                 className="calc-lg-select-single__close">✕
            </div>
        </div>;


        return (
            <div className="calc-lg-select-group">
                <div className="calc-lg-select-wrap">
                    <div className="calc-lg-select-title">Type of Service:</div>
                    <ul className="calc-lg-select-list">
                        {services}
                        {chooseOther}
                    </ul>
                    {selectedService}
                    <div className={(this.state.openDropdown) ? 'open' : ''}>
                        <div className={`calc-lg-dropdown-wrap calc-lg-dropdown-wrap--service`}>
                            <Search calcId={this.props.calcId}/>
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
