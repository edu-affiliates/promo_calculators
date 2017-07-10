/**
 * Created by nadiadaliavska on 7/1/17.
 */
export const PLUS_PAGE = 'PLUS_PAGE';
export const MINUS_PAGE = 'MINUS_PAGE';
export const CHANGE_SERVICE = 'CHANGE_SERVICE';
export const CHANGE_LEVEL = 'CHANGE_LEVEL';
export const CHANGE_DEADLINE = 'CHANGE_DEADLINE';
export const FETCH_INIT_TREE = 'FETCH_INIT_TREE';
export const FETCH_SERVICE = 'FETCH_SERVICE';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_SUCCESS_SINGLE = 'FETCH_SUCCESS_SINGLE';
export const FILTER_SERVICES = 'FILTER_SERVICES';
export const INPUT_PAGE_NUMBER = 'INPUT_PAGE_NUMBER';

export function plusPage() {
    return {type: PLUS_PAGE}
}

export function minusPage() {

    return {type: MINUS_PAGE}
}

export function changeService(id) {
    return {type: CHANGE_SERVICE, id: id}
}
export function changeLevel(id) {
    return {type: CHANGE_LEVEL, id: id}
}
export function changeDeadline(id) {
    return {type: CHANGE_DEADLINE, id: id}
}
export function fetchInitTree() {
    return {type: FETCH_INIT_TREE}
}
export function fetchService(serviceId) {
    return {type: FETCH_SERVICE, id: serviceId}
}
export function fetchSuccess(tree) {
    return {type: FETCH_SUCCESS, tree: tree}
}
export function fetchSuccessSingle(tree, id) {
    return {type: FETCH_SUCCESS_SINGLE, tree: tree, id: id}
}

export function filterServices(search) {
    return {type: FILTER_SERVICES, search: search}
}

export function handleInputPageNumber(number) {
    return{type: INPUT_PAGE_NUMBER, number: number}
}

