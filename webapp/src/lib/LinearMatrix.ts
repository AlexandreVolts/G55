class LinearMatrix<T>
{
	private datas:T[] = [];
	
	constructor(private width:number, private height:number = width)
	{

	}

	public get(x:number, y:number):T
	{
		return (this.datas[y * this.width + x]);
	}
	public set(x:number, y:number, value:T):void
	{
		this.datas[y * this.width + x] = value;
	}
	public getWidth():number
	{
		return (this.width);
	}
	public getHeight():number
	{
		return (this.height);
	}
}