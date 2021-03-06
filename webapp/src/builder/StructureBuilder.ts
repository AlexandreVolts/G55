class StructureBuilder
{
	private structures:Map<string, JSONType.Structure> = new Map<string, JSONType.Structure>();

	constructor(datas:JSONType.Structure[], private blocBuilder:BlocBuilder)
	{
		for (let i = 0, len = datas.length; i < len; i++) {
			this.structures.set(datas[i].name, datas[i]);
		}
	}

	/**
	 * Generate a Structure from a structure type on the map
	 *
	 * @params type - The type of the structure.
	 * @params position - The position on the map where the structure must be created.
	 */
	public generate(type:Structure.Type, position:BABYLON.Vector3):void
	{
		let descriptor:JSONType.Structure|undefined = this.structures.get(type);
		let structure:Structure;

		if (!descriptor)
			return;
		structure = new Structure(descriptor);
		structure.position = position;
		structure.generate(this.blocBuilder);
	}
}