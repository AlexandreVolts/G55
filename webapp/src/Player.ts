class Player extends BABYLON.UniversalCamera
{
	constructor(scene:BABYLON.Scene)
	{
		super("playerCamera", BABYLON.Vector3.Zero(), scene);
		this.attachControl(<HTMLElement>scene.getEngine().getRenderingCanvas());
	}
}