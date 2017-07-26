'use strict';

import React from 'react';
import {connect} from 'react-redux'
import {fetchService} from '../../../store/actions';
import Search from './TPSearch'

class TPSelect extends React.Component {

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
        const {service, serviceList, changeService} = this.props;
        let list = serviceList.map((service) => {
            return <li key={service.id}
                       onClick={() => {
                           this.toggleDropdown();
                           changeService(service.id);
                       }}
                       className="tp-dropdown__item">{service.name}</li>
        });
        return (
            <div className="">
                <div>Type of Service:</div>
                <div className="tp-select-wrap ">
                    <div onClick={() => this.toggleDropdown()} className="tp-select">{service}</div>
                    <div className={(this.state.openDropdown) ? 'open' : ''}>
                        <div className={`tp-dropdown-wrap tp-dropdown-wrap--${this.props.type}`}>
                            <Search calcId={this.props.calcId}/>
                            <ul className="tp-dropdown">
                                {list}
                            </ul>
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(TPSelect);
