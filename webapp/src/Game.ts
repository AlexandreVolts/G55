class Game
{
	private static readonly CANVAS = document.getElementsByTagName("canvas")[0];
	private static readonly GRAVITY = new BABYLON.Vector3(0, -0.2, 0);
	private static engine = new BABYLON.Engine(Game.CANVAS, true, undefined, true);
	public static scene = new BABYLON.Scene(Game.engine);
	private stage:Stage = new Stage();

	constructor()
	{
		Game.scene.autoClearDepthAndStencil = false;
		Game.scene.blockMaterialDirtyMechanism = true;
		Game.scene.clearColor = new BABYLON.Color4(0, 0.6, 0.8, 1);
		Game.scene.gravity = Game.GRAVITY;
		Game.scene.collisionsEnabled = true;
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