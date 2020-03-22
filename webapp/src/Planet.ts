class Planet
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

	/**
	 * Transform the LinearMatrix into a 3D array.
	 * Each case of the array contains the type of its tile.
	 */
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

	/**
	 * Returns true if a bloc exists at the targeted position, false otherwise.
	 *
	 * @params x - The x position of the targeted bloc.
	 * @params y - The y position of the targeted bloc.
	 * @params z - The z position of the targeted bloc.
	 * @returns A boolean indicates if the bloc exists or not.
	 */
	public exists(x:number, y:number, z:number):boolean
	{
		return (this.map[x] && this.map[x][y] && this.map[x][y][z] != undefined);
	}

	/**
	 * Returns true if a bloc is visible at the targeted position, false otherwise.
	 * A bloc is considered as visible if it isn't surrounded on all its faces by blocs.
	 *
	 * @params x - The x position of the targeted bloc.
	 * @params y - The y position of the targeted bloc.
	 * @params z - The z position of the targeted bloc.
	 * @returns A boolean indicates if the bloc is visible or not.
	 */
	public isBlocVisible(x:number, y:number, z:number):boolean
	{
		const SIZE = this.PLANET_DATA.SIZE;
		let isVisible:number = 1;

		isVisible &= (x == 0 || this.exists(x - 1, y, z)) ? 1 : 0;
		isVisible &= (x == SIZE - 1 || this.exists(x + 1, y, z)) ? 1 : 0;
		isVisible &= (y == 0 || this.exists(x, y - 1, z)) ? 1 : 0;
		isVisible &= (this.exists(x, y + 1, z)) ? 1 : 0;
		isVisible &= (z == 0 || this.exists(x, y, z - 1)) ? 1 : 0;
		isVisible &= (z == SIZE - 1 || this.exists(x, y, z + 1)) ? 1 : 0;
		return (!isVisible);
	}
	public isOnBorder(x:number, y:number, z:number):boolean
	{
		const SIZE = this.PLANET_DATA.SIZE;
		
		return (x <= 0 || y <= 0 || z <= 0 || x >= SIZE - 1 || z >= SIZE - 1);
	}
	public getDimensions():BABYLON.Vector3
	{
		const SIZE = this.PLANET_DATA.SIZE;
		
		return (new BABYLON.Vector3(SIZE - 1, this.PLANET_DATA.PLANET.height - 1, SIZE - 1));
	}
	
	/**
	 * Returns a random 3D position of the Planet's surface.
	 * 
	 * @returns A BABYLON.Vector3 representing the random position.
	 */
	public getRandomPosition():BABYLON.Vector3
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