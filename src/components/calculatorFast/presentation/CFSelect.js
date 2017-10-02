'use strict';

import React from 'react';
import {connect} from 'react-redux'
import {fetchService} from  '../../../store/actions'
import Search from './CFSearch';
import PropTypes from 'prop-types';


class CFSelect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {openDropdown: false};
    }

    toggleDropdown() {
        let openDropdown = this.state.openDropdown;
        this.setState({openDropdown: !openDropdown});
    }


    render() {
        let serviceList = this.props.serviceList.map(
            (item) => {
                return <li key={item.id} onClick={() => {
                    this.toggleDropdown();
                    this.props.changeService(item.id);
                }} className="cf-dropdown__item">{item.name}</li>

            }
        );

        return (
            <div className="cf-select-wrap ">
                <div onClick={() => this.toggleDropdown()}
                     tabIndex="0"
                     className="cf-select">
                    {this.props.service}
                </div>
                <div className={(this.state.openDropdown) ? 'open' : ''}>
                    <div className="cs-dropdown-wrap">
                        <Search calcId={this.props.calcId}/>
                        <ul className="cf-dropdown">
                            {serviceList}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
CFSelect.PropTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(CFSelect);
