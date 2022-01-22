import * as actionTypes from './../actions/playlistActionTypes';

const playlist = (state = [], action) => { //DIFF between this and function playlist(....) {} ?
    switch(action.type) {   
        case actionTypes.ADD: 
            return addVideo(state,action.payload)
        case actionTypes.REMOVE: 
            return removeVideo(state, action.payload)
        case actionTypes.MOVEUP:
            return changeOrder(state, action.payload, true)
        case actionTypes.MOVEDOWN:
            return changeOrder(state, action.payload, false)
        case actionTypes.TOTOP: 
            return toTheTop(state, action.payload.index, action.payload.mixer.current)
        case actionTypes.PLAYNOW: 
            return playNow(state, action.payload.index, action.payload.current)
        case actionTypes.ADDTOTOP: 
            return addToTop(state, action.payload.video, action.payload.mixer.current)
        case actionTypes.ADDPLAYLIST: 
            return addPlaylist(state,action.payload)
        case actionTypes.TRICKSHOT: 
            return trickShot(state);
        case actionTypes.SHUFFLE:
            return shufflePlaylist(state,action.payload.current)
        case actionTypes.RESET:
            return reset(state);
        default: 
            return state;
     
    }
}


const addVideo = (state,video) => {
    const videos = state;
    videos.push(video)
    return Object.assign([], state, videos)
}

const addToTop = (state,video,current) => {
    const videos = state;
    videos.splice(current + 1,0,video)
    return Object.assign([], state, videos);
}

const addPlaylist = (state,playlist) => {
    const videos = state.concat(playlist);
    return Object.assign([], state, videos);
}

const trickShot = (state) => {
    const videos = state;
    videos.push({id : { videoId : "utuTRsDa1ZI"}})
    return Object.assign([], state, videos);
}

const changeOrder = (state,index,isUp) => {    
    const videos = state;
    const temp = videos[index];

    if(isUp) {
        videos[index] = videos[index - 1]
        videos[index - 1] = temp
    } else {
        videos[index] = videos[index + 1]
        videos[index + 1] = temp
    }
    return Object.assign([], state, videos);
}

const removeVideo = (state,index) => {
    var videos = state;
    videos.splice(index,1)
    return Object.assign([], state, videos);
}

const toTheTop = (state, index, current) => {
    
    const videos = state;
    const video = videos[index];
    videos.splice(index,1)
    videos.splice(current + 1,0,video)
    return Object.assign([], state, videos);
}

const playNow = (state, index, mixer) => {
    const videos = state;
    const video = videos[index];
    videos.splice(index,1)
    videos.splice(mixer.current,0,video)
    return Object.assign([], state, videos);
}

const reset = (state) => {
    let c = window.confirm('Are you sure you want to reset the playlist?')
        if(c) {
            localStorage.removeItem('persist:rootYTPM') 
            window.location.reload();       
        }
        return state;
}


const shuffle = (array) => {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}

const shufflePlaylist = (state,current) => {
    const ar = state;
    const next = ar.splice(current+1)
    const nextShuffled = shuffle(next)
    const videos = ar.concat(nextShuffled);
    return Object.assign([], state, videos);
}

export default playlist;