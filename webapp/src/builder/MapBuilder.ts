class MapBuilder
{
	private readonly PLANET_DATA:Utils.PlanetData = new Utils.PlanetData(0);
	private map:WorldMap;
	private structureBuilder:StructureBuilder;

	constructor(private blocBuilder:BlocBuilder)
	{
		let generator:IGenerator = new DiamondSquareGenerator();
		let size = new BABYLON.Vector3(this.PLANET_DATA.SIZE, this.PLANET_DATA.PLANET.height, this.PLANET_DATA.SIZE);

		this.map = new WorldMap(generator.generate(size), this.PLANET_DATA);
		this.structureBuilder = new StructureBuilder(Utils.datas.get("structures").datas, blocBuilder);
	}
	
	private isBlocVisible(x:number, y:number, z:number):boolean
	{
		return (!(this.map.exists(x - 1, y, z) && this.map.exists(x + 1, y, z)
			&& this.map.exists(x, y - 1, z) && this.map.exists(x, y + 1, z)
			&& this.map.exists(x, y, z - 1) && this.map.exists(x, y, z + 1)));
	}
	
	/**
	 * Build the map with the cubes which will be on the map.
	 * Only blocs which are visible by the player are generated.
	 * 
	 * @returns An single-dimension array of Cubes objects containing all visible Cubes as BABYLON 3D objects.
	 */
	public build():Cube[]
	{
		const SIZE = this.map.getDimensions();
		let output:Cube[] = [];
		let cur:Cube|undefined;
		let tile:Cube.Type|undefined;
		
		for (let x = SIZE.x; x >= 0; x--) {
			for (let y = SIZE.y; y >= 0; y--) {
				for (let z = SIZE.z; z >= 0; z--) {
					tile = this.map.getTile(x, y, z);
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
			this.structureBuilder.generate(Structure.Type.TRUNK, this.map);
		return (output);
	}
}