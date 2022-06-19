/**
 * @author Mohammed Arqam Ali Saad <arqam.ali16@gmail.com>
 * Sidebar component
 */
import React, { useState } from 'react';
import { FileSearchOutlined, PlusOutlined, TagOutlined } from '@ant-design/icons';

import TagList from './TagList';
import Notes from './Notes';

import { ISidebarProps, INote } from '../types';

/**
 * Functional Component - Sidebar
 * @funtion
 * Side bar component to show notes list or tag list
 */
const Sidebar = ({
	notes,
	onAddNote,
	onDeleteNote,
	activeNote,
	setActiveNote,
	setNotes,
	setIsFilter,
}: ISidebarProps) => {
	const [showTags, setShowTags] = useState(false);
	const [tags, setTags]: [string[], React.Dispatch<React.SetStateAction<string[]>>] = useState([] as string[]);

	let sortedNotes = notes.sort((a: INote, b: INote) => b.lastModified - a.lastModified);

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

	/**
	 * filterNotes
	 * @funtion
	 * funtion checks if filter is on filters out the list
	 */
	const filterNotes = (event: any) => {
		if (event.target.value === '') {
			setNotes(JSON.parse(localStorage.getItem('notes') as string));
			setIsFilter(false);
		} else {
			setIsFilter(true);
			const filteredNotes: INote[] = notes.filter(
				(each) =>
					each.body.toLowerCase().includes(event.target.value.toLowerCase()) ||
					each.title.toLowerCase().includes(event.target.value.toLowerCase()),
			);
			setNotes(filteredNotes);
		}
	};

	return (
		<div className='app-sidebar'>
			<div className='app-sidebar-header'>
				<h1>Notes</h1>
				<div>
					{showTags ? (
						<FileSearchOutlined
							className='font-size-22'
							onClick={() => {
								setShowTags(!showTags);
							}}
						/>
					) : (
						<TagOutlined
							onClick={() => {
								setShowTags(!showTags);
								setUniqueTags();
							}}
							className='font-size-22'
						/>
					)}
					&nbsp;&nbsp;
					<PlusOutlined onClick={onAddNote} className='font-size-22' />
				</div>
			</div>
			{!showTags ? (
				<>
					<div className='app-sidebar-header search-input'>
						<input placeholder='Search...' onChange={filterNotes}></input>
					</div>
					<Notes
						onDeleteNote={onDeleteNote}
						activeNote={activeNote}
						setActiveNote={setActiveNote}
						sortedNotes={sortedNotes}
					/>
				</>
			) : (
				<TagList tags={tags} />
			)}
		</div>
	);
};

export default Sidebar;
