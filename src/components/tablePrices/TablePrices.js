'use strict';

import React from 'react';
import {connect} from 'react-redux'
import {initCalc} from '../../store/actions'
import Deadlines from './presentation/TPDeadlines'
import Top from './presentation/TPTop'
import Table from './presentation/TPTable'
import Select from './presentation/TPSelect'

class TablePrices extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.initCalc(this.props.calcId);
    }

    render() {
        if (this.props.inited) {
            return (
                <div className={this.props.containerClass}>
                    <div className="tp-container">
                        <Select calcId={this.props.calcId}/>
                        <Top calcId={this.props.calcId}/>
                        <div className="tp-body">
                            <Deadlines calcId={this.props.calcId}/>
                            <Table calcId={this.props.calcId}/>
                        </div>
                    </div>
                </div>
            )
        } else return (<div></div>)
    }
}


//container to match redux state to component props and dispatch redux actions to callback props
const mapStateToProps = state => {
    return {
        inited: state.inited

    }
};

const mapDispatchToProps = dispatch => {
    return {
        initCalc: (calcId) => {
            dispatch(initCalc(calcId))
        },
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(TablePrices);
