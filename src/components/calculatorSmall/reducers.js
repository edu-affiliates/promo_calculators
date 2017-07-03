/**
 * Created by nadiadaliavska on 7/1/17.
 */

import {PLUS_PAGE, MINUS_PAGE} from './actions'

const initialState = {
    pageNumber: 1
};

export const changePageNumber = (state = initialState, action) => {
    switch (action.type) {
        case PLUS_PAGE:
            return Object.assign({}, state, {
                pageNumber: state.pageNumber + 1
            });
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