class Cube extends BABYLON.InstancedMesh
{
	constructor(id:string, source:BABYLON.Mesh)
	{
		super(id, source);
	}
}

module Cube
{
	export enum Type {
		EMPTY = "",
		RED_GRASS = "red_grass",
		BLUE_ROCK = "blue_rock",
		TREE_TRUNK = "tree_trunk",
		TREE_LEAF = "tree_leaf"
	}
}