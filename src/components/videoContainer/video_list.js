import React from 'react';
import VideoListItem from './video_list_item'


const VideoList = (props) => {

  const videoItems = props.videos.map((video,index) => {
    
    if((index > props.current)) //knez no-show ;)
    {
      const isNextVideo = props.current + 1 === index
      if(video.id.videoId !== "utuTRsDa1ZI") {
        return (
          <React.Fragment>
            {/* {returnNextLabel(isNextVideo)} */}
            <VideoListItem
              key={video.etag}
              video={video}
              videoIndex={index}
              isCurrent={index === props.current}
              isLast={props.videos.length === index + 1}
              isNext={isNextVideo}
            />
          </React.Fragment>
        )
      } else {
        return (<div><br/><h6 className = "heading">Kraj playliste? Pravi trenutak za Kneza ..jer Knez nema kraj. U slučaju krajnje nužde, odaberite novi video pa klik na Next song>></h6></div>)
      }
    }
  });

  const currentVideo = () => {
    if(props.videos.length && props.videos[props.current]) {
      return (
        <VideoListItem
              video={props.videos[props.current]}
              videoIndex={props.current}
              isCurrent={true}
        />
      )
    }
  }

  return (
    <React.Fragment>    
      <h5 className="heading">Playing:</h5>
      <ul className="list-group current-video">
        {currentVideo()}
      </ul>
      <div><br/><h6 className="heading">&nbsp;Up Next: </h6></div>
      <ul className="list-group">
        {videoItems}
      </ul>
    </React.Fragment>
  )

};


export default VideoList;
