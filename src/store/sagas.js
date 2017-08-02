import {call, put, select, takeEvery, takeLatest} from 'redux-saga/effects'
import {
    FETCH_SERVICE,
    FETCH_INIT_TREE,
    FETCH_STATISTIC,
    FETCH_COUPON,
    fetchSuccess,
    fetchSuccessSingle,
    changeService,
    setInitService
} from './actions'
import generalOptions from '../config/generalOptions';
import {normalize, schema} from 'normalizr';
import Api from '../api/api';
import {helper} from '../api/helper';


// taking JSON with a schema definition
// and returning nested entities with their IDs,
// gathered in dictionaries.
const deadlineSchema = new schema.Entity('deadline');

const allServices = new schema.Entity('services');

const levelSchema = new schema.Entity('level', {
    deadline: [deadlineSchema]
});

const serviceSchema = new schema.Entity('service', {
    level: [levelSchema]
});

const treeSchema = new schema.Entity('tree', {
    services_tree: [serviceSchema]
});

const api = new Api();

function getXsrf() {
    return api.getXsrf()
        .then(
            (response) => {
                return JSON.parse(response).info.token;
            },
            (fail) => {
                console.log(fail);
            }
        );
}
function sendStats(xsrf) {
    return api.sendStats(xsrf)
        .then(
            (response) => {
                console.log(response);
            },
            (fail) => {
                console.log(fail);
            }
        );
}


function getTree(services_id = generalOptions.service_ids) {
    return api.getData(services_id)
        .then(
            (response) => {
                const treeJson = JSON.parse(response);
                const tree = normalize(treeJson['info'], treeSchema);

                return tree;
            },
            (fail) => {
                console.log(fail);
            }
        );
}
function putToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getFromLocalStorage(key) {
    const item = localStorage.getItem(key);
    if (item) return JSON.parse(item);
}

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
/**process api call for the statistic **/

function* sendStatictic() {
    try {
        if (generalOptions.apiMode === 'M') {
            const xsrf = helper.getCookie("_xsrf");
            if (!xsrf) {
                const xsrf = yield call(getXsrf);
                console.log(xsrf);
                yield call(sendStats, xsrf);
                helper.setCookie('_xsrf', xsrf, 13);
            } else {
                yield call(sendStats, xsrf);
            }
        }
    } catch (e) {
    }

}
/**process api call for the coupon **/

function* checkCoupon() {

}

/**process api call for the initial state **/
function* fetchServiceTree(action) {
    try {
        const treeLocalStorage = yield call(getFromLocalStorage, 'tree');
        const defaultId = generalOptions.service_ids.split(',')[0].trim();
        if (treeLocalStorage) {
            yield put(fetchSuccess(treeLocalStorage));
            yield put(setInitService(defaultId));
        } else {
            const tree = yield call(getTree);

            yield call(putToLocalStorage, 'tree', tree);
            yield put(fetchSuccess(tree));
            yield put(setInitService(defaultId));
        }

    } catch (e) {
        yield put({type: "USER_FETCH_FAILED", message: e.message});
        console.log(e);
    }
}

/**process api call for the selected service **/
function* fetchServiceSingle(action) {
    try {
        const currentTree = yield  select((state) => state.tree);
        if (currentTree.service[action.id]) {
            yield put(changeService(action.id, action.calcId));
        } else {
            const tree = yield call(getTree, action.id);
            // console.log(tree);
            yield put(fetchSuccessSingle(tree, action.id));
            yield put(changeService(action.id, action.calcId));
        }
    } catch (e) {
        yield put({type: "USER_FETCH_FAILED", message: e.message});
    }
}

/*
 Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
 Allows concurrent fetches of user.
 */
function* mysaga() {
    yield takeEvery(FETCH_STATISTIC, sendStatictic);
    yield takeEvery(FETCH_COUPON, checkCoupon);
    yield takeEvery(FETCH_INIT_TREE, fetchServiceTree);
    yield takeEvery(FETCH_SERVICE, fetchServiceSingle);
}

export default mysaga;

//
// //set to cookie discount from generalOptions
// if (!generalOptions.dev_mode && !helper.getCookie('dsc') && !!generalOptions.dsc) {
//     helper.setCookie('dsc', generalOptions.dsc, 90);
//     generalOptions.dsc = '';
// }
//
// //set to cookie discount from URL params
// if (this.params['dsc']) {
//     helper.setCookie('dsc', this.params['dsc'], 90);
// }
//
// //set to myDefault segment_id from generalOptions
// if (!!generalOptions.segment_id) {
//     this.myDefault.segment_id = generalOptions.segment_id;
// }
//
// if (generalOptions.apiMode === 'M') {
//     if (!helper.getCookie("_xsrf")) {
//         this.getXsrf().done(response => {
//             helper.setCookie('_xsrf', JSON.parse(response).info.token, 13);
//             this.myDefault._xsrf = JSON.parse(response).info.token;
//             this.sendStats();
//         });
//     } else {
//         this.myDefault._xsrf = helper.getCookie("_xsrf");
//         this.sendStats();
//
//     }
//
// }
