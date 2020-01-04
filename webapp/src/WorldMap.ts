class WorldMap
{
	private readonly PLANET_DATA:Utils.PlanetData;
	private map:Cube.Type[][][] = [];

	constructor(private data:LinearMatrix<number>, planetDatas:Utils.PlanetData)
	{
		this.PLANET_DATA = planetDatas;
		this.generateMap();
	}

	private plot(x:number, y:number, z:number, value:Cube.Type):void
	{
		if (!this.map[x])
			this.map[x] = [];
		if (!this.map[x][y])
			this.map[x][y] = [];
		this.map[x][y][z] = value;
	}
	private generateMap():void
	{
		let y:number;
		
		for (let i = this.data.getWidth() - 1; i >= 0; i--) {
			for (let j = this.data.getHeight() - 1; j >= 0; j--) {
				y = ~~(this.data.get(i, j) * this.PLANET_DATA.RATIO);
				this.plot(i, y, j, this.PLANET_DATA.PLANET.ground);
				for (y--; y >= 0; y--) {
					this.plot(i, y, j, this.PLANET_DATA.PLANET.underground);
				}
			}
		}
	}

	public exists(x:number, y:number, z:number):boolean
	{
		return (this.map[x] && this.map[x][y] && this.map[x][y][z] != undefined);
	}
	public getDimensions():BABYLON.Vector3
	{
		const SIZE = this.PLANET_DATA.SIZE;
		
		return (new BABYLON.Vector3(SIZE - 1, this.PLANET_DATA.PLANET.height - 1, SIZE - 1));
	}
	public getRandomHeight():BABYLON.Vector3
	{
		const SIZE = this.PLANET_DATA.SIZE;
		let output = new BABYLON.Vector3(Utils.rand(0, SIZE), 0, Utils.rand(0, SIZE));
		
		output.y = ~~(this.data.get(output.x, output.z) * this.PLANET_DATA.RATIO);
		return (output);
	}
	public getTile(x:number, y:number, z:number):Cube.Type|undefined
	{
		if (!this.exists(x, y, z))
			return (undefined);
		return (this.map[x][y][z]);
	}
}