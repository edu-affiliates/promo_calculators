"use strict";

import initialState from './initState';
import {calcSmallReducers} from './reducerCalc'
import {allServiceList} from "./reducerLogic";

import generalOptions from '../config/generalOptions'
import {
  FETCH_SUCCESS,
  FETCH_SUCCESS_SINGLE,
  INIT_CALC,
  PLUS_PAGE,
  MINUS_PAGE,
  CHANGE_SERVICE,
  CHANGE_LEVEL,
  CHANGE_DEADLINE,
  FILTER_SERVICES,
  INPUT_PAGE_NUMBER,
  SET_INIT_SERVICE,
  changeService,
} from './actions';

const defaultCalcState = {
  pageNumber: 1,
  searchString: '',
  currentServices: [],
  currentLevels: [],
  currentDeadlines: [],
  service: {},
  level: {},
  deadline: {}
}

const defaultId = generalOptions.service_ids.split(',')[0].trim();

export const reducers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SUCCESS_SINGLE:
      //merge current tree and tree for single service
      const mergedServices = Object.assign({}, state.tree.service, action.tree.entities.service);
      const mergedLevels = Object.assign({}, state.tree.level, action.tree.entities.level);
      const mergedDeadline = Object.assign({}, state.tree.deadline, action.tree.entities.deadline);
      return Object.assign({}, state, {
        tree: {
          service: mergedServices,
          level: mergedLevels,
          deadline: mergedDeadline
        }
      });
    case FETCH_SUCCESS:
      let services = allServiceList(action.tree.entities);
      return Object.assign({}, state, {
        inited: true,
        tree: action.tree.entities,
        allServices: services
      });
    case INIT_CALC:
      const calcState = state.inited ? calcSmallReducers(defaultCalcState, changeService(defaultId, action.calcId), state.tree, state.allServices) : defaultCalcState;
      return {
        ...state,
        calculatorSmall: [...state.calculatorSmall, calcState]
      };
    case SET_INIT_SERVICE:
      return Object.assign({}, state, {
        calculatorSmall: state.calculatorSmall.map(
          (calcState) => {
            return calcSmallReducers(calcState, changeService(action.initServiceId), state.tree, state.allServices)
          }
        )
      });
    case CHANGE_SERVICE:
    case CHANGE_LEVEL:
    case CHANGE_DEADLINE:
    case PLUS_PAGE:
    case MINUS_PAGE:
    case FILTER_SERVICES:
    case INPUT_PAGE_NUMBER:
      return {
        ...state,
        calculatorSmall: state.calculatorSmall.map(
          (cs, i) => {
            return i === action.calcId ? calcSmallReducers(cs, action, state.tree, state.allServices) : cs
          }
        )
      };
    // calculatorSmall: calcSmallReducers(state.calculatorSmall[action.calcId], action, state.tree)
    default:
      return state;
  }
}
  ;
