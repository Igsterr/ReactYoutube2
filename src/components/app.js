import _ from 'lodash';
import React, { Component } from 'react';
import SearchBar from './search_bar.js';
import VideoList from './video_list.js';
import VideoDetail from './video_detail.js';
import YTSearch from 'youtube-api-search';
const API_KEY = 'AIzaSyBgV_WD9Y22XFKWVWHVUaD_A39zHs-iCcs';

export default class App extends Component {
	constructor(props) {
		super(props);

		this.state = { 
			videos: [],
			selectedVideo : null
		};

		this.videoSearch('surfboards');
	}

	videoSearch(term) {
		YTSearch({key: API_KEY, term: term}, (videos) => {
			this.setState({
				videos: videos,
				selectedVideo: videos[0] 
			});
		});
	}

  render() {
  	const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);

    return (
      <div>
      	<SearchBar onSearchTermChange={videoSearch} />
      	<VideoDetail video={this.state.selectedVideo}/>
      	<VideoList
      	 onVideoSelect={selectedVideo => this.setState({selectedVideo}) }
      	 videos={this.state.videos} />
      	
      </div>
    );
  }
}
