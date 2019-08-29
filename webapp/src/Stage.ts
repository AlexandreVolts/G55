class Stage
{
	private static readonly SIZE:number = 16;

	constructor(scene:BABYLON.Scene)
	{
		const SIDE_UVS:BABYLON.Vector4 = Stage.getFaceUV(new BABYLON.Vector2(2, 15));
		const PARAMS:any = {
			size: 1,
			faceUV: [
				SIDE_UVS, SIDE_UVS, SIDE_UVS, SIDE_UVS,
				Stage.getFaceUV(new BABYLON.Vector2(0, 15)),
				Stage.getFaceUV(new BABYLON.Vector2(1, 15))
			]
		};
		let texture:BABYLON.Texture = new BABYLON.Texture("assets/img/terrain.png", scene);
		let material:BABYLON.StandardMaterial = new BABYLON.StandardMaterial("testMaterial", scene);
		let test:BABYLON.Mesh;

		material.diffuseTexture = texture;
		test = BABYLON.MeshBuilder.CreateBox("test", PARAMS, scene);
		test.material = material;
		test.position.z += 10;
	}

	private static getFaceUV(coords:BABYLON.Vector2):BABYLON.Vector4
	{
		let output:BABYLON.Vector4 = new BABYLON.Vector4(coords.x, coords.y, coords.x + 1, coords.y + 1);

		return (output.scale(1 / Stage.SIZE));
	}
}