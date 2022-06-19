/**
 * @author Mohammed Arqam Ali Saad <arqam.ali16@gmail.com>
 * Notes component
 */
import React from 'react';
import { INote, INoteProps } from '../types';

const Notes = ({ sortedNotes, onDeleteNote, activeNote, setActiveNote }: INoteProps) => (
	<>
		<div className='app-sidebar-notes'>
			{sortedNotes.map(({ id, title, body, lastModified }: INote) => (
				<div className={`app-sidebar-note ${id === activeNote && 'active'}`} onClick={() => setActiveNote(id)}>
					<div className='sidebar-note-title'>
						<strong>{title}</strong>
						<button onClick={(e) => onDeleteNote(id)}>Delete</button>
					</div>

					<p>{body && body.substr(0, 100) + '...'}</p>
					<small className='note-meta'>
						Last Modified
						{new Date(lastModified).toLocaleDateString('en-GB', {
							hour: '2-digit',
							minute: '2-digit',
						})}
					</small>
				</div>
			))}
		</div>
	</>
);

export default Notes;
