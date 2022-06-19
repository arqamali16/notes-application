/**
 * @author Mohammed Arqam Ali Saad <arqam.ali16@gmail.com>
 * Parent App component
 */
import { useEffect, useState } from 'react';
// @ts-ignore
import uuid from 'react-uuid';
import './App.css';

import Main from './Components/Main';
import Sidebar from './Components/Sidebar';

import { INote } from './types';

/**
 * Functional Component - App
 * @funtion
 * Parent App Component
 */
const App = () => {
	const [notes, setNotes] = useState(localStorage.notes ? JSON.parse(localStorage.notes) : []);
	const [activeNote, setActiveNote] = useState(false);

	/**
	 * Use Effect
	 * @funtion
	 * Setting note in local storage on notes changes
	 */
	useEffect(() => {
		localStorage.setItem('notes', JSON.stringify(notes));
	}, [notes]);

	/**
	 * Add Note
	 * @funtion
	 * Handler on adding notes
	 */
	const onAddNote = (): void => {
		const newNote = {
			id: uuid(),
			title: 'Untitled Note',
			body: '',
			tags: [],
			lastModified: Date.now(),
		};

		setNotes([newNote, ...notes]);
		setActiveNote(newNote.id);
	};

	/**
	 * Add Note
	 * @funtion
	 * @param {string} noteId - Note ID to be deleted.
	 */
	const onDeleteNote = (noteId: any): void => {
		setNotes(notes.filter(({ id }: any) => id !== noteId));
	};

	/**
	 * Update a note
	 * @funtion
	 * @param {Object} updatedNote - Note details with all changes and note id.
	 */
	const onUpdateNote = (updatedNote: INote) => {
		const updatedNotesArr = notes.map((note: any) => {
			if (note.id === updatedNote.id) {
				return updatedNote;
			}

			return note;
		});

		setNotes(updatedNotesArr);
	};

	/**
	 * Get Active Note
	 * @funtion
	 * @return {Object} Notes details which is clicked (Active)
	 */
	const getActiveNote = (): INote => {
		return notes.find(({ id }: any) => id === activeNote);
	};

	return (
		<div className='App'>
			<Sidebar
				notes={notes}
				onAddNote={onAddNote}
				onDeleteNote={onDeleteNote}
				activeNote={activeNote}
				setActiveNote={setActiveNote}
			/>
			<Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
		</div>
	);
};

export default App;
