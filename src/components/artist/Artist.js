import React from 'react';

import './artist.scss';

const Artist = ({ artist }) => {
	if (!artist) {
		return null;
	}

	const { name, followers, images, genres } = artist;

	console.log(name, followers.total, images[0].url, genres.join(', '));
	return (
		<div>
			<img className="artist__img" src={images[0] && images[0].url} alt="artist-profile" />
			<h3 className="artist__name">{name}</h3>
			<p className="artist__followers">{followers.total} followers</p>
			<p className="artist__genres">{genres.join(', ')}</p>
		</div>
	);
};

export default Artist;
