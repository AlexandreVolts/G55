class Player
{
	private camera:BABYLON.UniversalCamera;
	
	constructor(scene:BABYLON.Scene)
	{
		this.camera = new BABYLON.UniversalCamera("playerCamera", BABYLON.Vector3.Zero(), scene);
		this.camera.attachControl(<HTMLElement>scene.getEngine().getRenderingCanvas());
	}
}