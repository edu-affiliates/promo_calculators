"use strict";

import React from 'react'
import ReactDOM from 'react-dom'
import './styles/main.scss'
import CalculatorSmall from './components/calculatorSmall/CalculatorSmall'
import CalculatorLarge from './components/calculatorLarge/CalculatorLarge'
import TablePrices from './components/tablePrices/TablePrices'
import createStore from './store/createStore'
import initialState from './store/initState';
import {Provider} from 'react-redux';
import {fetchInitTree} from './store/actions';


// Store Initialization
// ------------------------------------
const store = createStore(initialState);
store.dispatch(fetchInitTree());

// Render Setup
// ------------------------------------
const MOUNT_NODE_TP = document.getElementById('tp');
const MOUNT_NODE_CL_1 = document.getElementById('cl-1');
const MOUNT_NODE_CL_2 = document.getElementById('cl-2');
const MOUNT_NODE_1 = document.getElementById('cs-1');
const MOUNT_NODE_2 = document.getElementById('cs-2');
const MOUNT_NODE_3 = document.getElementById('cs-3');
const MOUNT_NODES = [MOUNT_NODE_TP, MOUNT_NODE_CL_1, MOUNT_NODE_CL_2, MOUNT_NODE_1, MOUNT_NODE_2, MOUNT_NODE_3];
const MOUNT_CLASSES = ['tp', 'calc-lg', 'calc-lg theme-dark-blue', 'calc-sm', 'calc-sm theme-dark-blue', 'calc-sm theme-green'];

let render = () => {

    MOUNT_NODES.forEach((MOUNT_NODE, i) => {
        if (MOUNT_CLASSES[i].indexOf('calc-lg') !== -1) {
            ReactDOM.render(
                <Provider store={store}>
                    <div>
                        <CalculatorLarge calcId={i}
                                         calcTitle={MOUNT_NODE.dataset.title}
                                         calcTitleDiscount={MOUNT_NODE.dataset.titleDiscount}
                                         containerClass={MOUNT_CLASSES[i]}/>
                    </div>
                </Provider>,
                MOUNT_NODE
            );
        } else if (MOUNT_CLASSES[i] === 'tp') {
            ReactDOM.render(
                <Provider store={store}>
                    <div>
                        <TablePrices calcId={i} containerClass={MOUNT_CLASSES[i]}/>
                    </div>
                </Provider>,
                MOUNT_NODE
            );
        }
        else {
            ReactDOM.render(
                <Provider store={store}>
                    <div>
                        <CalculatorSmall calcId={i} containerClass={MOUNT_CLASSES[i]}/>
                    </div>
                </Provider>,
                MOUNT_NODE
            );
        }
    });
};

// Development Tools
// ------------------------------------
if (__DEV__) {
    if (module.hot) {
        const renderApp = render
        const renderError = (error) => {
            const RedBox = require('redbox-react').default

            ReactDOM.render(<RedBox error={error}/>, MOUNT_NODE_1)
        }

        render = () => {
            try {
                renderApp()
            } catch (e) {
                console.error(e)
                renderError(e)
            }
        }

        // Setup hot module replacement
        module.hot.accept([
                './main',
            ], () =>
                setImmediate(() => {
                    ReactDOM.unmountComponentAtNode(MOUNT_NODE_1)
                    render()
                })
        )
    }
}

// Let's Go!
// ------------------------------------
if (!__TEST__) render()
