class ThreeDimensionsIterator
{
	private min:BABYLON.Vector3;
	private max:BABYLON.Vector3;

	constructor(min:BABYLON.Vector3, max?:BABYLON.Vector3)
	{
		this.min = min;
		if (max)
			this.max = max;
		else {
			this.max = this.min;
			this.min = BABYLON.Vector3.Zero();
		}
	}

	/**
	 * Run the iterator through the 3 dimensions passed to Iterator's constructor.
	 * Each turn it will run a callback which can have three parameters.
	 * The parameters are respectively x, y, and z position of the current Iterator's turn.
	 *
	 * @params callback - The callback which will be called for every position of the Iterator.
	 */
	public run(callback:Function):void
	{
		for (let x = this.max.x; x >= this.min.x; x--) {
			for (let y = this.max.y; y >= this.min.y; y--) {
				for (let z = this.max.z; z >= this.min.z; z--) {
					callback(x, y, z);
				}
			}
		}
	}
}