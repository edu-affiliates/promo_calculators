'use strict';

import React from 'react';
import {connect} from 'react-redux'
import {initCalc} from '../../store/actions'
import CLTitle from './presentation/CLTitle';
import CLSelect from './presentation/CLSelect';
import CLRange from './presentation/CLRange';
import CLCounter from './presentation/CLCounter';
import CLPrices from './presentation/CLPrices';
import CLButtons from './presentation/CLButtons';


class CalculatorLarge extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.initCalc(this.props.calcId);
  }
  render() {
    return (
      <div className="calc-lg-container">
        <CLTitle/>
        <CLSelect/>
        <CLRange/>
        <CLCounter/>
        <CLPrices/>
       <CLButtons/>
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

export default connect(mapStateToProps, mapDispatchToProps)(CalculatorLarge);
