import * as actionTypes from './../actions/playlistActionTypes';

export const setFadeOut = (seconds) => {
    return {
        type: actionTypes.SETFADEOUT,
        payload: seconds
    }
}

export const setAutoplay = (value) => {
    return {
        type: actionTypes.SETAUTOPLAY,
        payload: value
    }
}

export const setNumberOfResults = (number) => {
    return {
        type: actionTypes.SETRESULTSNUMBER,
        payload: number
    }
}

export const setOnlyHd = (value) => {
    return {
        type: actionTypes.SETONLYHD,
        payload: value
    }
}

export const setApiKey = (key) => {
    return {
        type: actionTypes.SETAPIKEY,
        payload: key
    }
}

export const addRecommended = (recommended) => {
    return  {
        type: actionTypes.ADDRECOMMENDED,
        payload: recommended
    }      
}