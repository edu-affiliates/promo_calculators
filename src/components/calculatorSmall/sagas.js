/**
 * Created by nadiadaliavska on 7/4/17.
 */
import {call, put, takeEvery, takeLatest} from 'redux-saga/effects'
import {FETCH_SERVICE, FETCH_INIT_TREE, fetchSuccess} from './actions'
// import Api from '...'
import {normalize, schema} from 'normalizr';
import {serviceTree} from './serviceTree';

// taking JSON with a schema definition
// and returning nested entities with their IDs,
// gathered in dictionaries.
const deadlineSchema = new schema.Entity('deadline');

const levelSchema = new schema.Entity('level', {
    deadline: [deadlineSchema]
});

const serviceSchema = new schema.Entity('service', {
    level: [levelSchema]
});

const treeSchema = new schema.Entity('tree', {
    services_tree: [serviceSchema]
});

const normalizedTree = normalize(serviceTree['info'], treeSchema);


function api() {
    //TODO use fetch api instead of jquery ajax
}
// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchServiceTree(action) {
    try {
        const tree = yield call(normalize, serviceTree['info'], treeSchema);
        console.log(tree);
        yield put(fetchSuccess(tree));
    } catch (e) {
        yield put({type: "USER_FETCH_FAILED", message: e.message});
    }
}
function* fetchService(action) {

}

/*
 Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
 Allows concurrent fetches of user.
 */
function* mysaga() {
    yield takeEvery(FETCH_INIT_TREE, fetchServiceTree);
    // yield takeEvery(FETCH_SERVICE, fetchService)
}

export default mysaga;