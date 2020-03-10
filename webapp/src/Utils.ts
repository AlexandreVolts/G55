abstract class Utils
{
	public static datas:JSONLoaderMap;

	/**
	 * Returns a random number between min (included) and max (excluded).
	 * If the second parameter is not set, returns a number between 0 and min excluded (or min and 0 if min < 0).
	 * 
	 * @params min - The minimum value of the random number
	 * @params max - The maximum value of the random number.
	 * @returns A random number between min and max.
	 */
	public static rand(min:number, max?:number):number
	{
		if (max != undefined)
			return (~~(min + Math.random() * (max - min)));
		return (~~(Math.random() * min));
	}

	/**
	 * Returns a random BABYLON.Vector3 between min (included) and max (excluded).
	 * If the second parameter is not set, returns a BABYLON.Vector3 between 0 and min excluded (or min and 0 if min < 0).
	 * 
	 * @params min - The minimum values of the random vector
	 * @params max - The maximum values of the random vector.
	 * @returns A random BABYLON.Vector3 between min and max.
	 */
	public static getRandomVector(min:BABYLON.Vector3, max?:BABYLON.Vector3):BABYLON.Vector3
	{
		let output:BABYLON.Vector3 = new BABYLON.Vector3();

		output.x = Utils.rand(min.x, max != undefined ? max.x : max);
		output.y = Utils.rand(min.y, max != undefined ? max.y : max);
		output.z = Utils.rand(min.z, max != undefined ? max.z : max);
		return (output);
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

module Utils
{
	export class PlanetData
	{
		public readonly PLANET:JSONType.Planet;
		public readonly SIZE:number;
		public readonly RATIO:number;
		
		constructor(id:number)
		{
			this.PLANET = Utils.datas.get("planets").datas[id];
			this.SIZE = Math.pow(2, this.PLANET.size) + 1;
			this.RATIO = this.PLANET.height / (this.SIZE - 1);
		}
	}
}