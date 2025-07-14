export type Trick = {
	id: number;
	name: string;
	video: string;
	progress: "not started" | "attempted" | "trying" | "landed" | "on lock";
	dateAdded: string;
	notes?: string;
	focused?: boolean;
};
