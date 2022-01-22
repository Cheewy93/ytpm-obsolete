import React from 'react';
import upIcon from '../../images/videoContainer/up.png'
import downIcon from '../../images/videoContainer/down.png'
import removeIcon from '../../images/videoContainer/delete.png'
import topIcon from '../../images/videoContainer/top.png'
  
import { connect } from 'react-redux';
import { nextSong} from '../../actions/mixerActions'
import { moveUp, moveDown, removeSong, toTop, playNow } from '../../actions/playlistActions'


const VideoListItem = (props) => {


  const imageUrl = props.video.snippet.thumbnails ? props.video.snippet.thumbnails.default.url : ''


  const manualOperations = () => {

    const upLabel = () => {
      if(!props.isNext) {
        return (<img className="zoom faded" src={upIcon} alt="up" onClick={() => props.moveUp(props.videoIndex)}/>)
      }
    }
  
    const downLabel = () => {
      if(!props.isLast) {
        return (<img className="zoom faded" src={downIcon} alt="down"  onClick={() => props.moveDown(props.videoIndex)}/>)
      }
    }

    const topLabel = () => {
      if(!props.isNext) {
        return (<img className="zoom faded" src={topIcon} alt="top" onClick={() => props.toTop(props.videoIndex)}/>)
      }
    }
  
    if(!props.isCurrent) {
      return (
        <table className="listOperations">
          <th> &nbsp;{topLabel()} </th>
          <th> &nbsp;{upLabel()} </th>
          <th> &nbsp;{downLabel()} </th>
          <th>&nbsp;<img className="zoom faded" src={removeIcon} alt="remove" onClick={() => props.remove(props.videoIndex)}/></th>
        </table>            
      )
    }
  }

  return (
    <li className={"list-group-item" + (props.isCurrent ? "-playing" : "")}>
      <div className="video-list media" onClick={() => props.playNow(props.videoIndex)} >
        <div className="media-left">
          <img className="media-object" alt="thumbnail" src={imageUrl} />
        </div>
        <div className="media-body">
          <div className="media-heading">{props.video.snippet.title.replace(/&quot;/g,"'").replace(/&#39;/g,"'")}
          </div>
        </div>
      </div>
      <div>{manualOperations()}</div>
    </li>
  )
};
const mapDispatchToProps = dispatch => {
  return {
    // dispatching plain actions
    moveUp: (index) => dispatch(moveUp(index)), //forica sa ovim () i generalno sa tim arrow funkcijama? 
    moveDown: (index) => dispatch(moveDown(index)),
    toTop: (index) => dispatch(toTop(index)),
    remove: (index) => dispatch(removeSong(index)),
    playNow: (index) => dispatch(playNow(index)),
  }
}

const mapStateToProps = function(state) {
  return {
    current: state.mixer.current
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(VideoListItem);