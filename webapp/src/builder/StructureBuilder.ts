class StructureBuilder
{
	private structures:Map<string, JSONType.Structure> = new Map<string, JSONType.Structure>();

	constructor(datas:JSONType.Structure[], private blocBuilder:BlocBuilder)
	{
		for (let i = 0, len = datas.length; i < len; i++) {
			this.structures.set(datas[i].name, datas[i]);
		}
	}

	public generate(type:Structure.Type, map:Generator):void
	{
		let descriptor:JSONType.Structure|undefined = this.structures.get(type);
		let structure:Structure;

		if (!descriptor)
			return;
		structure = new Structure(descriptor);
		structure.position = map.getRandomHeight();
		structure.generate(this.blocBuilder);
	}
}