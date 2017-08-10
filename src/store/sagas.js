"use strict";

import generalOptions from '../config/generalOptions'
import helper from '../api/helper'
import {call, put, select, takeEvery} from 'redux-saga/effects'
import {FETCH_SERVICE, FETCH_INIT_TREE, FETCH_USER} from './actions'
import {fetchSuccess, fetchSuccessSingle, fetchSuccessDsc, changeService, setInitService} from './actions'
import {getStats, sendStats, getUser, getUserDiscount, getTree, getDiscount} from '../api/service'


/** process api call for the user info, discount and statistics **/
function * fetchUser() {
    try {
        if (generalOptions.apiMode === 'M') {
            const user = yield call(getUser);
            const xsrf = (helper.getCookie('_xsrf')) ? helper.getCookie('_xsrf') : user.token;
            const stats = getStats();
            yield call(sendStats, stats, xsrf);
            if (user.discount !== 0) {
                const dsc = yield call(getUserDiscount);
                yield put(fetchSuccessDsc(dsc))
            } else {
                const coupon = (!!helper.getCookie('dsc')) ? helper.getCookie('dsc') : generalOptions.dsc;
                if (coupon) {
                    const dsc = yield call(getDiscount, coupon);
                    yield put(fetchSuccessDsc(dsc))
                }
            }
        }
    } catch (e) {
    }
}

/** process api call for the initial state **/
function * fetchServiceTree(action) {
    try {
        const treeLocalStorage = yield call(helper.getFromLocalStorage, 'tree');
        const defaultId = generalOptions.service_ids.split(',')[0].trim();
        if (treeLocalStorage) {
            yield put(fetchSuccess(treeLocalStorage));
            yield put(setInitService(defaultId))
        } else {
            const tree = yield call(getTree);

            yield call(helper.putToLocalStorage, 'tree', tree);
            yield put(fetchSuccess(tree));
            yield put(setInitService(defaultId))
        }
    } catch (e) {
        yield put({type: 'USER_FETCH_FAILED', message: e.message});
        console.log(e)
    }
}

/** process api call for the selected service **/
function * fetchServiceSingle(action) {
    try {
        const currentTree = yield select((state) => state.tree);
        if (currentTree.service[action.id]) {
            yield put(changeService(action.id, action.calcId))
        } else {
            const tree = yield call(getTree, action.id);
            // console.log(tree);
            yield put(fetchSuccessSingle(tree, action.id));
            yield put(changeService(action.id, action.calcId))
        }
    } catch (e) {
        yield put({type: 'USER_FETCH_FAILED', message: e.message})
    }
}

/* saga dispatch actions
 */
function * mysaga() {
    yield takeEvery(FETCH_USER, fetchUser);
    yield takeEvery(FETCH_INIT_TREE, fetchServiceTree);
    yield takeEvery(FETCH_SERVICE, fetchServiceSingle);
}

export default mysaga
