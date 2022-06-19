export interface INote {
	id: string;
	body: string;
	title: string;
	tags: string[];
	lastModified: number;
}

export interface ISidebarProps {
	notes: INote[];
	onAddNote: () => void;
	onDeleteNote: (id: string) => void;
	activeNote: string | boolean;
	setActiveNote: React.Dispatch<React.SetStateAction<boolean | string>>;
}

export interface INoteProps {
	sortedNotes: INote[];
	onDeleteNote: (id: string) => void;
	activeNote: string | boolean;
	setActiveNote: React.Dispatch<React.SetStateAction<boolean | string>>;
}

export interface IMainProps {
	activeNote: INote;
	onUpdateNote: (INote) => void;
}
