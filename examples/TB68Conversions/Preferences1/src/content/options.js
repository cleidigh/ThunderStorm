/* global strftime, Preferences */
var { Services } = ChromeUtils.import('resource://gre/modules/Services.jsm');

// TODO: really describe what's happening here
Services.console.logStringMessage("option loading");

Preferences.addAll([
	{ id: "extensions.preferences1.titlestring", type: "unichar" },
	{ id: "extensions.preferences1.optionscolor", type: "unichar" },
	{ id: "extensions.preferences1.animationduration", type: "int" },
	{ id: "extensions.preferences1.animationenabled", type: "bool" },
]);

function onDialogAccept(e) {
	// Notice we are passing around the event object 'e'.  We need this to perform
	// changes on the default behavior (in this case closing the dialog AND saving the preferences)
	// With 'e'  we can use e.preventDefault() to NOT close or save the preferences

	// Do whatever you normally do for validation here, then decide to alert user
	// possibly reset to defaults or just don't close until a valid entry

	Services.console.logStringMessage("onDialogAccept() - our accept handler");
	// Show what the preferences objects look like - just for kicks, nothing functional
	Services.console.logStringMessage(Preferences.getAll());

	// Here we check the values (from the page -based preferences, not the Preferences System directly)
	// You could also grab the crop values from the DOM ala getElementById...

	const transitionColor = Preferences.get("extensions.preferences1.optionscolor").value;
	Services.console.logStringMessage("Transition Color: " + transitionColor);

	// Validation functions/logic

	if (!isColor(transitionColor)) {
		Services.console.logStringMessage("Invalid Color: " + transitionColor);
		// Use Services.prompt.alert() for best behavior
		Services.prompt.alert(window, 'Invalid Color', 'Please choose a valid color name.');

		// Note !!:  If we do not want to close AND also prevent application of the values (disk save)
		// we have to preventDefault.

		e.preventDefault();
		return true;
	}


	// Everything is cool, Preferences helper script will close dialog and save the new Preferences
	// in the legacy preferences system - to permanent storage 

	return true;
}


// Color validation function 
function isColor(strColor) {
	var s = new Option().style;
	s.color = strColor;
	return s.color == strColor;
}


// Standard load function - Preferences.addAll() does NOT like to be here
// they are already loaded at this point into the DOM

function onLoad(e) {
	Services.console.logStringMessage("onload event function");

	// Grab the dialog element so we comply with it
	const dialog = document.getElementById("preferences1dialog");

	// Get current preferences (attached to DOM by Preferences.addAll() inline)
	// Note:  When one uses Preferences.get() these are not directly the preference attributes
	// rather they are the object copies in the window DOM therefore ephemeral like the dialog
	const animateDialog = Preferences.get("extensions.preferences1.animationenabled").value;
	const duration = Preferences.get("extensions.preferences1.animationduration");
	const transitionColor = Preferences.get("extensions.preferences1.optionscolor").value;

	let durationTime = duration.defaultValue * 1000; // animation times in milliseconds
	 
	if (typeof(duration.value) !== 'number' || duration.value < 0) {
		// Note: We cannot use prompt.alert here as pages not active yet (may be possible with fiddling)
		Services.console.logStringMessage("Invalid Duration: " + duration);
		// Reset to preferences default stored in object
	} else {
		durationTime = duration.value * 1000;
	}

	if (!isColor(transitionColor)) {
		Services.console.logStringMessage("Invalid Color: " + transitionColor);
	}

	const backgroundColor = dialog.style.backgroundColor;
	const bc = window.getComputedStyle(dialog, null).getPropertyValue("background-color");
	Services.console.logStringMessage("duration: " + duration + ' ' + transitionColor + ' ' + bc);

	// Use our Boolean preference animationenabled to animate or not
	if (!!animateDialog) {
		dialog.animate([
			// keyframes
			{ backgroundColor: bc },
			{ backgroundColor: transitionColor },
			{ backgroundColor: bc },
		], {
				// timing options
				duration: durationTime,
				iterations: 1,
				delay: 3000
			});
	}

}


document.addEventListener('dialogaccept', function (e) {
	Services.console.logStringMessage("dialogaccept event handler");
	// Call our handler function - could be done here
	onDialogAccept(e);
	return false;
});

document.addEventListener('dialogcancel', function (e) {
	Services.console.logStringMessage("dialogcancel event handler");
	return true;
});

window.addEventListener("load", function (e) { onLoad(e); }, false);
