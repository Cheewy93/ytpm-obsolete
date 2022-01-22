import * as actionTypes from './../actions/playlistActionTypes';

export const addSong = (video) => {
    return {
        type: actionTypes.ADD,
        payload: video
    }
}

export const removeSong = (index) => {
    return {
        type: actionTypes.REMOVE,
        payload: index
    }
}

export const moveUp = (index) => {
    return {
        type: actionTypes.MOVEUP,
        payload: index
    }
}

export const moveDown = (index) => {
    return {
        type: actionTypes.MOVEDOWN,
        payload: index
    }
}



export function toTop(index) { //??????
    return (dispatch, getState) => {
        const { mixer } = getState();   
        
        dispatch({
            type: actionTypes.TOTOP,
            payload: { index, mixer } //pih
        });
      };      
}


export const addPlaylist = (playlist) => {
    return {
        type: actionTypes.ADDPLAYLIST,
        payload: playlist
    }
}

export const trickShot = () => {
    return {
        type: actionTypes.TRICKSHOT
    }
}

export const resetPlaylist = () => {
    return {
        type: actionTypes.RESET
    }
}

export const shufflePlaylist = () => {
    return (dispatch, getState) => {
        const { mixer } = getState();   
        
        dispatch({
            type: actionTypes.SHUFFLE,
            payload: mixer //pih
        });
      }; 
}

export const playNow = (index) => {
    return (dispatch, getState) => {
        dispatch(toTop(index))        
        dispatch({ type: actionTypes.NEXTSONG })
    };
}

export const prepare = (video) => {
    return (dispatch, getState) => {
        const { mixer } = getState();   
        
        dispatch({
            type: actionTypes.ADDTOTOP,
            payload: {video, mixer} //pih
        });
    };
}

export const playDirect = (video) => {
    return (dispatch, getState) => {      
        dispatch(prepare(video))      
        dispatch({ type: actionTypes.NEXTSONG })
    };
}


