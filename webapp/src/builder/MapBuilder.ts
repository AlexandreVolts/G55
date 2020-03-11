class MapBuilder
{
	private structureBuilder:StructureBuilder;

	constructor(private blocBuilder:BlocBuilder)
	{
		this.structureBuilder = new StructureBuilder(Utils.datas.get("structures").datas, blocBuilder);
	}
	
	/**
	 * Build the map with the cubes which will be on the map.
	 * Only blocs which are visible by the player are generated.
	 * 
	 * @returns An single-dimension array of Cubes objects containing all visible Cubes as BABYLON 3D objects.
	 */
	public build(planet:Planet):Cube[]
	{
		let output:Cube[] = [];
		let cur:Cube|undefined;
		let tile:Cube.Type|undefined;
		let it = new ThreeDimensionsIterator(planet.getDimensions());
		
		console.log(it);
		it.run((x:number, y:number, z:number) => {
			tile = planet.getTile(x, y, z);
			if (!tile || !planet.isBlocVisible(x, y, z))
				return;
			cur = this.blocBuilder.getNewInstance(tile);
			if (!cur)
				return;
			cur.position = new BABYLON.Vector3(x, y, z);
			output.push(cur);
		});
		for (let tmp = 0; tmp < 10; tmp++)
			this.structureBuilder.generate(Structure.Type.TRUNK, planet.getRandomPosition());
		return (output);
	}
}