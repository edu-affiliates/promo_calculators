/**
 * Created by nadiadaliavska on 7/1/17.
 */

import {PLUS_PAGE, MINUS_PAGE, CHANGE_SERVICE, FETCH_SUCCESS} from './actions';


const currentService = (normalizedTree, initServiceID = '2185') => {
    return normalizedTree.entities.service[initServiceID];
};

const currentLevel = (normalizedTree, initLevelID = '8496') => {
    return normalizedTree.entities.level[initLevelID];
};
const currentDeadline = (normalizedTree, initDeadlineID = '67595') => {
    return normalizedTree.entities.deadline[initDeadlineID];
};

const currentServiceList = (normalizedTree) => {
    return normalizedTree.entities.tree.undefined.services;
};

const currentLevelList = (normalizedTree, initServiceID = '2185') => {
    const levelID = normalizedTree.entities.service[initServiceID].level;
    console.log(levelID);
    return normalizedTree.entities.service[initServiceID].level;

};

const initialState = {
    inited: false,
    pageNumber: 1,
    tree: {},
    discount: 0.85,
    currentServices: {},
    currentLevels: {},
    currentDeadlines: [],
    current: {
        service: {},
        level: {},
        deadline: {}
    }
};


export const changeService = (state = initialState, action) => {
    switch (action.type) {

    }
};


export const changePageNumber = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SUCCESS:
            return Object.assign({}, state, {
                inited: true,
                tree: action.tree,
                currentServices: currentServiceList(action.tree),
                currentLevels: currentLevelList(action.tree),
                currentDeadlines: [],
                current: {
                    service: currentService(action.tree),
                    level: currentLevel(action.tree),
                    deadline: currentDeadline(action.tree)
                }
            });
        case CHANGE_SERVICE:
            const serviceID = action.id;
            const selectedService = state.tree.service[serviceID];
            const levelsID = selectedService.level;
            let levels = levelsID.map((levelID) => {
                return state.tree.level[levelID];
            });
            levels = levels.sort((a, b) => {
                return parseInt(a.order) - parseInt(b.order);
            });
            const selectedLevel = levels[0];

            const deadlineID = selectedLevel.deadline;
            let deadlines = deadlineID.map((deadlineID) => {
                return state.tree.deadline[deadlineID];
            }).reverse();

            const selectedDeadline = deadlines[0];

            return Object.assign({}, state, {
                currentLevels: levels,
                currentDeadlines: deadlines,
                current: {
                    service: selectedService,
                    level: selectedLevel,
                    deadline: selectedDeadline
                }
            });
        case PLUS_PAGE:
            if (state.pageNumber < state.current.deadline.max_pages) {
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
// export default changePageNumber;