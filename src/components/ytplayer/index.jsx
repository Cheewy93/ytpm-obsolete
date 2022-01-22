import React, { Component } from 'react';
import YouTube from 'react-youtube';
import { nextSong } from '../../actions/mixerActions';
import { trickShot, removeSong } from '../../actions/playlistActions'
import { connect } from 'react-redux';


class YtPlayer extends Component {

    //Video starts when it recieves SHOULD PLAY == TRUE
    //ON Next Video / on natural end (10 seconds prior to end) >>
    //Video starts to slow down and recieves NEXT ID (but does not update yet, to be able to finish slow-down)
    //When video ends (with slowing down), it UPDATES, but still waits (as SoludPlay is FALSE)
    //When video recieves SHOULD PLAY, it plays (with already set-up parameters)


    //video has no next song? gets ''
    //next song arrives (before preparing for next) >> updates videoId (still no play as SHOULD-PLAY is still false) 
    //when it is about to prepare for next >> change >> get SHOULD-PLAY >> it gets KNEZ with Should Play as well (KNEZ added to list prior to update state)

    constructor(props) {
        super(props);
        this.player = null;
        this.startingAt = this.props.seconds;
        this.playing = false;
    }   

    _onPlayerReady = (event) => {
       
        this.playing = false;
        var player = event.target;
        this.player = player;
        if(this.props.shouldPlay && this.props.videoId)
        { //prevent starting video when it updates
            this.videoStarter()
        } 
    }

    _onError = (event) => {
        console.log(event)
        if (event.data === 150) {
            this.props.removeSong(this.props.current)
        }
    }

    videoStarter = () => {
        //must pass player like this since componentDidUpdate would not know what to send if we have (event) props
        
        var player = this.player;
        player.setVolume(1);
        let fadeout = this.props.fadeout;
        let increaseRate = 100/fadeout;
        player.playVideo(); 
        
        var starterId = window.setInterval(
            () => 
            {
                player.setVolume(player.getVolume() + increaseRate)
                if(player.getVolume() === 100 || player.getCurrentTime() >= fadeout) {
                    if(player.getCurrentTime() >= fadeout)
                        player.setVolume(100)
                    window.clearInterval(starterId);  
                }               
            }, 
        1000);
    }

    _onVideoPlay = (event) => {       
        //to prevent double-initializing timers (since onPlay is triggered even when a video is fast-forwarded )
        
        if(!this.playing) { //check if video is playing
            this.playing = true;
            this.setDurationMonitor(event.target)
        }       
    }

    setDurationMonitor = (player) => {
        this.monitorID = setInterval(
            () => 
            {
                if(player.getDuration() - player.getCurrentTime() < this.props.fadeout) {
                    this.props.nextSong();                                   
                };
            },
            1000
        );
    }

    fadeOut = () => {
        window.clearInterval(this.monitorID);       
        this.playing = false;
        this.decreaseVolume();        
    }

    decreaseVolume = () => {       
        let fadeout = this.props.fadeout;
        let decreaseRate = 100/fadeout;
        this.decreaseId = window.setInterval(
            () =>
            {
                this.player.setVolume(this.player.getVolume() - decreaseRate)
                if(this.player.getVolume() < decreaseRate) {
                    this.player.seekTo(this.player.getDuration())
                }
            }, 1000);
    }

    changer = () => {
        this.props.changeVid();
    }

    //GAME-CHANGER!!!
    //prevent from updating if it only being prepared (recieved props for the next video but still should not play)
    //if NEXT proops tells us we should NOT play, that means we are reaching the end (thus we avoid update)
    shouldComponentUpdate(nextProps, nextState) { 
        if(this.props.shouldPlay && !nextProps.shouldPlay)  //received info that it should NOT play anymore
            this.fadeOut();
        return nextProps.shouldPlay && !this.props.shouldPlay // || this.player.getPlayerState() != 1
    }

    getSnapshotBeforeUpdate() {        
        clearInterval(this.decreaseId);
        clearInterval(this.monitorID);
        clearInterval(this.starterId); //consider this on component will unmount  
    }

    _onEnd = (event) => {
        clearInterval(this.decreaseId);
        this.updateNextVideo()
    }

    updateNextVideo = () => {
        this.forceUpdate();
    }

    //catch update when (only) shouldPlay changes - meaning that the video should slowly start
    //this is where videoId actually gets updated! 
    componentDidUpdate() {     
        //here set playing to false
        this.startingAt = 0;
        if(this.props.shouldPlay && this.player.getPlayerState() !== 1) {//start if SHOULD PLAY recieved
            this.videoStarter()
        }
    }

    saveCurrentTime = () => {
        console.log('CALLED SAVE')
        if(this.props.shouldPlay) {
            this.player.seekTo(this.props.seconds)
        }
        return true;
    }

    // componentDidMount() {
    //     if(this.props.shouldPlay) {
    //         this.player.seekTo(this.props.seconds)
    //     }
    // }

    render() {
        const opts = {
          height: '440',
          width: '722',
          playerVars: {  //https://developers.google.com/youtube/player_parameters
            autoplay: this.props.shouldPlay && this.props.videoId ? 1 : 0,        
            start: this.startingAt
          }
        };
        return (
            <React.Fragment>
                    <YouTube
                        videoId={this.props.videoId}
                        id={'vid'}
                        opts={opts}
                        onPlay={this._onVideoPlay}
                        onReady={this._onPlayerReady}
                        //onPause={this._onPause}
                        onEnd={this._onEnd}
                        onError={this._onError}
                    />
          </React.Fragment>
        );
    }   
}

const mapStateToProps = function(state) {
    return {
      current: state.mixer.current,
      fadeout: state.settings.fadeout
    }
}

const mapDispatchToProps = dispatch => {
    return {
      // dispatching plain actions
      nextSong: () => dispatch(nextSong()), //forica sa ovim () i generalno sa tim arrow funkcijama? 
      trickShot: () => dispatch(trickShot()),
      removeSong: (index) => dispatch(removeSong(index))
    }
  }
  


  export default connect(mapStateToProps,mapDispatchToProps)(YtPlayer);
  