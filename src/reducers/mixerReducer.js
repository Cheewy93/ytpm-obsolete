import * as actionTypes from './../actions/playlistActionTypes';

const initState = { first : true, current: 0, recommended: null }

const mixer = (state = initState, action) => {
    switch(action.type) {      
        case actionTypes.NEXTSONG:
            return { 
                ...state,
                first: !state.first, 
                current: state.current + 1 
            }
        case actionTypes.REPLAY:
        console.log('OPAA')    
        return {
                ...state,
                first: !state.first, //if does not work, just set true
                current: 0
            }
        case actionTypes.ADDRECOMMENDED:
                return {
                    ...state,
                    recommended: action.payload
                }        
        default: 
            return state;
    }
}

export default mixer;