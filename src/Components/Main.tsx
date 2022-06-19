// @ts-nocheck
import React, { useEffect, useState, createRef } from 'react';
import ReactMarkdown from 'react-markdown';
import keyword_extractor from 'keyword-extractor';
import { CloseCircleFilled } from '@ant-design/icons';

const Main = ({ activeNote, onUpdateNote }) => {
	const inputRef = createRef();
	const [isEditing, setIsEditing] = useState(false);

	const onEditField = (field, value) => {
		let tags = [];
		if (activeNote.tags.length === 0) {
		}

		onUpdateNote({
			...activeNote,
			[field]: value,
			lastModified: Date.now(),
			tags,
		});
	};

	const onSave = () => {
		if (activeNote.tags.length === 0) {
			const tags = keyword_extractor.extract(activeNote.body, {
				language: 'english',
				remove_digits: true,
				return_changed_case: true,
				remove_duplicates: false,
			});

			onUpdateNote({
				...activeNote,
				lastModified: Date.now(),
				tags: tags.slice(0, 4),
			});
		}
	};

	const addTag = (event) => {
		if (event.key === 'Enter') {
			onUpdateNote({
				...activeNote,
				tags: [...activeNote.tags, event.target.value],
				lastModified: Date.now(),
			});
			inputRef.current.value = '';
		}
	};

	const removeTag = (value) => {
		const filteredTags = activeNote.tags.filter((each) => each !== value);
		onUpdateNote({
			...activeNote,
			tags: filteredTags,
			lastModified: Date.now(),
		});
	};

	if (!activeNote) return <div className='no-active-note'>No Active Note</div>;

	return (
		<div className='app-main'>
			{isEditing ? (
				<div className='app-main-note-edit'>
					<div className='display-flex margin-20'>
						<input
							type='text'
							id='title'
							placeholder='Note Title'
							value={activeNote.title}
							onChange={(e) => onEditField('title', e.target.value)}
							autoFocus
						/>
						<button
							className='button-background'
							onClick={() => {
								setIsEditing(false);
								onSave();
							}}
						>
							Save
						</button>
					</div>
					<textarea
						id='body'
						placeholder='Write your note here...'
						value={activeNote.body}
						onChange={(e) => onEditField('body', e.target.value)}
					/>
				</div>
			) : (
				<div className='app-main-note-preview'>
					<div className='header'>
						<h1 className='preview-title'>{activeNote.title}</h1>
						<button className='button-background' onClick={() => setIsEditing(true)}>
							Edit
						</button>
					</div>
					<ReactMarkdown className='markdown-preview'>{activeNote.body}</ReactMarkdown>
				</div>
			)}

			<ul className='tags'>
				{activeNote.tags.map((each) => (
					<li>
						<a className='tag'>
							<CloseCircleFilled onClick={() => removeTag(each)} className='margin-right' />
							{each}
						</a>
					</li>
				))}
				<li>
					<input ref={inputRef} placeholder='Add tag...' className='tags-input' onKeyDown={addTag}></input>
				</li>
			</ul>
		</div>
	);
};

export default Main;
