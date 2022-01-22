import * as actionTypes from './../actions/playlistActionTypes';

const initState = { 
    fadeout : 10, 
    autoplay: true, 
    results: 7,
    onlyHd: false,
    apiKey: 'AIzaSyCT5YNj0WpEUrt_4K8b3GZ6NoBZTOImXMA', 
    recommended: null
}

const settings = (state = initState, action) => {
    switch(action.type) {      
        case actionTypes.SETFADEOUT:
            return { 
                ...state,
                fadeout: action.payload 
            }
        case actionTypes.SETAUTOPLAY:
            return { 
                ...state,
                autoplay: action.payload 
            }   
        case actionTypes.SETRESULTSNUMBER:
            return { 
                ...state,
                results: action.payload 
            }
        case actionTypes.SETONLYHD:
            return { 
                ...state,
                onlyHd: action.payload 
            }    
        case actionTypes.SETAPIKEY:
            return { 
                ...state,
                apiKey: action.payload 
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

export default settings;