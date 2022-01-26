const initialState = {
    labelData: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
              case 'SET_LABEL_DATA':
            return {
                ...state,
                labelData: action.payload,
            }
        default:
            return state;
    }
}
export default reducer;