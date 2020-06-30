var { myModule } = ChromeUtils.import(this.extension.rootURI.resolve("content/modules/myModule.jsm"));

function onLoad(window, wasAlreadyOpen) {
	myModule.incValue();
	console.log("onLoad from the ADDRBOOK script has been called by <"+this.extension.id+">");
	console.log("onLoad() has been called for already open window: " + wasAlreadyOpen);
	console.log("onLoad() for: " + window.location.href);
	console.log("onLoad() sees myModule value : " + myModule.getValue());
}

function onUnload(window, isAddOnShutDown) {
	myModule.incValue();
	console.log("onUnload() from the ADDRBOOK script has been called by <"+this.extension.id+">");
	console.log("onUnload() has been called because of global add-on shutdown: " + isAddOnShutDown);
	console.log("onUnload() for: " + window.location.href);
	console.log("onUnload() sees myModule value : " + myModule.getValue());
}
