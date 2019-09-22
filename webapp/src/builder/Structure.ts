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
		
		for (let x = this.size.x - 1; x >= 0; x--) {
			for (let y = this.size.y - 1; y >= 0; y--) {
				for (let z = this.size.z - 1; z >= 0; z--) {
					cur = blocBuilder.getNewInstance(this.descriptor.bloc);
					if (!cur)
						continue;
					cur.position = new BABYLON.Vector3(x, y, z);
					cur.parent = this;
				}
			}
		}
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