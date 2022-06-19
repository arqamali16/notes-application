/**
 * @author Mohammed Arqam Ali Saad <arqam.ali16@gmail.com>
 * Main component
 */
import React, { useState, createRef } from 'react';
import ReactMarkdown from 'react-markdown';
import keyword_extractor from 'keyword-extractor';
import { CloseCircleFilled } from '@ant-design/icons';

import { IMainProps } from '../types';

const Main = ({ activeNote, onUpdateNote }: IMainProps) => {
	const [isEditing, setIsEditing] = useState(false);

	const inputRef: React.RefObject<unknown> = createRef();

	const onEditField = (field: string, value: string) => {
		let tags: string[] = [];
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

	const addTag = (event: { key: string; target: { value: any } }) => {
		if (event.key === 'Enter') {
			onUpdateNote({
				...activeNote,
				tags: [...activeNote.tags, event.target.value],
				lastModified: Date.now(),
			});

			// @ts-ignore
			inputRef.current.value = '';
		}
	};

	const removeTag = (value: string) => {
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
					{/** @ts-ignore */}
					<input ref={inputRef} placeholder='Add tag...' className='tags-input' onKeyDown={addTag}></input>
				</li>
			</ul>
		</div>
	);
};

export default Main;
