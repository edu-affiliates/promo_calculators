import initialState from './initState';
import {calcSmallReducers} from '../components/calculatorSmall/calcSmallReducers'
import {
  FETCH_SUCCESS,
  FETCH_SUCCESS_SINGLE,
  PLUS_PAGE,
  MINUS_PAGE,
  CHANGE_SERVICE,
  CHANGE_LEVEL,
  CHANGE_DEADLINE,
  FILTER_SERVICES,
  INPUT_PAGE_NUMBER
} from './actions';

/** return all services from api **/
export const allServiceList = (tree) => {

  /** convert the default services to array **/
  let defaultServices = Object.keys(tree.service).map((serviceID) => {
    return tree.service[serviceID];
  });

  /** sort array of the default services by order property**/
  defaultServices = defaultServices.sort((a, b) => {
    return parseInt(a.order) - parseInt(b.order);
  });
  /** filter array of all services except of the default services **/
  const services = tree.tree.undefined.services.filter((s) => {
    return !tree.service[s.id];
  });
  /**  return concatenated  array of default and all services**/
  return defaultServices.concat(services);
};

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
    case CHANGE_SERVICE:
    case CHANGE_LEVEL:
    case CHANGE_DEADLINE:
    case PLUS_PAGE:
    case MINUS_PAGE:
    case FILTER_SERVICES:
    case INPUT_PAGE_NUMBER:
      return Object.assign({}, state, {
        calculatorSmall: calcSmallReducers(state.calculatorSmall, action, state.tree)
      });
    default:
      return state;
  }
};
