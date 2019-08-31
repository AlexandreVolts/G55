class JSONLoaderMap
{
	private static readonly FOLDER:string = "json/";
	private callback:Function;
	private len:number;
	private jsonLoaders:Map<string, JSONLoader> = new Map<string, JSONLoader>();

	constructor(names:Array<string>, callback:Function)
	{
		let path:string;
		
		this.callback = callback;
		this.len = names.length;
		for (let i:number = this.len - 1; i >= 0; i--) {
			path = JSONLoaderMap.FOLDER + names[i] + ".json";
			this.jsonLoaders.set(names[i], new JSONLoader(path, this.load));
		}
	}

	private load = ():void =>
	{
		this.len--;
		if (this.len <= 0)
			this.callback();
	}

	public get(path:string):JSONLoader
	{
		return (JSON.parse((<JSONLoader>this.jsonLoaders.get(path)).getDatas()));
	}
}