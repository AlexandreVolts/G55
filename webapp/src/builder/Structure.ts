class Structure extends BABYLON.TransformNode
{
	private static id:number = 0;
	private size:BABYLON.Vector3;
	
	constructor(private descriptor:JSONType.Structure)
	{
		super("structure" + Structure.id, Game.scene);
		Structure.id++;
		this.size = Utils.getRandomVector(descriptor.minSize, descriptor.maxSize);
	}

	public generate(blocBuilder:BlocBuilder):void
	{
		let cur:Cube|undefined;
		let size = this.size.subtract(new BABYLON.Vector3(1, 1, 1));
		let it = new ThreeDimensionsIterator(size);

		it.run((x:number, y:number, z:number) => {
			cur = blocBuilder.getNewInstance(this.descriptor.bloc);
			if (!cur)
				return;
			cur.position = new BABYLON.Vector3(x, y, z);
			cur.parent = this;
		});
	}
	public getSize():BABYLON.Vector3
	{
		return (this.size);
	}
}

module Structure
{
	export enum Type
	{
		TRUNK = "trunk"
	}
}