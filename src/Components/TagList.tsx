import React from 'react';

const TagList = ({ tags }: any) => (
	<div className='app-sidebar-notes'>
		{tags.map((each: string) => (
			<div className='app-sidebar-note'>
				<div className='sidebar-note-title'>
					<strong>{each}</strong>
				</div>
			</div>
		))}
	</div>
);

export default TagList;
