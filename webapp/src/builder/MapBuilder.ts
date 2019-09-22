class MapBuilder
{
	private structureBuilder:StructureBuilder;

	constructor(private generator:Generator, private blocBuilder:BlocBuilder)
	{
		this.structureBuilder = new StructureBuilder(Utils.datas.get("structures").datas, blocBuilder);
	}
	
	private isBlocVisible(x:number, y:number, z:number):boolean
	{
		const g = this.generator;
		
		return (!(g.exists(x - 1, y, z) && g.exists(x + 1, y, z)
			&& g.exists(x, y - 1, z) && g.exists(x, y + 1, z)
			&& g.exists(x, y, z - 1) && g.exists(x, y, z + 1)));
	}
	
	public build():Cube[]
	{
		const SIZE = this.generator.getDimensions();
		let output:Cube[] = [];
		let cur:Cube|undefined;
		let tile:Cube.Type|undefined;
		
		for (let x = SIZE.x; x >= 0; x--) {
			for (let y = SIZE.y; y >= 0; y--) {
				for (let z = SIZE.z; z >= 0; z--) {
					tile = this.generator.getTile(x, y, z);
					if (!tile || !this.isBlocVisible(x, y, z))
						continue;
					cur = this.blocBuilder.getNewInstance(tile);
					if (!cur)
						continue;
					cur.position = new BABYLON.Vector3(x, y, z);
					output.push(cur);
				}
			}
		}
		for (let tmp = 0; tmp < 10; tmp++)
			this.structureBuilder.generate(Structure.Type.TRUNK, this.generator);
		return (output);
	}
}