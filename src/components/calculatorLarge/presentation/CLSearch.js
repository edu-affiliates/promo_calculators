'use strict';

import React from 'react';
import {connect} from 'react-redux'
import {filterServices} from  '../../../store/actions'


class CLSearch extends React.Component {

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
            <div className="cl-search-wrap">
                <input className="cl-search" value={this.state.searchString}
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

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        filterServices: (search) => {
            dispatch(filterServices(search, ownProps.calcId))
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CLSearch);
