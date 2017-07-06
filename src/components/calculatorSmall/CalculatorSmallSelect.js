'use strict';

import React from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {changeService, fetchInitTree} from './actions'
import Dropdown from './CalculatorSmallDropdown'

class CalculatorSmallSelect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {openDropdown: false};
        this.openDropdown = this.openDropdown.bind(this);
    }

    componentWillMount() {
        this.props.init();
    }

    openDropdown() {
        const openDropdown = !this.state.openDropdown;
        this.setState({openDropdown: openDropdown});
    }

    render() {
        if (this.props.inited) {
            return (
                <div className="calc-sm-select-wrap ">
                    <div onClick={this.openDropdown} className={`calc-sm-select calc-sm-select--${this.props.type}`}>
                        {this.props.current}
                    </div>
                    <Dropdown type={this.props.type} currentList={this.props.currentList} open={this.state.openDropdown}/>
                </div>
            )
        } else return (<div></div>)
    }
}

CalculatorSmallSelect.propTypes = {
    changeService: PropTypes.func.isRequired
};

//container to match redux state to component props and dispatch redux actions to callback props
const mapStateToProps = state => {
    return {
        inited: state.inited,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        init: () => {
            dispatch(fetchInitTree())
        },
        changeService: () => {
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CalculatorSmallSelect);