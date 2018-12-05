"use strict";

import generalOptions from '../config/generalOptions'
import helper from '../api/helper'
import {call, put, select, takeEvery} from 'redux-saga/effects'
import {FETCH_SERVICE, FETCH_INIT_TREE, FETCH_USER, FETCH_DISCOUNT, handleInputEmail} from './actions'
import {
    fetchSuccess,
    fetchSuccessSingle,
    fetchSuccessDsc,
    changeService,
    setInitService,
    fetchDiscount,
    fetchCurrency
} from './actions'
import {
    getStats,
    sendStats,
    getUserCheckAccess,
    getTree,
    getDiscount
} from '../api/service'

import {currencyService} from "./reducerLogic";


/** process api call for the initial state **/
function * fetchServiceTree(action) {
    try {
        if (generalOptions.apiMode === 'M') {
            const stats = getStats();
            const user = yield call(getUserCheckAccess);
            yield call(sendStats, stats, user.info.token);
            yield put(fetchDiscount(user.info.discount, user.info.name));

            if (user.info.name) {
                for (let i=0; i<25; i++) {
                    yield put(handleInputEmail(user.info.email, i));
                }
            }

            if (generalOptions.dsc) {
                const dsc = (helper.getUrlParam('dsc') && helper.isFakeAccount(helper.getUrlParam('rid'))) ? yield call(getDiscount, helper.getUrlParam('dsc')) : yield call(getDiscount, generalOptions.dsc);
                yield put(fetchSuccessDsc(dsc, user.info.name))
            }
        }
        
        const defaultId = generalOptions.service_ids.split(',')[0].trim();

        const tree = yield call(getTree);
        yield call(helper.putToLocalStorage, 'tree', tree);
        yield put(fetchSuccess(tree));
        yield put(setInitService(defaultId))
        yield put(fetchCurrency(currencyService(tree)))
        
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
    yield takeEvery(FETCH_INIT_TREE, fetchServiceTree);
    yield takeEvery(FETCH_SERVICE, fetchServiceSingle);
}

export default mysaga


