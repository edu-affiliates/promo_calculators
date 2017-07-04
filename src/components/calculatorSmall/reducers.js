/**
 * Created by nadiadaliavska on 7/1/17.
 */

import {PLUS_PAGE, MINUS_PAGE, CHANGE_SERVICE} from './actions';
import {normalize, schema} from 'normalizr';
import {serviceTree} from './serviceTree';

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
console.log(normalizedTree);

const currentService = (initServiceID = '2185') => {
    return normalizedTree.entities.service[initServiceID];
};

const currentLevel = (initLevelID = '8496') => {
    return normalizedTree.entities.level[initLevelID];
};
const currentDeadline = (initDeadlineID = '67595') => {
    return normalizedTree.entities.deadline[initDeadlineID];
};

const initialState = {
    pageNumber: 1,
    tree: normalizedTree.entities,
    discount: 0.85,
    currentLevels: [],
    currentDeadlines: [],
    current: {
        service: currentService(),
        level: currentLevel(),
        deadline: currentDeadline()
    }
};


export const changeService = (state = initialState, action) => {
    switch (action.type) {

    }
};


export const changePageNumber = (state = initialState, action) => {
    switch (action.type) {
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
            }
        default :
            return state
    }
};
// export default changePageNumber;