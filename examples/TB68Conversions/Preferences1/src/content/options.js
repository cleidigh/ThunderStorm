/* global strftime, Preferences */
var { Services } = ChromeUtils.import('resource://gre/modules/Services.jsm');


Services.console.logStringMessage("option loading");
console.log("options load");
Preferences.addAll([
	{ id: "extensions.preferences1.titlestring" , type: "unichar" },
	{ id: "extensions.preferences1.optionscolor" , type: "unichar" },
	{ id: "extensions.preferences1.animationduration" , type: "int" },
	{ id: "extensions.preferences1.animationenabled" , type: "bool" },
]);

function onDialogAccept(e) {
	Services.console.logStringMessage("option accepted");
	console.log("accept hours");
	console.log(Preferences.getAll());

	const transitionColor = Preferences.get("extensions.preferences1.optionscolor").value;
	Services.console.logStringMessage("Transition Color: " + transitionColor);

	if (!isColor(transitionColor)) {
		Services.console.logStringMessage("Invalid Color: " + transitionColor);
		Services.prompt.alert(window, 'Invalid Color', 'Please choose a valid color name');
		e.preventDefault();
		return false;
	}
	
	return true;
}

function isColor(strColor){
	var s=new Option().style;
	 s.color = strColor;
	return s.color == strColor;
   }
   

   function onLoad(e) {
	Services.console.logStringMessage("onload");
	const dialog = document.getElementById("preferences1dialog");

	// Get current preferences (attached to DOM by Preferences.addAll() inline)
	// Note:  When one uses Preferences.get() these are not directly the preference attributes
	// rather they are the object copies in the window DOM therefore ephemeral like the dialog
	const animateDialog = Preferences.get("extensions.preferences1.animationenabled").value;
	const duration = Preferences.get("extensions.preferences1.animationduration").value * 1000;
	const transitionColor = Preferences.get("extensions.preferences1.optionscolor").value;

	if (!isColor(transitionColor)) {
		Services.console.logStringMessage("Invalid Color: " + transitionColor);
	}

	const backgroundColor = dialog.style.backgroundColor;
	const bc = window.getComputedStyle(dialog, null).getPropertyValue("background-color");
	Services.console.logStringMessage("duration: "+duration+' '+transitionColor+' '+bc);

	// Use our Boolean preference animationenabled to animate or not
	if(!!animateDialog) {
		dialog.animate([
			// keyframes
			{ backgroundColor: bc},
			{ backgroundColor: transitionColor},
			{ backgroundColor: bc},
		], { 
			// timing options
			duration: duration,
			iterations: 1,
			delay: 3000
		});
	}
	
}


document.addEventListener('dialogaccept', function(e) {
	onDialogAccept(e);
	return false;
});
// document.addEventListener('dialogcancel', onDialogCancel());
document.addEventListener('dialogcancel', function(e) {
	let preferenceService = Cc["@mozilla.org/preferences-service;1"].getService(Ci.nsIPrefService).getBranch("extensions.messagearchiveoptions@eviljeff.com.");

	console.log("dialogue cancel ");
	return true;
});

// window.addEventListener("load", onLoad(), false);
window.addEventListener("load", function (e) { onLoad(e); }, false);
