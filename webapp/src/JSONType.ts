namespace JSONType
{
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
	export interface BiomeDescriptor extends Descriptor
	{
		datas:JSONType.Biome[];
	}
	export interface PlanetDescriptor extends Descriptor
	{
		datas:JSONType.Planet[];
	}
	export interface Bloc extends Type
	{
		name:string;
		position:BABYLON.Vector2;
	}
	export interface Biome extends Type
	{
		name:string;
		floor:Cube.Type;
	}
	export interface Planet extends Type
	{
		name:string;
		ground:Cube.Type;
		size:number;
		height:number;
	}
}