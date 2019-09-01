class Game
{
	private readonly CANVAS = document.getElementsByTagName("canvas")[0];
	private engine:BABYLON.Engine = new BABYLON.Engine(this.CANVAS, true);
	private scene:BABYLON.Scene = new BABYLON.Scene(this.engine);
	private player:Player = new Player(this.scene);
	private stage:Stage|undefined;

	constructor()
	{
		this.scene.autoClearDepthAndStencil = false;
		this.scene.clearColor = new BABYLON.Color4(0, 0.75, 0.85, 1);
		this.stage = new Stage(this.scene);
		this.run();
	}

	private run():void
	{
		this.engine.runRenderLoop(this.render);
		window.addEventListener("resize", () => {
			this.engine.resize();
		});
	}
	
	public render = ():void =>
	{
		this.scene.render();
	}
}