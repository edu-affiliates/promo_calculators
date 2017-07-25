'use strict';

import React from 'react';
import {connect} from 'react-redux'
import {fetchService} from '../../../store/actions'

class TPService extends React.Component {

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
        const {discount, service, serviceList, changeService} = this.props;
        let list = serviceList.map((service) => {
            return <li key={service.id}
                       onClick={() => {
                           this.toggleDropdown();
                           changeService(service.id);
                       }}
                       className="tp-dropdown__item">{service.name}</li>
        });
        return (
            <div className="tp-service">
                <div className="tp-select-wrap ">
                    <div onClick={() => this.toggleDropdown()} className="tp-select">{service}</div>
                    <div className={(this.state.openDropdown) ? 'open' : ''}>
                        <div className={`tp-dropdown-wrap tp-dropdown-wrap--${this.props.type}`}>
                            {/*{searchService}*/}
                            <ul className="tp-dropdown">
                                {list}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="tp-service-dsc">
                    <span className="tp-service-dsc--title">Your first order</span>
                    <span className="tp-service-dsc--value">{discount * 100}% OFF</span>
                    <span className="tp-service-dsc-text">Limited time!</span>
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
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeService: (id) => {
            dispatch(fetchService(id, ownProps.calcId))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TPService);
