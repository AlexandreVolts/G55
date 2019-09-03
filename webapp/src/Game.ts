class Game
{
	private readonly CANVAS = document.getElementsByTagName("canvas")[0];
	private engine:BABYLON.Engine = new BABYLON.Engine(this.CANVAS, true);
	private scene:BABYLON.Scene = new BABYLON.Scene(this.engine);
	private stage:Stage = new Stage(this.scene);

	constructor()
	{
		this.scene.autoClearDepthAndStencil = false;
		this.scene.clearColor = new BABYLON.Color4(0, 0.6, 0.8, 1);
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
		this.stage.render();
	}
}