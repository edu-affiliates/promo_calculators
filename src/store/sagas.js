import {call, put, select, takeEvery, takeLatest} from 'redux-saga/effects'
import {
    FETCH_SERVICE,
    FETCH_INIT_TREE,
    FETCH_STATISTIC,
    FETCH_COUPON,
    fetchSuccess,
    fetchSuccessSingle,
    fetchSuccessDsc,
    changeService,
    setInitService
} from './actions'
import generalOptions from '../config/generalOptions';
import {normalize, schema} from 'normalizr';
import {fetchXsrf, fetchStats, fetchData, fetchCoupon} from '../api/api';
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


function getStats() {
    const urlParams = window.location.search.replace('?', '').split('&').reduce(function (p, e) {
            let pair = e.split('=');
            let key = decodeURIComponent(pair[0]);
            let value = decodeURIComponent(pair[1]);
            p[key] = (pair.length > 1) ? value : '';
            return p;
        }, {}
    );
    const clientParams = {
        segment_id: generalOptions.segment_id,
        rid: generalOptions.rid,
        referrer_url: document.referrer,
        origin_url: window.location.protocol + "//" +
        window.location.host +
        window.location.pathname +
        window.location.search +
        window.location.hash
    };
    return Object.assign({}, clientParams, urlParams);

};

const stats = getStats();

function сookieCoupon() {
    //set to cookie discount from generalOptions
    if (!generalOptions.dev_mode && !helper.getCookie('dsc') && !!generalOptions.dsc) {
        helper.setCookie('dsc', generalOptions.dsc, 90);
        generalOptions.dsc = '';
    }
    //set to cookie discount from URL params
    if (stats['dsc']) {
        helper.setCookie('dsc', params['dsc'], 90);
    }
    return helper.getCookie('dsc');
}
function checkCoupon(coupon) {
    fetchCoupon(coupon)
        .then(
            (response) => {
                return JSON.parse(response).info.discount_amount;
            },
            (fail) => {
            }
        )

}

function getXsrf() {
    return fetchXsrf()
        .then(
            (response) => {
                return JSON.parse(response).info.token;
            },
            (fail) => {
                console.log(fail);
            }
        );
}


function getTree(services_id = generalOptions.service_ids) {
    return fetchData(services_id)
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


// worker Saga: will be fired on USER_FETCH_REQUESTED actions
/**process api call for the statistic **/

function* sendStatictic() {
    try {
        if (generalOptions.apiMode === 'M') {
            const xsrf = helper.getCookie("_xsrf");
            if (!xsrf) {
                const xsrf = yield call(getXsrf);
                yield call(fetchStats, stats, xsrf);
                helper.setCookie('_xsrf', xsrf, 13);
            } else {
                yield call(fetchStats, stats, xsrf);
            }
        }
    } catch (e) {
    }

}
/**process api call for the coupon **/

function* checkCoupon() {
    try {
        const coupon = сookieCoupon();
        if (coupon) {
            const dsc = yield call(checkCoupon, coupon);
            yield put(fetchSuccess(dsc));

        }
    }
    catch (e) {
    }
}

/**process api call for the initial state **/
function* fetchServiceTree(action) {
    try {
        const treeLocalStorage = yield call(helper.getFromLocalStorage, 'tree');
        const defaultId = generalOptions.service_ids.split(',')[0].trim();
        if (treeLocalStorage) {
            yield put(fetchSuccessDsc(treeLocalStorage));
            yield put(setInitService(defaultId));
        } else {
            const tree = yield call(getTree);

            yield call(helper.putToLocalStorage, 'tree', tree);
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

