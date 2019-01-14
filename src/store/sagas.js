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
            const xsrf = helper.getCookie('_xsrf');
            const email = helper.getCookie('email').slice(1, helper.getCookie('email').length - 1);
            const email_storage = (helper.getFromLocalStorage('user')) ? helper.getFromLocalStorage('user').info.email : null;
            const sub_domain = document.referrer.split('/')[2];
            let user = null;
            //document.referrer

            if (xsrf) {
                yield call(sendStats, stats, xsrf);
                
                if (email) {
                    for (let i=0; i<25; i++) {
                        yield put(handleInputEmail(email, i));
                    }
                } else if (email_storage) {
                    for (let i=0; i<25; i++) {
                        yield put(handleInputEmail(email_storage, i));
                    }
                }

                if (sub_domain === 'my.' + generalOptions.hostname || sub_domain === 'devmy.' + generalOptions.hostname) {
                    user = yield call(getUserCheckAccess);     
                    
                    yield call(helper.putToLocalStorage, 'user', user);

                    for (let i=0; i<25; i++) {
                        yield put(handleInputEmail(user.info.email, i));
                    }
                }

            } else {
                user = yield call(getUserCheckAccess);

                // helper.setCookie('_xsrf', user.info.token, ''); // for local development
                
                yield call(sendStats, stats, user.info.token);
                yield call(helper.putToLocalStorage, 'user', user);

                for (let i=0; i<25; i++) {
                    yield put(handleInputEmail(user.info.email, i));
                }
            }

            if (generalOptions.dsc) {
                const dsc = (helper.getUrlParam('dsc') && helper.isFakeAccount(helper.getUrlParam('rid'))) ? yield call(getDiscount, helper.getUrlParam('dsc')) : yield call(getDiscount, generalOptions.dsc);
                yield put(fetchSuccessDsc(dsc, ''))
            }
        }

        if (generalOptions.apiMode === 'C') {
            if (generalOptions.static_dsc) {
                const dsc = generalOptions.static_dsc / 100;
                yield put(fetchSuccessDsc(dsc, ''))
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


