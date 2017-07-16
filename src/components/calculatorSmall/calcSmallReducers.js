
import {
  PLUS_PAGE,
  MINUS_PAGE,
  CHANGE_SERVICE,
  CHANGE_LEVEL,
  CHANGE_DEADLINE,
  FILTER_SERVICES,
  INPUT_PAGE_NUMBER
} from "../../store/actions";
import {currentServiceList, currentLevelList, currentDeadlineList, checkMaxPageNumber, filterServices} from "./calcLogic";


export const calcSmallReducers = (state, action, tree) => {
  switch (action.type) {

    case FILTER_SERVICES:
      const filteredServices = filterServices(state.allServices, action.search);
      return Object.assign({}, state, {
        currentServices: filteredServices
      });

    case CHANGE_SERVICE:
      const selectedService = tree.service[action.id];
      const levelList = currentLevelList(tree, action.id);
      const deadlineList = currentDeadlineList(tree, levelList[0].id);
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
