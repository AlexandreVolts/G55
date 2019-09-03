abstract class Utils
{
	public static datas:JSONLoaderMap;

	public static rand(min:number, max:number):number
	{
		return (~~(min + Math.random() * (max - min)));
	}
	/**
	 * Returns a faceUV texture vector based on a position and a size.
	 *
	 * @params position - The position on the texture, from the to left corner.
	 * @params size - The number of sprites on the texture.
	 * @returns A faceUV vector scaled by the size of the texture.
	 */
	public static getFaceUV(position:BABYLON.Vector2, size:number = 16):BABYLON.Vector4
	{
		let output:BABYLON.Vector4;

		position.y = (size - 1) - position.y;
		output = new BABYLON.Vector4(position.x, position.y, position.x + 1, position.y + 1);

		return (output.scale(1 / size));
	}
}