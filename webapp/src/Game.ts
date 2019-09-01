class Game
{
	private static readonly JSON_FILES:string[] = ["blocs"];
	private readonly CANVAS = document.getElementsByTagName("canvas")[0];
	private engine:BABYLON.Engine = new BABYLON.Engine(this.CANVAS, true);
	private scene:BABYLON.Scene = new BABYLON.Scene(this.engine);
	private player:Player = new Player(this.scene);
	private stage:Stage = new Stage(this.scene);
	private loader:JSONLoaderMap;
	private blocBuilder:BlocBuilder|undefined;

	constructor()
	{
		this.scene.clearColor = new BABYLON.Color4(0, 0.75, 0.85, 1);
		this.scene.autoClearDepthAndStencil = false;
		this.loader = new JSONLoaderMap(Game.JSON_FILES, this.onLoad);
	}

	private run():void
	{
		this.engine.runRenderLoop(this.render);
		window.addEventListener("resize", () => {
			this.engine.resize();
		});
	}
	
	public onLoad = ():void =>
	{
		let blocsDatas:any = this.loader.get("blocs");
		
		this.blocBuilder = new BlocBuilder(blocsDatas.path, blocsDatas.datas, this.scene);
		console.log(blocsDatas);
		this.run();
	}
	public render = ():void =>
	{
		this.scene.render();
	}
}