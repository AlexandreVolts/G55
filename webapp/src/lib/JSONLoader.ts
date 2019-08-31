class JSONLoader
{
	private onLoad:Function;
	private xhr:XMLHttpRequest = new XMLHttpRequest();
	
	constructor(path:string, onLoad:Function)
	{
		this.onLoad = onLoad;
		this.xhr.overrideMimeType("application/json");
		this.xhr.open("GET", path, true);
		this.xhr.onload = this.load;
		this.xhr.send(null);
	}

	private load = ():void =>
	{
		if (this.xhr.readyState == XMLHttpRequest.DONE) {
			this.onLoad();
		}
	}

	public getDatas():any
	{
		return (this.xhr.response);
	}
}