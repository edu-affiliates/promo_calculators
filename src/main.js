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
import {fetchInitTree, fetchStatistic, fetchCoupon, fetchUser} from './store/actions';

const css = 'https://s3.amazonaws.com/genericapps/resources/calculators/main.f425b57b195fd3c43119b2364263695a.css';
const font = 'https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet';
function loadCSS(filename) {

    const file = document.createElement("link");
    file.setAttribute("rel", "stylesheet");
    file.setAttribute("type", "text/css");
    file.setAttribute("href", filename);
    document.head.appendChild(file);

}
function loadFont(filename) {
    const file = document.createElement("link");
    file.setAttribute("rel", "stylesheet");
    file.setAttribute("href", filename);
    document.head.appendChild(file);
}

// loadCSS(css);
loadFont(font);

// Store Initialization
// ------------------------------------
const store = createStore(initialState);
store.dispatch(fetchUser());
store.dispatch(fetchInitTree());

// Render Setup
// ------------------------------------

const MOUNT_NODES_CALC_SM = document.getElementsByClassName("calc-sm");
const MOUNT_NODES_CALC_LG = document.getElementsByClassName("calc-lg");
const MOUNT_NODES_TP = document.getElementsByClassName("table-price");
let render = () => {
    let calcId = 0;
    Array.prototype.forEach.call(MOUNT_NODES_TP, (MOUNT_NODE, i) => {
        ReactDOM.render(
            <Provider store={store}>
                <div>
                    <TablePrices calcId={calcId++}/>
                </div>
            </Provider>,
            MOUNT_NODE
        );
    });

    Array.prototype.forEach.call(MOUNT_NODES_CALC_SM, (MOUNT_NODE, i) => {
        ReactDOM.render(
            <Provider store={store}>
                <div>
                    <CalculatorSmall calcId={calcId++}
                                     calcTitle={MOUNT_NODE.dataset.title}
                                     calcTitleDiscount={MOUNT_NODE.dataset.titleDiscount}
                                     calcType={MOUNT_NODE.dataset.type}
                    />
                </div>
            </Provider>,
            MOUNT_NODE
        );
    });

    Array.prototype.forEach.call(MOUNT_NODES_CALC_LG, (MOUNT_NODE, i) => {
        ReactDOM.render(
            <Provider store={store}>
                <div>
                    <CalculatorLarge calcId={calcId++}
                                     calcTitle={MOUNT_NODE.dataset.title}
                                     calcTitleDiscount={MOUNT_NODE.dataset.titleDiscount}
                    />
                </div>
            </Provider>,
            MOUNT_NODE
        );
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
