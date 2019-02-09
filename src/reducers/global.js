let defaultState = {
    selectedSpot: "",
}

const global = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET-SELECTED':
            return{
                ...state,
                selectedSpot:action.payload,
            }
        default:        
            return state;
    }
}

export default global;