/**
 * Created by nadiadaliavska on 7/1/17.
 */
export const PLUS_PAGE = 'PLUS_PAGE';
export const MINUS_PAGE = 'MINUS_PAGE';
export const CHANGE_SERVICE = 'CHANGE_SERVICE';

export function plusPage() {
    return {type: PLUS_PAGE}
}

export function minusPage() {

    return {type: MINUS_PAGE}
}

export function changeService(serviceID) {
    return {type: CHANGE_SERVICE, id: serviceID}
}

