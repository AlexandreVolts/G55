import express = require("express");
import socketio = require("socket.io");
import http = require("http");

class Server
{
	private static readonly VIEWS_PATH:string = __dirname + "../views/";
	private readonly PORT:number;
	private app = express();
	private io:socketio.Server;
	private server:http.Server;
	private players:Map<string, socketio.Socket> = new Map<string, socketio.Socket>()

	constructor(port:number)
	{
		this.PORT = port;
		this.server = this.app.listen(this.PORT, this.initialise);
		this.io = socketio(this.server);
		this.io.on("connection", this.onConnection);
	}

	private initialise = (err:string):void =>
	{
		if (err) {
			console.error(err);
			return;
		}
		this.app.use(express.static("views"));
		this.app.get("/", (req:express.Request, res:express.Response) => {
			req;
			res.sendFile(Server.VIEWS_PATH + "index.html");
		});
	}
	private onConnection = (socket:socketio.Socket) =>
	{
		this.players.set(socket.id, socket);
		socket.on("disconnect", () => {
			this.onDisconnect(socket);
		});
	}
	private onDisconnect = (socket:socketio.Socket) =>
	{
		this.players.delete(socket.id);
	}
}

export default Server;