const initialState = {
  inited: false,
  tree: {},
  discount: 0.15,
  allServices: [],
  calculatorSmall: {
    pageNumber: 1,
    searchString: '',
    currentServices: [],
    currentLevels: [],
    currentDeadlines: [],
    service: {},
    level: {},
    deadline: {}
  }
};
export default initialState
