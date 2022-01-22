import * as actionTypes from './../actions/playlistActionTypes';

export const nextSong = () => {

    return (dispatch, getState) => {
        const { settings, mixer, playlist } = getState();

        if(playlist.length === mixer.current + 1) {
            //dispatch({type: actionTypes.REPLAY});
            if(settings.autoplay) { 
                dispatch({
                    type: actionTypes.ADD,
                    payload: settings.recommended 
                }) 
                dispatch({ type: actionTypes.NEXTSONG })
            } else {
                dispatch({ type: actionTypes.REPLAY })
            }
        }
        else
            dispatch({type: actionTypes.NEXTSONG});
      };
}


