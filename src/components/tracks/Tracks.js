import React, { Component } from 'react';

import './tracks.scss';

class Tracks extends Component {
	state = {
		isPlaying: false,
		audio: null,
		playingPreviewURL: null,
	};

	playAudio = play => {
		const audio = new Audio(play);

		if (!this.state.isPlaying) {
			audio
				.play()
				.then(() => this.setState({ isPlaying: true, audio, playingPreviewURL: play }))
				.catch(() => alert('Could not find sound file, try another'));
		} else {
			this.state.audio.pause();

			if (this.state.playingPreviewURL === play) {
				this.setState({ isPlaying: false });
			} else {
				audio
					.play()
					.then(() => {
						this.setState({ audio, playingPreviewURL: play });
					})
					.catch(e => alert(e.message));
			}
		}
	};

	trackIcon = track => {
		if (track.preview_url === null) {
			return <span className="track--icon--modifier">&#935;</span>;
		} else if (this.state.playingPreviewURL === track.preview_url && this.state.isPlaying) {
			return <span className="track--icon--modifier">| |</span>;
		} else {
			return <span className="track--icon--modifier">&#9654;</span>;
		}
	};

	render() {
		const { tracks } = this.props;

		return (
			<div className="track-section">
				{tracks.map(track => {
					const { id, name, album, preview_url } = track;

					return (
						<div key={id} className="track-container">
							<img
								onClick={() => this.playAudio(preview_url)}
								className="track__img"
								src={album.images[0] && album.images[0].url}
								alt="album image"
							/>
							<p className="track__name">{name}</p>
							<p onClick={() => this.playAudio(preview_url)} className="track__icon">
								{this.trackIcon(track)}
							</p>
						</div>
					);
				})}
			</div>
		);
	}
}

export default Tracks;
