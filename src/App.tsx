import { useEffect, useState } from 'react';
//@ts-ignore
import uuid from 'react-uuid';
import './App.css';
import Main from './Components/Main';
import Sidebar from './Components/Sidebar';

const App = () => {
	const [notes, setNotes] = useState(localStorage.notes ? JSON.parse(localStorage.notes) : []);
	const [activeNote, setActiveNote] = useState(false);

	useEffect(() => {
		localStorage.setItem('notes', JSON.stringify(notes));
	}, [notes]);

	const onAddNote = () => {
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

	const onDeleteNote = (noteId: any) => {
		setNotes(notes.filter(({ id }: any) => id !== noteId));
	};

	const onUpdateNote = (updatedNote: any) => {
		const updatedNotesArr = notes.map((note: any) => {
			if (note.id === updatedNote.id) {
				return updatedNote;
			}

			return note;
		});

		setNotes(updatedNotesArr);
	};

	const getActiveNote = () => {
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
