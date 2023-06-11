export interface Pokemon {
	id: number;
	img: string;
	name: string;
	height: number;
	weight: number;
	order: number;
	type: string[];
	moves: string[];
}