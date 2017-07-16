'use strict';

import React from 'react';
import {connect} from 'react-redux'
import {filterServices} from  '../../../store/actions'


class CalculatorSmallSearch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {searchString: ''};
        this.handleChange = this.handleChange.bind(this);
    };

    handleChange(e) {
        const search = e.target.value;
        this.setState({searchString: search});
        this.props.filterServices(search);
    }

    render() {
        return (
            <div className="calc-sm-search-wrap">
                <input className="calc-sm-search" value={this.state.searchString}
                       onChange={(e) => this.handleChange(e)}
                       placeholder="Type the name of service"
                />
            </div>
        )
    }
}

//container to match redux state to component props and dispatch redux actions to callback props
const mapStateToProps = state => {
    return {}
};

const mapDispatchToProps = dispatch => {
    return {
        filterServices: (search) => {
            dispatch(filterServices(search))
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CalculatorSmallSearch);
