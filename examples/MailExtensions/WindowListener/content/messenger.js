function onLoad(window, wasAlreadyOpen) {
	console.log("onLoad from the MESSENGER script has been called by <"+this.extension.id+">");
	console.log("onLoad() has been called for already open window: " + wasAlreadyOpen);
	console.log("onLoad() for: " + window.location.href);
}

function onUnload(window, isAddOnShutDown) {
	console.log("onUnload() from the MESSENGER script has been called by <"+this.extension.id+">");
	console.log("onUnload() has been called because of global add-on shutdown: " + isAddOnShutDown);
	console.log("onUnload() for: " + window.location.href);
}
