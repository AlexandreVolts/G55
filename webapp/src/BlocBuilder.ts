interface BlocDescriptor
{
	name:string;
	position:BABYLON.Vector2;
}

class BlocBuilder
{
	private static readonly SIZE:number = 1;
	private blocs:BABYLON.Mesh[] = [];

	constructor(texturePath:string, datas:BlocDescriptor[], scene:BABYLON.Scene)
	{
		let texture = new BABYLON.Texture(texturePath, scene, false, true, BABYLON.Texture.NEAREST_SAMPLINGMODE);
		let material = new BABYLON.StandardMaterial("bbMaterial", scene);
		let mesh:BABYLON.Mesh;
		let sideUv:BABYLON.Vector4;
		let texPosition:BABYLON.Vector2;
		let params:any = {size: BlocBuilder.SIZE, wrap: true};

		texture.hasAlpha = true;
		material.backFaceCulling = true;
		material.diffuseTexture = texture;
		for (let i = datas.length - 1; i >= 0; i--) {
			texPosition = datas[i].position;
			params.faceUV = [];
			sideUv = Utils.getFaceUV(new BABYLON.Vector2(texPosition.x + 2, texPosition.y));
			for (let j = 0; j < 4; j++) {
				params.faceUV.push(sideUv);
			}
			params.faceUV.push(Utils.getFaceUV(texPosition));
			params.faceUV.push(Utils.getFaceUV(new BABYLON.Vector2(texPosition.x + 1, texPosition.y)))
			mesh = BABYLON.MeshBuilder.CreateBox("cube" + datas[i].name, params, scene);
			mesh.material = material;
			mesh.position.z = 10;
			mesh.position.x = i * BlocBuilder.SIZE;
			this.blocs.push(mesh);
		}
	}
}