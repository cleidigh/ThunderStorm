function onLoad(window, wasAlreadyOpen) {
	console.log("onLoad from the ADDRBOOK script has been called by <"+this.extension.id+">");
	console.log("Window was already open during add-on start: " + wasAlreadyOpen);
	console.log(window.location.href);
}

function onUnload(window, isAddOnShutDown) {
	console.log("onUnload() from the ADDRBOOK script has been called by <"+this.extension.id+">");
	console.log("It has been called because of global add-on shutdown: " + isAddOnShutDown);
	console.log(window.location.href);
}
