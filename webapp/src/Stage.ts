class Stage
{
	private blocBuilder:BlocBuilder;
	private light:BABYLON.HemisphericLight|undefined;
	private generator:Generator = new Generator();
	private mapBuilder:MapBuilder = new MapBuilder(this.generator);
	private player:Player;

	constructor(private scene:BABYLON.Scene)
	{
		let blocsDatas:any = Utils.datas.get("blocs");

		this.blocBuilder = new BlocBuilder(blocsDatas.path, blocsDatas.datas, this.scene);
		this.initialiseLight();
		this.mapBuilder.build(this.blocBuilder);
		this.player = new Player(scene);
	}

	private initialiseLight():void
	{
		const LIGHT_DIR = new BABYLON.Vector3(0, 1, 0);
		
		this.light = new BABYLON.HemisphericLight("light", LIGHT_DIR, this.scene);
		this.light.diffuse = new BABYLON.Color3(1, 1, 1);
		this.light.specular = new BABYLON.Color3(0, 0, 0);
	}

	public render():void
	{

	}
}