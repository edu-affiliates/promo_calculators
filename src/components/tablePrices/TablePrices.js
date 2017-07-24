'use strict';

import React from 'react';
import {connect} from 'react-redux'
import {initCalc} from '../../store/actions'
import Deadlines from './presentation/TPDeadlines'
import Service from './presentation/TPServices'
import Levels from './presentation/TPLevels'
import Table from './presentation/TPTable'

class TablePrices extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.initCalc(this.props.calcId);
    }

    render() {
        if (this.props.inited) {
        } else return (<div></div>)
        return (
            <div className={this.props.containerClass}>
                <div className="tp-container">
                    <div className="tp-top">
                        <div className="tp-top__deadline"><img src="" alt=""/>Deadline</div>
                        <div className="tp-top__body">
                            <Service calcId={this.props.calcId}/>
                            <Levels calcId={this.props.calcId}/>
                        </div>
                    </div>
                    <div className="tp-body">
                        <Deadlines calcId={this.props.calcId}/>
                        <Table calcId={this.props.calcId}/>
                    </div>
                </div>
            </div>
        )
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
