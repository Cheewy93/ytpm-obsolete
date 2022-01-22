import {combineReducers} from 'redux';
import mixerReducer from './mixerReducer';
import playlistReducer from './playlistReducer';
import settingsReducer from './settingsReducer';

export default combineReducers({
    mixer: mixerReducer,
    playlist: playlistReducer,
    settings: settingsReducer
})