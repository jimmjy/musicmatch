import React, { Component } from 'react';
import axios from 'axios';

import SearchField from '../../components/searchField/SearchField';
import Artist from '../../components/artist/Artist';
import Tracks from '../../components/tracks/Tracks';

import './app.scss';
import { async } from 'q';

class App extends Component {
	state = {
		artistQuery: '',
		artist: null,
		topTracks: [],
	};

	updateArtistQuery = e => {
		this.setState({
			artistQuery: e.target.value,
		});
	};

	onKeyPress = e => {
		if (e.key === 'Enter') {
			this.getArtistInfo();
		}
	};

	getArtistInfo = () => {
		const request = async () => {
			const response = await axios.get(
				`https://spotify-api-wrapper.appspot.com/artist/${this.state.artistQuery}`,
			);
			return response.data;
		};

		request()
			.then(data => {
				//check if we get back a result
				if (data.artists.total > 0) {
					const artist = data.artists.items[0];

					this.setState({ artist });

					//second request for top tracks
					const request = async () => {
						const response = await axios.get(
							`https://spotify-api-wrapper.appspot.com/artist/${artist.id}/top-tracks`,
						);

						return response.data;
					};

					request()
						.then(data => {
							this.setState({
								topTracks: data.tracks,
							});
						})
						.catch(err => alert(err.message));
				}
			})
			.catch(err => {
				alert(err.message);
			});
	};

	render() {
		return (
			<div className="app">
				<h2>Music Match</h2>
				<SearchField
					change={this.updateArtistQuery}
					value={this.state.artistQuery}
					keyPress={this.onKeyPress}
					click={this.getArtistInfo}
				/>
				<Artist artist={this.state.artist} />
				<Tracks tracks={this.state.topTracks} />
			</div>
		);
	}
}

export default App;
