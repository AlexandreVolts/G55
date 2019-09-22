class BlocBuilder
{
	private static readonly SIZE:number = 1;
	private static current:number = 0;
	private blocs:Map<string, BABYLON.Mesh> = new Map<string, BABYLON.Mesh>();

	constructor(texturePath:string, datas:JSONType.Bloc[])
	{
		let texture = new BABYLON.Texture(texturePath, Game.scene, false, true, BABYLON.Texture.NEAREST_SAMPLINGMODE);
		let material = new BABYLON.StandardMaterial("bbMaterial", Game.scene);
		let mesh:BABYLON.Mesh;
		let sideUv:BABYLON.Vector4;
		let texPosition:BABYLON.Vector2;
		let params:any = {size: BlocBuilder.SIZE, wrap: true};

		texture.hasAlpha = true;
		material.backFaceCulling = true;
		material.diffuseTexture = texture;
		for (let i = 0, len = datas.length; i < len; i++) {
			texPosition = datas[i].position;
			params.faceUV = [];
			sideUv = Utils.getFaceUV(new BABYLON.Vector2(texPosition.x + 2, texPosition.y));
			for (let j = 0; j < 4; j++) {
				params.faceUV.push(sideUv);
			}
			params.faceUV.push(Utils.getFaceUV(texPosition));
			params.faceUV.push(Utils.getFaceUV(new BABYLON.Vector2(texPosition.x + 1, texPosition.y)))
			mesh = BABYLON.MeshBuilder.CreateBox("bb-" + datas[i].name, params, Game.scene);
			mesh.material = material;
			mesh.isVisible = false;
			this.blocs.set(datas[i].name, mesh);
		}
	}

	public getNewInstance(index:Cube.Type):Cube|undefined
	{
		const ID:string = index + BlocBuilder.current;
		const MESH = this.blocs.get(index);

		if (!MESH)
			return (undefined);
		BlocBuilder.current++;
		return (new Cube(ID, MESH));
	}
}