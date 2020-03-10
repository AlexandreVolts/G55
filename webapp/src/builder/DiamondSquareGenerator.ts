class DiamondSquareGenerator implements IGenerator
{
	private data:LinearMatrix<number> = new LinearMatrix<number>(0);
	
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
	public generate(size:BABYLON.Vector3):LinearMatrix<number>
	{
		let i = size.x - 1;
		let middle:number, avg:number, padding:number, sum:number, n:number;

		this.data = new LinearMatrix<number>(size.x);
		this.set(0, 0, Utils.rand(size.y));
		this.set(0, size.z - 1, Utils.rand(size.y));
		this.set(size.x - 1, 0, Utils.rand(size.y));
		this.set(size.x - 1, size.z - 1, Utils.rand(size.y));
		while (i > 1) {
			middle = i / 2;
			for (let j = middle; j < size.x; j += i) {
				for (let k = middle; k < size.z; k += i) {
					avg = this.getPointsAverage(j, k, middle);
					this.set(j, k, avg + Utils.rand(-middle, middle));
				}
			}
			for (let j = 0; j < size.x; j += middle) {
				padding = j % i == 0 ? middle : 0;
				for (let k = padding; k < size.z; k += i) {
					sum = 0;
					n = 0;
					if(j >= middle) {
						sum += this.data.get(j - middle, k);
						n++;
					}
					if(j + middle < size.x) {
						sum += this.data.get(j + middle, k);
						n++;
					}
					if(k >= middle) {
						sum += this.data.get(j, k - middle);
						n++;
					}
					if(k + middle < size.z) {
						sum += this.data.get(j, k + middle);
						n++;
					}
					this.set(j, k, Math.round(sum / n) + Utils.rand(-middle, middle));
				}
			}
			i = middle;
		}
		return (this.data);
	}
}