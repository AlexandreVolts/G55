
class Generator
{
	private map:Cube.Type[][][] = [];

	constructor()
	{
		const planet:JSONType.Planet = Utils.datas.get("planets").datas[0];
		let sx, sz;

		for (let x = Math.pow(2, planet.size); x >= 0; x--) {
			this.map[x] = [];
			this.map[x][0] = [];
			for (let z = Math.pow(2, planet.size); z >= 0; z--) {
				sx = x;
				sz = z;
				this.map[x][0][z] = planet.ground;
			}
		}
	}

	public getDimensions():BABYLON.Vector3
	{
		return (new BABYLON.Vector3(this.map.length - 1, this.map[0].length - 1, this.map[0][0].length - 1));
	}
	public exists(x:number, y:number, z:number):boolean
	{
		return (this.map[x] != undefined && 
			this.map[x][y] != undefined && 
			this.map[x][y][z] != undefined);
	}
	public getTile(x:number, y:number, z:number):Cube.Type|undefined
	{
		if (!this.exists(x, y, z))
			return (undefined);
		return (this.map[x][y][z]);
	}
}