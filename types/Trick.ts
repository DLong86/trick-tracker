export type Trick = {
	id: number;
	name: string;
	video: string;
	// attempted: boolean;
	// landed: boolean;
	progress: "not started" | "attempted" | "trying" | "landed" | "on lock";
	dateAdded: string;
	notes?: string;
	// tilt?: number | string;
};
