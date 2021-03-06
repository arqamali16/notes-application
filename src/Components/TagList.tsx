/**
 * @author Mohammed Arqam Ali Saad <arqam.ali16@gmail.com>
 * TagList component
 */
import React from 'react';

/**
 * Functional Component - TagList
 * @funtion
 * Component with all tag items
 */
const TagList = ({ tags }: { tags: string[] }) => (
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
