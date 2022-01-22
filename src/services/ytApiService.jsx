
import YTSearch from 'youtube-api-search';

var axios = require('axios')

//const API_KEY = constants.API_KEY;

export const videoSearchService = (API_KEY,term, maxResults, videoDefinition, callback) => {
    YTSearch({ key: API_KEY, term, maxResults, videoDefinition }, videos => callback(videos));
  }

export const getPlaylist =  async (API_KEY,playlistUrl) => {
    
    var originalVideos = [];
    var filteredVideos = [];

    const getOriginalPlaylist = (url) => {
        
        return new Promise(function(resolve, reject) {
            
            const playlistId = url.substring(url.indexOf('list=')+5);
            const reqUrl = 'https://www.googleapis.com/youtube/v3/playlistItems?part=id,snippet,status&maxResults=50&videoEmbeddable=true&playlistId='+ playlistId +'&key=' + API_KEY

            var allVideos = []
            const retrievePlaylistVideos = async (pagetoken) => { 
                const pt = (typeof pagetoken === "undefined") ? "" :`&pageToken=${pagetoken}`
                axios.get(reqUrl + pt)
                .then(function(response) {
                    const videos = response.data.items 
                    videos.forEach(element => {
                    element["id"] = { videoId : element.snippet.resourceId.videoId }
                    });
                    allVideos = allVideos.concat(videos);
                    resolve(allVideos)
                    responseHandler(response.data) 
                })
                .catch(function(error) {
                    console.error(error);
                    reject(error)
                });
            }

            const responseHandler = async (response) => {
                if(response.nextPageToken)
                    retrievePlaylistVideos(response.nextPageToken);
                else 
                    resolve(allVideos)               
            }           
            retrievePlaylistVideos() 
        })
    
    }   

    await getOriginalPlaylist(playlistUrl)
        .then( allVideos => { originalVideos = allVideos },
        error => console.log(error)
    );

    await filterEmbeddableVideos(API_KEY,originalVideos)
        .then((value) => { filteredVideos = value; },
        error => console.log(error) 
    )

    return filteredVideos;

  }

  export const filterEmbeddableVideos = async (API_KEY,videos) => {
    console.log('ENTER FILTER')
    const filteredVideos = [...videos]

      await Promise.all(videos.map((video,index) => {
        const videoId = video.id.videoId;
        const videoReq = 'https://www.googleapis.com/youtube/v3/videos?part=status&id=' + videoId + '&key=' + API_KEY
        return axios.get(videoReq)
        .then(function(response) {   
          
          const isEmbeddable = response.data.items && response.data.items.length > 0 && response.data.items[0].status.embeddable;          
          if(!isEmbeddable) 
            filteredVideos[index] = null; 

        })
        .catch(function(error) {
          console.error(error);
          throw error;
        });
    })).then((values) => {
        //return filteredVideos.filter(function (el) { return el != null; })
    }).catch(function(error) {
          console.error(error);
          throw error;
    });
    return filteredVideos.filter(function (el) { return el != null; })
  }

  export const getRelatedVideos = async (API_KEY,currentVideoId) => {

    if(!currentVideoId) currentVideoId = 'hd5VQMbaWYY'

    const videoReq = `https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${currentVideoId}&maxResults=7&type=video&key=${API_KEY}`

    var originalVideos = [];
    var filteredVideos = [];

    const getOriginalRelated = () => {
        return new Promise(function(resolve, reject) {
            axios.get(videoReq)
                .then(function(response) {   
                    const videos = response.data.items;
                    resolve(videos)
                })
                .catch(function(error) {
                    console.error(error);
                    reject(error)
            });
        })
    }

    await getOriginalRelated()
        .then(
            allVideos => { originalVideos = allVideos  },
            error => console.log(error)
    );

    await filterEmbeddableVideos(API_KEY,originalVideos)
        .then(
            (value) => { filteredVideos = value; },
            error => console.log(error) 
    );

    return filteredVideos;
  }

  export const checkYoutubeApiKey = (key,success,failure) => {
      const url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=YouTube+Data+API&type=video&key=' + key

      axios.get(url).then(
          () => success()
      ).catch(
          (response) => failure(response.data.error.message)
      )

  }
