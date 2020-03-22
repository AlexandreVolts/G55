class Player extends BABYLON.UniversalCamera
{
	constructor()
	{
		super("playerCamera", BABYLON.Vector3.Zero(), Game.scene);
		this.attachControl(<HTMLElement>Game.scene.getEngine().getRenderingCanvas());
		this.applyGravity = true;
		this.checkCollisions = true;
		this.ellipsoid = new BABYLON.Vector3(0.5, 1, 0.5);
	}
}