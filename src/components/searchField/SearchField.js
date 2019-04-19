import React from 'react';
import './searchField.scss';

const SearchField = props => {
	const { change, value, keyPress, click } = props;

	return (
		<div className="search-field">
			<input
				className="input"
				onChange={change}
				value={value}
				onKeyPress={keyPress}
				type="text"
				placeholder="Search for an artist"
			/>
			<button className="search__btn" onClick={click}>
				Search Artist
			</button>
		</div>
	);
};

export default SearchField;
