import React from 'react'
import ReactDOM from 'react-dom'
import './styles/main.scss'
import CalculatorSmall from './components/calculatorSmall/CalculatorSmall'
import createStore from './store/createStore'
import initialState from './store/initState';
import {Provider} from 'react-redux'


// Store Initialization
// ------------------------------------
const store = createStore(initialState);

// Render Setup
// ------------------------------------
const MOUNT_NODE_1 = document.getElementById('cs-1');
const MOUNT_NODE_2 = document.getElementById('cs-2');
const MOUNT_NODE_3 = document.getElementById('cs-3');
let render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <div>
        <CalculatorSmall containerClass={'calc-sm'}/>
      </div>
    </Provider>,
    MOUNT_NODE_1
  );
  ReactDOM.render(
    <Provider store={store}>
      <div>
        <CalculatorSmall containerClass={'calc-sm theme-dark-blue'}/>
      </div>
    </Provider>,
    MOUNT_NODE_2
  );
  ReactDOM.render(
    <Provider store={store}>
      <div>
        <CalculatorSmall containerClass={'calc-sm theme-green'}/>
      </div>
    </Provider>,
    MOUNT_NODE_3
  );
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
