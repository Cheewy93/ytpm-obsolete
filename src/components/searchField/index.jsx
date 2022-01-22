import _ from 'lodash';

import React, { Component } from 'react';
import YTSearch from 'youtube-api-search';
import { connect } from 'react-redux';

import SearchBar from './search_bar';
import SearchResults from './search_results';
import { addPlaylist } from '../../actions/playlistActions'
import { addRecommended } from '../../actions/settingsActions'
import { videoSearchService, getPlaylist, getRelatedVideos } from '../../services/ytApiService'

import imgLoading from '../../images/searchField/loading.gif'

import * as constants from '../../constants/'

import '../../style2.css'

class SearchField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null,
      maxResults : 7,
      playlistImportInputValue : '',
      loading : false,
      search: true,
      relatedVideos: []
    };

    this.videoSearch('nenad knezevic knez');
    this.getRelatedVideos();
  }

  videoSearch(term) {
    videoSearchService(this.props.apiKey,term, this.props.maxResults, this.props.onlyHd ? 'high' : 'any', (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
    })
  }

  addVideo = (video) => {
      this.props.addVideo(video);
      const selectedVideo = video;
      this.setState({ selectedVideo })
  }

  getPlaylistService = async () => {
    this.setState({loading : true});
    var videos = [] 
    
    await getPlaylist(this.props.apiKey,this.state.playlistImportInputValue)
      .then((value) => videos = value)

    if(videos) 
      this.props.addPlaylistD(videos);
    
    this.setState({loading : false})
  }

  // addPlaylist = (videos) => {
  //   this.props.addPlaylistD(videos);
  // }

  getRelatedVideos =  async () => { 
      await getRelatedVideos(this.props.apiKey,this.props.currentVideoId)
        .then((value) => { 
          this.setState({ relatedVideos: value }, 
          () => this.props.addRecommended(this.state.relatedVideos[0])) 
      })  
  }


  onPlaylistImportInputChange = (event) => {
    const playlistImportInputValue = event.target.value;
    this.setState({playlistImportInputValue})
  }


  getSnapshotBeforeUpdate(prevProps, prevState) {
    if(prevProps.currentVideoId !== this.props.currentVideoId) {
      this.getRelatedVideos();
    }
    return null;
  }

  render() {
    const videoSearch = _.debounce(term => {
      this.videoSearch(term);
    }, 300);
    return (
      <div className='search-container'>
        <div className="centerisedDiv">
          <table className="option-table-container">
            <tr>
              <th className="option" onClick={() => this.setState({search: true})}>
                <div className={this.state.search ? "option-selected" : ""}>
                  <h4 className={this.state.search ? "selected" : "not-selected"}>Youtube Search</h4>
                </div>
              </th>
              <th className="option" onClick={() => this.setState({search: false})}>
                <div className={!this.state.search ? "option-selected" : ""}>
                  <h4 className={!this.state.search ? "selected" : "not-selected"}>Related Videos</h4>
                </div>
              </th>
            </tr>
          </table>
        </div>
        <div className={this.state.search ? "search-field" : "hidden addedPadding"}>
          <h5 className="heading">Youtube Search:</h5>
            <SearchBar onSearchTermChange={videoSearch} />
          <h6 className="heading">Results:</h6>
          <SearchResults
            videos={this.state.videos}
          />
          
          
       </div>
       <div className={!this.state.search  ? "present addedPadding playlist-add related" : "hidden addedPadding"}>  
          <h5 className="heading">Related Videos:</h5>      
          <SearchResults
              videos={this.state.relatedVideos}
          />
       </div>
       <div className= "present playlist-add">
              <br/>
              <input type = 'text' style = {{ width: "70%" }} 
                onChange={this.onPlaylistImportInputChange} 
                value={this.state.playlistImportInputValue} 
                placeholder="Insert Playlist URL"
              /> 
              &nbsp;<button className="button" onClick={this.getPlaylistService}>Import playlist</button> 
          </div>
          <img className={this.state.loading ? "" : "hidden"} src={imgLoading} alt="loading" width="50" height="50"/>
      </div>
    );
  }
  
}

const mapStateToProps = function(state) {
  return {
    maxResults: state.settings.results,
    onlyHd: state.settings.onlyHd,
    apiKey: state.settings.apiKey
  }
}


const mapDispatchToProps = dispatch => {
  return {
    // dispatching plain actions
    addPlaylistD: (playlist) => dispatch(addPlaylist(playlist)), //forica sa ovim () i generalno sa tim arrow funkcijama? 
    addRecommended: (recommended) => dispatch(addRecommended(recommended))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SearchField);
