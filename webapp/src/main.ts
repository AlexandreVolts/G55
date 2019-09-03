///<reference path="../node_modules/babylonjs/babylon.module.d.ts" />

function main()
{
	const JSON_FILES:string[] = ["blocs", "structures", "planets"];
	
	Utils.datas = new JSONLoaderMap(JSON_FILES, () => {
		new Game();
	});
}

window.addEventListener("DOMContentLoaded", main);