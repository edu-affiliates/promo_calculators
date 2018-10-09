import {
  PLUS_PAGE,
  MINUS_PAGE,
  CHANGE_SERVICE,
  CHANGE_LEVEL,
  CHANGE_DEADLINE,
  FILTER_SERVICES,
  INPUT_EMAIL,
  VALID_EMAIL,
  INPUT_PAGE_NUMBER,
  FETCH_CURRENCY
} from "./actions";
import {currentLevelList, currentDeadlineList, currencyService, checkMaxPageNumber, filterServices, checkEmail, checkValidEmail} from "./reducerLogic";

export const calcSmallReducers = (singleCalcState, action, tree, allServices) => {
  
  switch (action.type) {

    case FILTER_SERVICES:
      const filteredServices = filterServices(allServices, action.search);
      return Object.assign({}, singleCalcState, {
        currentServices: filteredServices
      });

    case CHANGE_SERVICE:
      const selectedService = tree.service[action.id];
      const levelList = currentLevelList(tree, action.id);
      const deadlineList = currentDeadlineList(tree, levelList[0].id);
      
      return Object.assign({}, singleCalcState, {
          currentServices: allServices,
          currentLevels: levelList,
          currentDeadlines: deadlineList,
          service: selectedService,
          level: levelList[0],
          deadline: deadlineList[0],
          pageNumber: checkMaxPageNumber(singleCalcState.pageNumber, deadlineList[0].max_pages)
      });
    case CHANGE_LEVEL:
      const selectedLevel = tree.level[action.id];
      const deadlineList2 = currentDeadlineList(tree, action.id);
      return Object.assign({}, singleCalcState, {
          currentDeadlines: deadlineList2,
          level: selectedLevel,
          deadline: deadlineList2[0],
          pageNumber: checkMaxPageNumber(singleCalcState.pageNumber, deadlineList2[0].max_pages)
      });


    case CHANGE_DEADLINE:
      const selectedDeadline = tree.deadline[action.id];
      return Object.assign({}, singleCalcState, {
          deadline: selectedDeadline,
          pageNumber: checkMaxPageNumber(singleCalcState.pageNumber, selectedDeadline.max_pages)
      });
    case INPUT_PAGE_NUMBER:
      return Object.assign({}, singleCalcState, {
          pageNumber: checkMaxPageNumber(action.number, singleCalcState.deadline.max_pages)
      });
    case INPUT_EMAIL:
      return Object.assign({}, singleCalcState, {
          email: checkEmail(action.email)
      });
    case VALID_EMAIL:
      return Object.assign({}, singleCalcState, {
        emailValid: checkValidEmail(action.emailValid)
      });
    case FETCH_CURRENCY:   
      return Object.assign({}, singleCalcState, {
        currency: checkEmail(action.currency)
      });

    case PLUS_PAGE:
      if (singleCalcState.pageNumber < singleCalcState.deadline.max_pages) {
        return Object.assign({}, singleCalcState, {
            pageNumber: singleCalcState.pageNumber + 1
        });
      } else {
        return singleCalcState
      }
    case MINUS_PAGE:
      if (singleCalcState.pageNumber > 1) {
        return Object.assign({}, singleCalcState, {
            pageNumber: singleCalcState.pageNumber - 1
        });
      } else {
        return singleCalcState;
      }
    default :
      return singleCalcState
  }
};
