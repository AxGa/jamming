let accessTok = '';
const clientID = '';
const redirectURI = 'http://localhost:3000/';

const Spotify = {
	getAccessToken(){
		if(accessTok !== ''){
			console.log(accessTok);
			return accessTok;
		}
		else if(accessTok === ''){
			const urlTok = window.location.href.match(/access_token=([^&]*)/);
			const urlExpire = window.location.href.match(/expires_in=([^&]*)/);
			if(urlTok !== null && urlExpire !== null){
				accessTok = urlTok[1];
				const expiration = urlExpire[1];
				window.setTimeout(() => accessTok = '', expiration * 1000);
				window.history.pushState('Access Token', null, '/');
			}
			else{
				window.location.replace(`https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`)
			}
		}
	},

	search(term){
		return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
			headers: {Authorization: `Bearer ${accessTok}`}
		}).then(response => {
			return response.json();
		}).then(function(jsonResponse){
			if(jsonResponse.tracks.items){
				return jsonResponse.tracks.items.map(track => 
					({
						ID: track.id,
						Name: track.name,
						Artist: track.artists[0].name,
						Album: track.album.name,
						URI: track.uri
					})
				);
			}
			else{
				return [];
			}
		} 
		)
	},

	savePlaylist(playlistName, URIs){
		if(!playlistName && !URIs){
			return;
		}
		const accessToken = accessTok;
		const headers = { 'Authorization': 'Bearer ' + accessToken};
		let userID = '';
		let playlistID = '';

		return fetch(`https://api.spotify.com/v1/me`, {
			headers: headers
		}).then(response => {

			return response.json();
		}).then(function(jsonResponse){
			userID = jsonResponse.id;

			return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
				method: 'POST',
				body: JSON.stringify({name: playlistName}),
				headers: headers
			}).then(response => {
				return response.json();
			}).then(function(jsonResponse2){
				playlistID = jsonResponse2.id;
				return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
					method: 'POST',
					body: JSON.stringify({uris: URIs}),
					headers: headers
				}).then(response => {
					return response.json();
				}).then(function(jsonResponse3){
					playlistID = jsonResponse3.id;
				})
			})
		})

		

		
	}
}

export default Spotify;