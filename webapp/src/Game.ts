class Game
{
	private static readonly CANVAS = document.getElementsByTagName("canvas")[0];
	private static engine:BABYLON.Engine = new BABYLON.Engine(Game.CANVAS, true);
	public static scene:BABYLON.Scene = new BABYLON.Scene(Game.engine);
	private stage:Stage = new Stage();

	constructor()
	{
		Game.scene.autoClearDepthAndStencil = false;
		Game.scene.clearColor = new BABYLON.Color4(0, 0.6, 0.8, 1);
		this.run();
	}

	private run():void
	{
		Game.engine.runRenderLoop(this.render);
		window.addEventListener("resize", () => {
			Game.engine.resize();
		});
	}
	
	public render = ():void =>
	{
		Game.scene.render();
		this.stage.render();
	}
}