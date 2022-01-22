import React from 'react';
import { connect } from 'react-redux';
import { addSong, prepare, playDirect } from '../../actions/playlistActions'

import imgPlay from '../../images/searchField/playnow.png'
import imgPrepare from '../../images/searchField/prepare.png'


const SearchResultsItem = (props) => {


  const imageUrl = props.video.snippet.thumbnails ? props.video.snippet.thumbnails.default.url : ''

  return (
    <li className="list-group-item">
      <div className="video-list media" onClick={() => props.addSong(props.video)}>
        <div className="media-left">
          <img className="media-object" alt ="search result item" src={imageUrl} />
        </div>
        <div className="media-body">
          <div className="media-heading">{props.video.snippet.title.replace(/&quot;/g,"'").replace(/&#39;/g,"'")}
          </div>
        </div>
      </div>
        {/* <img src={imgPrepare} alt="Prepare!" className="listOperations faded" onClick={() => props.initState ? props.addSong(props.video) :  props.prepare(props.video)}/>
        <img src={imgPlay} alt="Play Now!" className="playNowIcon" onClick={() =>  props.initState ? props.addSong(props.video) : props.playDirect(props.video)}/>
       */}
       <button alt="Prepare!" className="listOperations faded link smaller" onClick={() => props.initState ? props.addSong(props.video) :  props.prepare(props.video)}>BRING TO TOP</button>
        <button alt="Play Now!" className="playNowIcon link" onClick={() =>  props.initState ? props.addSong(props.video) : props.playDirect(props.video)}>PLAY NOW</button>
      
    </li>
  )
};

const mapStateToProps = function(state) {
  return {
    initState: state.playlist.length == 0
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addSong: (video) => dispatch(addSong(video)), 
    prepare: (video) => dispatch(prepare(video)),
    playDirect: (video) => dispatch(playDirect(video))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(SearchResultsItem);
