import React from 'react';
import SearchResultsItem from './search_results_item'

const SearchResults = (props) => {

  const related = props.videos && props.videos.length > 15 

  const videoItems = props.videos.map((video,index) => {

        return (
          <React.Fragment>
            <SearchResultsItem
              video={video}       
            />
          </React.Fragment>
        )      
  });

  return (
    
    <ul className={!related ? "list-group" : "list-group related-group"}>
      {videoItems}
    </ul>
  )

};


export default SearchResults;
