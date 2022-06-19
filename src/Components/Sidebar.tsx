import React, { useState } from 'react';
import { PlusOutlined, TagOutlined } from '@ant-design/icons';

import TagList from './TagList';
import Notes from './Notes';

import { ISidebarProps } from '../types';

const Sidebar = ({ notes, onAddNote, onDeleteNote, activeNote, setActiveNote }: ISidebarProps) => {
	const [showTags, setShowTags] = useState(false);
	const [tags, setTags] = useState([]);

	const sortedNotes = notes.sort((a: any, b: any) => b.lastModified - a.lastModified);

	const setUniqueTags = () => {
		let allTags: any = [];
		notes.forEach((each) => {
			allTags = [...allTags, ...each.tags];
		});

		// @ts-ignore
		setTags([...new Set(allTags)]);
	};

	return (
		<div className='app-sidebar'>
			<div className='app-sidebar-header'>
				<h1>Notes</h1>
				<div>
					<TagOutlined
						onClick={() => {
							setShowTags(!showTags);
							setUniqueTags();
						}}
						className='font-size-22'
					/>
					&nbsp;&nbsp;
					<PlusOutlined onClick={onAddNote} className='font-size-22' />
				</div>
			</div>
			{!showTags ? (
				<Notes
					onDeleteNote={onDeleteNote}
					activeNote={activeNote}
					setActiveNote={setActiveNote}
					sortedNotes={sortedNotes}
				/>
			) : (
				<TagList tags={tags} />
			)}
		</div>
	);
};

export default Sidebar;
