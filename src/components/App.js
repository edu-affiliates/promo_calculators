import React from 'react'
import {browserHistory, Router} from 'react-router'
import {Provider} from 'react-redux'
import PropTypes from 'prop-types'
import CalculatorSmall from './calculatorSmall/CalculatorSmall'
import CalculatorLarge from './calculatorLarge/CalculatorLarge'
import TablePrices from './tablePrices/TablePrices'
import { createStore , applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import {reducers} from './calculatorSmall/reducers'
import mysaga from './sagas'

class App extends React.Component {
    static propTypes = {
        store: PropTypes.object.isRequired,
        routes: PropTypes.object.isRequired,
    }



    shouldComponentUpdate() {
        return false
    }

    render() {
        const sagaMiddleware = createSagaMiddleware();

        let store = createStore(reducers, applyMiddleware(sagaMiddleware));
        sagaMiddleware.run(mysaga);
        return (
            <Provider store={store}>
                <div>
                    <CalculatorSmall/>
                    <CalculatorLarge/>
                    <TablePrices/>
                </div>
            </Provider>
        )
    }
}

export default App;
