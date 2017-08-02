export const FETCH_INIT_TREE = 'FETCH_INIT_TREE';
export const FETCH_STATISTIC = 'FETCH_STATISTIC';
export const FETCH_COUPON = 'FETCH_COUPON';

export const FETCH_SERVICE = 'FETCH_SERVICE';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_SUCCESS_SINGLE = 'FETCH_SUCCESS_SINGLE';

export const PLUS_PAGE = 'PLUS_PAGE';
export const MINUS_PAGE = 'MINUS_PAGE';
export const CHANGE_SERVICE = 'CHANGE_SERVICE';
export const CHANGE_LEVEL = 'CHANGE_LEVEL';
export const CHANGE_DEADLINE = 'CHANGE_DEADLINE';
export const FILTER_SERVICES = 'FILTER_SERVICES';
export const INPUT_PAGE_NUMBER = 'INPUT_PAGE_NUMBER';
export const INIT_CALC = 'INIT_CALC';
export const SET_INIT_SERVICE = 'SET_INIT_SERVICE';

export function plusPage(calcId) {
    return {type: PLUS_PAGE, calcId: calcId}
}

export function minusPage(calcId) {

    return {type: MINUS_PAGE, calcId: calcId}
}

export function changeService(id, calcId) {
    return {type: CHANGE_SERVICE, id: id, calcId: calcId}
}
export function changeLevel(id, calcId) {
    return {type: CHANGE_LEVEL, id: id, calcId: calcId}
}
export function changeDeadline(id, calcId) {
    return {type: CHANGE_DEADLINE, id: id, calcId: calcId}
}


export function filterServices(search, calcId) {
    return {type: FILTER_SERVICES, search: search, calcId: calcId}
}

export function handleInputPageNumber(number, calcId) {
    return {type: INPUT_PAGE_NUMBER, number: number, calcId: calcId}
}

// saga dispatch actions
export function fetchInitTree() {
    return {type: FETCH_INIT_TREE}
}
export function fetchService(serviceId, calcId) {
    return {type: FETCH_SERVICE, id: serviceId, calcId: calcId}
}
export function fetchStatistic() {
    return {type: FETCH_STATISTIC}
}
export function fetchCoupon() {
    return {type: FETCH_COUPON}
}

//reducer dispatch actions
export function fetchSuccess(tree) {
    return {type: FETCH_SUCCESS, tree: tree}
}
export function fetchSuccessSingle(tree, id) {
    return {type: FETCH_SUCCESS_SINGLE, tree: tree, id: id}
}

export function initCalc(calcId) {
    return {type: INIT_CALC, calcId: calcId}
}
export function setInitService(initServiceId) {
    return {type: SET_INIT_SERVICE, initServiceId: initServiceId}
}
