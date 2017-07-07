/**
 * Created by nadiadaliavska on 7/1/17.
 */

import {PLUS_PAGE, MINUS_PAGE, CHANGE_SERVICE, CHANGE_LEVEL, CHANGE_DEADLINE, FETCH_SUCCESS} from './actions';
import {
    currentService,
    currentServiceList,
    currentLevelList,
    currentLevel,
    currentDeadlineList,
    currentDeadline,
    checkMaxPageNumber
} from './calcLogic'


const initialState = {
    inited: false,
    pageNumber: 1,
    tree: {},
    discount: 0.15,
    currentServices: [],
    currentLevels: [],
    currentDeadlines: [],
    service: {},
    level: {},
    deadline: {}

};


// export const changeService = (state = initialState, action) => {
//     switch (action.type) {
//     }
// };


export const reducers = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SUCCESS:
            return Object.assign({}, state, {
                inited: true,
                tree: action.tree.entities,
                currentServices: currentServiceList(action.tree.entities),
                currentLevels: currentLevelList(action.tree.entities),
                currentDeadlines: currentDeadlineList(action.tree.entities),
                service: currentService(action.tree.entities),
                level: currentLevel(action.tree.entities),
                deadline: currentDeadline(action.tree.entities)

            });
        case CHANGE_SERVICE:
            const selectedService = state.tree.service[action.id];
            return Object.assign({}, state, {
                currentLevels: currentLevelList(state.tree, action.id),
                currentDeadlines: currentDeadlineList(state.tree),
                service: selectedService,
                level: currentLevel(state.tree),
                deadline: currentDeadline(state.tree),
                pageNumber: checkMaxPageNumber(state.pageNumber, currentDeadline(state.tree).max_pages)
            });
        case CHANGE_LEVEL:
            const selectedLevel = state.tree.level[action.id];
            return Object.assign({}, state, {
                currentDeadlines: currentDeadlineList(state.tree, state.service, action.id),
                level: selectedLevel,
                deadline: currentDeadline(state.tree),
                pageNumber: checkMaxPageNumber(state.pageNumber, currentDeadline(state.tree).max_pages)
            });


        case CHANGE_DEADLINE:
            const selectedDeadline = state.tree.deadline[action.id];
            return Object.assign({}, state, {
                deadline: selectedDeadline,
                pageNumber: checkMaxPageNumber(state.pageNumber, selectedDeadline.max_pages)

            });

        case PLUS_PAGE:
            if (state.pageNumber < state.deadline.max_pages) {
                return Object.assign({}, state, {
                    pageNumber: state.pageNumber + 1
                });
            } else {
                return state
            }
        case MINUS_PAGE:
            if (state.pageNumber > 1) {
                return Object.assign({}, state, {
                    pageNumber: state.pageNumber - 1
                });
            } else {
                return state;
            }
        default :
            return state
    }
};
// export default reducers;