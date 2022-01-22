import React from 'react';
import { connect } from 'react-redux';

import YtPlayer from '../ytplayer'
import SearchField from '../searchField'
import VideoList from '../videoContainer/video_list'

import logo from '../../images/ytcontainer/logo.png'
import reset from '../../images/ytcontainer/reset.png'
import shuffle from '../../images/ytcontainer/shuffle.png'

import { useDispatch } from 'react-redux';
import { resetPlaylist, shufflePlaylist } from '../../actions/playlistActions'
import { nextSong } from '../../actions/mixerActions'
import SettingsContainer from '../settingsContainer';


 function YtContainer(props) {

    const dispatch = useDispatch()  
    const isLastSong = props.videos.length <= props.mixer.current + 1;
    const isOver = props.videos.length === props.mixer.current    
    const currentVideoId = props.videos.length < 1 || isOver ? null :  props.videos[ props.mixer.current].id.videoId
    const nextVideoId = isLastSong ? null :  props.videos[ props.mixer.current + 1].id.videoId //wont return iLS next time ;)

    const renderVideo = (isFirst) => {

        const playingVideo = (isFirst && props.mixer.first) || (!isFirst && !props.mixer.first)
        const videoId = playingVideo ? currentVideoId : nextVideoId

        return(
            <div align="center"  padding-top="30px" className={playingVideo ? "present addedPadding" : "hidden addedPadding"}> 
                        <YtPlayer 
                            videoId={videoId} 
                            shouldPlay={playingVideo} 
                        />
            </div>
        )
    }

    
    return (                     
            <table className="main-table">
                <tr>
                    <img src={logo} width="400" heigth="64" alt="logo"/>
                </tr>
                <tr>
                    <th width='30%' valign="top" margin-top="20">
                        <SearchField currentVideoId={currentVideoId}/>
                    </th>
                    <th width='40%' valign="top" align="center">
                            {renderVideo(true)}
                            {renderVideo(false)} 
                        <div className="centerisedDiv">                       
                            <button disabled={isLastSong || isOver} className="button buttonNext" onClick={() => dispatch(nextSong())}>Next song >></button>
                        </div>
                        <div >                       
                            <SettingsContainer/>
                        </div>
                    </th>
                    <th width='30%' valign="top" margin-top="20">
                        <div className='playlist-container'>
                            <VideoList videos={props.videos} current={ props.mixer.current}/>
                        </div>
                        <br/>
                        <div align="center">
                            <button className="button" onClick={() => dispatch(resetPlaylist())}><img src={reset} alt="reset"/>
                                &nbsp;Reset playlist
                            </button>
                            <button className="button" onClick={() => dispatch(shufflePlaylist(props.mixer.current))}><img src={shuffle} alt="shuffle"/>
                                &nbsp;Shuffle playlist
                            </button>
                        </div>                           
                    </th>
                </tr>                  
            </table>

    );
    
}


const mapStateToProps = function(state) {
    return {
      videos: state.playlist,
      mixer: state.mixer
    }
}


export default connect(mapStateToProps)(YtContainer);