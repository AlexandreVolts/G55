namespace JSONType
{
	export type PlanetStructures = Array<{
		structure:string,
		minQuantity:number,
		maxQuantity:number
	}>;
	interface Type
	{
		name:string;
	}
	interface Descriptor
	{
		datas:Type[];
	}
	export interface BlocDescriptor extends Descriptor
	{
		path:string;
		datas:JSONType.Bloc[];
	}
	export interface StructureDescriptor extends Descriptor
	{
		datas:JSONType.Structure[];
	}
	export interface PlanetDescriptor extends Descriptor
	{
		datas:JSONType.Planet[];
	}
	export interface Bloc extends Type
	{
		position:BABYLON.Vector2;
	}
	export interface Structure extends Type
	{
		bloc:Cube.Type;
		minSize:BABYLON.Vector3;
		maxSize:BABYLON.Vector3;
	}
	export interface Planet extends Type
	{
		ground:Cube.Type;
		underground:Cube.Type;
		structures:PlanetStructures;
		size:number;
		height:number;
	}
}