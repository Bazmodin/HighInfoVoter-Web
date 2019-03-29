const initState = {
    district: '',
    state: ''
}

const rootReducer = (state = initState, action) => {
    if (action.type === 'ADD_DISTRICT') {
        return {
            ...state,
            district: action.district
        }
    }
    if (action.type === 'ADD_STATE') {
        return {
            ...state,
            state: action.state
        }
    }
    if (action.type === 'ADD_PAK') {
        return {
            ...state,
            pak: action.pak
        }
    }
    else {
        return {
            ...state
        }
    }
}

export default rootReducer;