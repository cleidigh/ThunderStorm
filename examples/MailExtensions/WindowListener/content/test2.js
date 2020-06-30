function onLoad(window, isAlreadyOpen) {
	console.log("ONLOAD: test2 script has been called by <"+this.extension.id+">");
	console.log("Window was already open during add-on start: " + isAlreadyOpen);
	console.log(window.location.href);
}

function onUnload(window) {
	console.log("ONUNLOAD: test2 script has been called");
	console.log(window.location.href);
}