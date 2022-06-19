/**
 * @author Mohammed Arqam Ali Saad <arqam.ali16@gmail.com>
 * Sidebar component
 */
import React, { useState } from 'react';
import { PlusOutlined, TagOutlined } from '@ant-design/icons';

import TagList from './TagList';
import Notes from './Notes';

import { ISidebarProps, INote } from '../types';

/**
 * Functional Component - Sidebar
 * @funtion
 * Side bar component to show notes list or tag list
 */
const Sidebar = ({ notes, onAddNote, onDeleteNote, activeNote, setActiveNote }: ISidebarProps) => {
	const [showTags, setShowTags] = useState(false);
	const [tags, setTags]: [string[], React.Dispatch<React.SetStateAction<string[]>>] = useState([] as string[]);

	const sortedNotes = notes.sort((a: INote, b: INote) => b.lastModified - a.lastModified);

	/**
	 * setUniqueTags
	 * @funtion
	 * funntion which finds unique tags and prepares display list
	 */
	const setUniqueTags = () => {
		let allTags: string[] = [];
		notes.forEach((each) => {
			allTags = [...allTags, ...each.tags];
		});

		setTags([...(new Set(allTags) as any)]);
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
