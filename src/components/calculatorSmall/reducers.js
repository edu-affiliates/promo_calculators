import {
    PLUS_PAGE,
    MINUS_PAGE,
    CHANGE_SERVICE,
    CHANGE_LEVEL,
    CHANGE_DEADLINE,
    FETCH_SUCCESS,
    FETCH_SUCCESS_SINGLE,
    FILTER_SERVICES,
    INPUT_PAGE_NUMBER
} from './actions';
import {
    currentServiceList,
    currentLevelList,
    currentDeadlineList,
    checkMaxPageNumber,
    filterServices
} from './calcLogic'
import initialState from '../../store/initState';


export const reducers = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SUCCESS_SINGLE:
            //merge current tree and tree for single service
            const mergedServices = Object.assign({}, state.tree.service, action.tree.entities.service);
            const mergedLevels = Object.assign({}, state.tree.level, action.tree.entities.level);
            const mergedDeadline = Object.assign({}, state.tree.deadline, action.tree.entities.deadline);
            return Object.assign({}, state, {
                tree: {
                    service: mergedServices,
                    level: mergedLevels,
                    deadline: mergedDeadline
                },
            });
        case FETCH_SUCCESS:
            let services = currentServiceList(action.tree.entities);
            let levels = currentLevelList(action.tree.entities, services[0].id);
            let deadlines = currentDeadlineList(action.tree.entities, levels[0].id);
            return Object.assign({}, state, {
                inited: true,
                tree: action.tree.entities,
                allServices: services,
                currentServices: services,
                currentLevels: levels,
                currentDeadlines: deadlines,
                service: services[0],
                level: levels[0],
                deadline: deadlines[0]

            });
        case FILTER_SERVICES:
            const filteredServices = filterServices(state.allServices, action.search);
            return Object.assign({}, state, {
                currentServices: filteredServices
            });

        case CHANGE_SERVICE:
            const selectedService = state.tree.service[action.id];
            const levelList = currentLevelList(state.tree, action.id);
            const deadlineList = currentDeadlineList(state.tree, levelList[0].id);
            return Object.assign({}, state, {
                currentLevels: levelList,
                currentDeadlines: deadlineList,
                service: selectedService,
                level: levelList[0],
                deadline: deadlineList[0],
                pageNumber: checkMaxPageNumber(state.pageNumber, deadlineList[0].max_pages)
            });
        case CHANGE_LEVEL:
            const selectedLevel = state.tree.level[action.id];
            const deadlineList2 = currentDeadlineList(state.tree, action.id);
            return Object.assign({}, state, {
                currentDeadlines: deadlineList2,
                level: selectedLevel,
                deadline: deadlineList2[0],
                pageNumber: checkMaxPageNumber(state.pageNumber, deadlineList2[0].max_pages)
            });


        case CHANGE_DEADLINE:
            const selectedDeadline = state.tree.deadline[action.id];
            return Object.assign({}, state, {
                deadline: selectedDeadline,
                pageNumber: checkMaxPageNumber(state.pageNumber, selectedDeadline.max_pages)

            });
        case INPUT_PAGE_NUMBER:
            return Object.assign({}, state, {
                pageNumber: checkMaxPageNumber(action.number, state.deadline.max_pages)
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
