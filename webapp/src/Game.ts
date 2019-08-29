class Game
{
	private canvas:HTMLCanvasElement = document.getElementsByTagName("canvas")[0];
	private engine:BABYLON.Engine = new BABYLON.Engine(this.canvas);
	private scene:BABYLON.Scene = new BABYLON.Scene(this.engine);
	private player:Player = new Player(this.scene);
	private stage:Stage = new Stage(this.scene);
	private tmpLight:BABYLON.HemisphericLight;

	constructor()
	{
		this.tmpLight = new BABYLON.HemisphericLight("tmplight", new BABYLON.Vector3(0, 1, 0), this.scene);
		this.tmpLight.diffuse = new BABYLON.Color3(1, 1, 1);
		this.tmpLight.specular = new BABYLON.Color3(0, 0, 0);
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