class Clock
{
	private start:number = performance.now();

	public restart():void
	{
		this.start = performance.now();
	}
	public getElapsedTime(asMillis = false):number
	{
		let now = performance.now();
		let millis = now - this.start;

		if (asMillis)
			return (millis);
		return (millis / 1000);
	}
}