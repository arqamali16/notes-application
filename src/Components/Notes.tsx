import React from 'react';

const Notes = ({ sortedNotes, onDeleteNote, activeNote, setActiveNote }: any) => (
	<>
		<div className='app-sidebar-header search-input'>
			<input placeholder='Search...'></input>
		</div>
		<div className='app-sidebar-notes'>
			{sortedNotes.map(({ id, title, body, lastModified }: any) => (
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
