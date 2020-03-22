class Stage
{
	private readonly PLANET_DATA:Utils.PlanetData = new Utils.PlanetData(0);
	private light:BABYLON.HemisphericLight;
	private blocBuilder:BlocBuilder;
	private mapBuilder:MapBuilder;
	private planet:Planet;
	private player:Player;

	constructor()
	{
		const LIGHT_DIR = new BABYLON.Vector3(0, 1, 0);
		const BLOC_DATAS:any = Utils.datas.get("blocs");
		const GENERATOR:IGenerator = new DiamondSquareGenerator();
		const SIZE = new BABYLON.Vector3(this.PLANET_DATA.SIZE, this.PLANET_DATA.PLANET.height, this.PLANET_DATA.SIZE);

		this.light = new BABYLON.HemisphericLight("light", LIGHT_DIR, Game.scene);
		this.player = new Player();
		this.planet = new Planet(GENERATOR.generate(SIZE), this.PLANET_DATA);
		this.blocBuilder = new BlocBuilder(BLOC_DATAS.path, BLOC_DATAS.datas);
		this.mapBuilder = new MapBuilder(this.blocBuilder);
		this.generateWorld();
		this.initialiseLight();
	}

	private generateWorld():void
	{
		this.mapBuilder.build(this.planet);
		this.player.position = this.planet.getRandomPosition();
		this.player.position.y += 5;
	}
	private initialiseLight():void
	{
		this.light.diffuse = new BABYLON.Color3(1, 1, 1);
		this.light.specular = new BABYLON.Color3(0, 0, 0);
	}

	public render():void
	{
		//console.log(this.player.position);
	}
}