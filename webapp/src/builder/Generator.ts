
class Generator
{
	private readonly PLANET:JSONType.Planet = Utils.datas.get("planets").datas[0];
	private readonly SIZE:number = Math.pow(2, this.PLANET.size) + 1;
	private map:Cube.Type[][][] = [];
	private datas:LinearMatrix<number> = new LinearMatrix<number>(this.SIZE);

	constructor()
	{
		this.generateDatas(this.SIZE);
		this.generateMap();
	}

	private generateDatas(size:number):void
	{
		let i = size - 1;
		let middle:number, avg:number, padding:number, sum:number, n:number;

		this.datas.set(0, 0, Utils.rand(0, this.PLANET.height));
		this.datas.set(0, size - 1, Utils.rand(0, this.PLANET.height));
		this.datas.set(size - 1, 0, Utils.rand(0, this.PLANET.height));
		this.datas.set(size - 1, size - 1, Utils.rand(0,  this.PLANET.height));
		while (i > 1) {
			middle = i / 2;
			for (let j = middle; j < size; j += i) {
				for (let k = middle; k < size; k += i) {
					avg = this.getAverage(j, k, middle);
					this.set(j, k, avg + Utils.rand(-middle, middle));
				}
			}
			for (let j = 0; j < size; j += middle) {
				padding = j % i == 0 ? middle : 0;
				for (let k = padding; k < size; k += i) {
					sum = 0;
					n = 0;
					if(j >= middle) {
						sum += this.datas.get(j - middle, k);
						n++;
					}
					if(j + middle < size) {
						sum += this.datas.get(j + middle, k);
						n++;
					}
					if(k >= middle) {
						sum += this.datas.get(j, k - middle);
						n++;
					}
					if(k + middle < size) {
						sum += this.datas.get(j, k + middle);
						n++;
					}
					this.set(j, k, Math.round(sum / n) + Utils.rand(-middle, middle));
				}
			}
			i = middle;
		}
	}
	private generateMap():void
	{
		let y:number;
		
		for (let i = this.datas.getWidth() - 1; i >= 0; i--) {
			for (let j = this.datas.getHeight() - 1; j >= 0; j--) {
				y = ~~(this.datas.get(i, j) * (this.PLANET.height / (this.SIZE - 1)));
				this.plot(i, y, j, this.PLANET.ground);
				for (y--; y >= 0; y--) {
					this.plot(i, y, j, this.PLANET.underground);
				}
			}
		}
	}
	private getAverage(x:number, y:number, middle:number):number
	{
		let output = this.datas.get(x - middle, y - middle);

		output += this.datas.get(x - middle, y + middle);
		output += this.datas.get(x + middle, y - middle);
		output += this.datas.get(x + middle, y + middle);
		return (Math.round(output / 4));
	}
	private plot(x:number, y:number, z:number, value:Cube.Type):void
	{
		if (!this.map[x])
			this.map[x] = [];
		if (!this.map[x][y])
			this.map[x][y] = [];
		this.map[x][y][z] = value;
	}
	private set(x:number, y:number, value:number):void
	{
		if (value < 0)
			value = 0;
		this.datas.set(x, y, value);
	}
	
	public getDimensions():BABYLON.Vector3
	{
		return (new BABYLON.Vector3(this.SIZE - 1, this.PLANET.height - 1, this.SIZE - 1));
	}
	public exists(x:number, y:number, z:number):boolean
	{
		return (this.map[x] && this.map[x][y] && this.map[x][y][z] != undefined);
	}
	public getTile(x:number, y:number, z:number):Cube.Type|undefined
	{
		if (!this.exists(x, y, z))
			return (undefined);
		return (this.map[x][y][z]);
	}
}