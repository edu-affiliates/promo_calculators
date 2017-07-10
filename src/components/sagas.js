import {call, put, select, takeEvery, takeLatest} from 'redux-saga/effects'
import {
    FETCH_SERVICE,
    FETCH_INIT_TREE,
    fetchSuccess,
    fetchSuccessSingle,
    changeService
} from './calculatorSmall/actions'
import generalOptions from './generalOptions'
import {getData} from './dataFactory';
import {normalize, schema} from 'normalizr';
import {Api} from './apiScript';

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

new Api();
function api(services_id = generalOptions.service_ids) {
    return getData(services_id)
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
/**process api call for the initial state **/
function* fetchServiceTree(action) {
    try {
        const treeLocalStorage = yield call(getFromLocalStorage, 'tree');
        if (treeLocalStorage) {
            yield put(fetchSuccess(treeLocalStorage));
        } else {
            const tree = yield call(api);
            yield call(putToLocalStorage, 'tree', tree);
            yield put(fetchSuccess(tree));
        }

    } catch (e) {
        yield put({type: "USER_FETCH_FAILED", message: e.message});
        console.log(e);
    }
}

/**process api call for the selected service **/
function* fetchService(action) {
    try {
        const currentTree = yield  select((state) => state.tree);
        if (currentTree.service[action.id]) {
            yield put(changeService(action.id));
        } else {
            const tree = yield call(api, action.id);
            // console.log(tree);
            yield put(fetchSuccessSingle(tree, action.id));
            yield put(changeService(action.id));
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
    yield takeEvery(FETCH_INIT_TREE, fetchServiceTree);
    yield takeEvery(FETCH_SERVICE, fetchService)
}

export default mysaga;