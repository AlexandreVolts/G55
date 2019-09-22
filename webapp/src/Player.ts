class Player extends BABYLON.UniversalCamera
{
	constructor()
	{
		super("playerCamera", BABYLON.Vector3.Zero(), Game.scene);
		this.attachControl(<HTMLElement>Game.scene.getEngine().getRenderingCanvas());
	}
}