let defaultState = {
    selected: {},
}

const global = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET-SELECTED':
            return{
                ...state,
                selected:action.payload,
            }
        
        default:        
            return state;
    }
}

export default global;