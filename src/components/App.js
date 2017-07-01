import React from 'react'
import {browserHistory, Router} from 'react-router'
import {Provider} from 'react-redux'
import PropTypes from 'prop-types'
import CalculatorSmall from './calculatorSmall/CalculatorSmall'
import CalculatorLarge from './calculatorLarge/CalculatorLarge'
import TablePrices from './tablePrices/TablePrices'

class App extends React.Component {
    static propTypes = {
        store: PropTypes.object.isRequired,
        routes: PropTypes.object.isRequired,
    }

    shouldComponentUpdate() {
        return false
    }

    render() {
        return (
            <div>
                <CalculatorSmall/>
                <CalculatorLarge/>
                <TablePrices/>
            </div>
        )
    }
}

export default App;
