class Stage
{
	private light:BABYLON.HemisphericLight|undefined;
	private blocBuilder:BlocBuilder;
	private mapBuilder:MapBuilder;
	private player:Player;

	constructor()
	{
		let blocsDatas:any = Utils.datas.get("blocs");

		this.blocBuilder = new BlocBuilder(blocsDatas.path, blocsDatas.datas);
		this.mapBuilder = new MapBuilder(this.blocBuilder);
		this.mapBuilder.build();
		this.player = new Player();
		this.initialiseLight();
	}

	private initialiseLight():void
	{
		const LIGHT_DIR = new BABYLON.Vector3(0, 1, 0);
		
		this.light = new BABYLON.HemisphericLight("light", LIGHT_DIR, Game.scene);
		this.light.diffuse = new BABYLON.Color3(1, 1, 1);
		this.light.specular = new BABYLON.Color3(0, 0, 0);
	}

	public render():void
	{
		
	}
}