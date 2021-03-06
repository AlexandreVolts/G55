interface IGenerator
{
	/**
	 * Generate a LinearMatrix of numbers with the size passed as parameter.
	 * Each point's value corresponds to the height of its location in the LinearMatrix.
	 * 
	 * @params size - The size of the map, as a 3D vector.
	 * @returns A LinearMatrix containing all points generated by the algorithm's implementation.
	 */
	generate(size:BABYLON.Vector3):LinearMatrix<number>;
}