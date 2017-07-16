'use strict';

import React from 'react';
import {connect} from 'react-redux'
import {fetchInitTree} from '../../store/actions'

import Title from './presentation/CalculatorSmallTitle';
import SelectGroup from './presentation/CalculatorSmallSelectGroup';
import Counter from "./presentation/CalculatorSmallCounter";
import Prices from "./presentation/CalculatorSmallPrices";
import Buttons from "./presentation/CalculatorSmallButtons";

class CalculatorSmall extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.init();
  }

  render() {
    if (this.props.inited) {
      return (
        <div className={this.props.containerClass}>
          <div className="calc-sm-wrap">
            <Title/>
            <SelectGroup/>
            <Counter/>
            <Prices/>
            <Buttons/>
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
    init: () => {
      dispatch(fetchInitTree())
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CalculatorSmall);
