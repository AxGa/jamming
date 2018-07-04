import React, { Component } from 'react';
import {Search} from './components/search/Search';
import {ResultsList} from './components/results/ResultsList';
import {PlayList} from './components/playlist/PlayList';
import Spotify from './util/Spotify.js'
import './App.css';

class App extends Component {
	constructor(props){
		super(props);
		this.state = {searchResults:[],
					playListName:'Achilles List',
					playlistTracks:[]};
		this.addTrack = this.addTrack.bind(this);
		this.removeTrack = this.removeTrack.bind(this);
		this.updatePlaylistName = this.updatePlaylistName.bind(this);
		this.savePlaylist = this.savePlaylist.bind(this);
		this.search = this.search.bind(this);
	}

	addTrack(track){
		if (this.state.playlistTracks.includes(track)) {
		  return;
		}
		const newList = this.state.playlistTracks.push(track);
		this.setState({newList});
	}

	removeTrack(track){
		const updatedList = this.state.playlistTracks.filter(obj => {
			return obj.id !== track.id;
		});
		console.log(updatedList);
		this.setState({playlistTracks: updatedList});
	}

	updatePlaylistName(name){
		this.setState({playListName: name});
	}

	savePlaylist(){
		let trackURIs = [];
		this.state.playlistTracks.forEach(function(el){
			trackURIs.push(el.URI);
		})
		console.log(trackURIs);
		Spotify.savePlaylist(this.state.playListName, trackURIs);
		this.setState({playListName: "New PlayList"});
		this.setState({playlistTracks: []})
	}

	search(term){
		Spotify.getAccessToken();
		Spotify.search(term).then(tracks => 
	      this.setState({searchResults: tracks})
	    )
	}
	render() {
		return (
		  <div className="App">
		    <Search onSearch={this.search}/>
		    <div className="App-playlist">
		      <ResultsList searchResults={this.state.searchResults} onAdd={this.addTrack} />
		      <PlayList playListName={this.state.playListName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist}/>
		    </div>
		  </div>
		);
	}
}

export default App;
