class Stage
{
	private light:BABYLON.HemisphericLight;

	constructor(scene:BABYLON.Scene)
	{
		this.light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
		this.light.diffuse = new BABYLON.Color3(1, 1, 1);
		this.light.specular = new BABYLON.Color3(0, 0, 0);
	}
}