class Generator
{
	private readonly PLANET_DATA:Utils.PlanetData = new Utils.PlanetData(0);
	private data:LinearMatrix<number> = new LinearMatrix<number>(this.PLANET_DATA.SIZE);
	private map:WorldMap;

	constructor()
	{
		this.generateData(this.PLANET_DATA.SIZE);
		this.map = new WorldMap(this.data, this.PLANET_DATA);
	}

	private generateData(size:number):void
	{
		const PLANET = this.PLANET_DATA.PLANET;
		let i = size - 1;
		let middle:number, avg:number, padding:number, sum:number, n:number;

		this.data.set(0, 0, Utils.rand(0, PLANET.height));
		this.data.set(0, size - 1, Utils.rand(0, PLANET.height));
		this.data.set(size - 1, 0, Utils.rand(0, PLANET.height));
		this.data.set(size - 1, size - 1, Utils.rand(0,  PLANET.height));
		while (i > 1) {
			middle = i / 2;
			for (let j = middle; j < size; j += i) {
				for (let k = middle; k < size; k += i) {
					avg = this.getPointsAverage(j, k, middle);
					this.set(j, k, avg + Utils.rand(-middle, middle));
				}
			}
			for (let j = 0; j < size; j += middle) {
				padding = j % i == 0 ? middle : 0;
				for (let k = padding; k < size; k += i) {
					sum = 0;
					n = 0;
					if(j >= middle) {
						sum += this.data.get(j - middle, k);
						n++;
					}
					if(j + middle < size) {
						sum += this.data.get(j + middle, k);
						n++;
					}
					if(k >= middle) {
						sum += this.data.get(j, k - middle);
						n++;
					}
					if(k + middle < size) {
						sum += this.data.get(j, k + middle);
						n++;
					}
					this.set(j, k, Math.round(sum / n) + Utils.rand(-middle, middle));
				}
			}
			i = middle;
		}
	}
	private getPointsAverage(x:number, y:number, middle:number):number
	{
		let output = this.data.get(x - middle, y - middle);

		output += this.data.get(x - middle, y + middle);
		output += this.data.get(x + middle, y - middle);
		output += this.data.get(x + middle, y + middle);
		return (Math.round(output / 4));
	}
	private set(x:number, y:number, value:number):void
	{
		if (value < 0)
			value = 0;
		this.data.set(x, y, value);
	}

	public getMap():WorldMap
	{
		return (this.map);
	}
}