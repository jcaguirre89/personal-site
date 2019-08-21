import React from 'react';

export default function IFrame({ children }) {
	return (
		<div style={{maxWidth: `600`, margin: `auto`}}>
			{children}
		</div>
	)
}
