export interface INote {
	id: string;
	content: string;
	title: string;
	tags: string[];
}

export interface ISidebarProps {
	notes: INote[];
	onAddNote: () => void;
	onDeleteNote: (id: string) => void;
	activeNote: string | boolean;
	setActiveNote: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface INoteProps {
	sortedNotes: INote[];
	onDeleteNote: (id: string) => void;
	activeNote: string | boolean;
	setActiveNote: React.Dispatch<React.SetStateAction<boolean>>;
}
