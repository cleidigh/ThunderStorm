/* global Preferences */

// Load Services using new import syntax - Access console & legacy preferences service
var { Services } = ChromeUtils.import('resource://gre/modules/Services.jsm');

// This is the fundamental design pattern change:  Preferences to find it loaded here 
// for the options.xul preferences dialog.  The preference array and objects map to
// the backend preference objects (existing legacy system).  preferencesBindings.js helper
// script loaded into the page context replaces the combined behavior of the overlay
// and legacy preferences systems.  Each preference is managed via the common preference
// id and equivalent XUL page preference identifier.  

// Add all relevant preferences into page with Preferences.addAll()
// Note: Both are current and default preferences are loaded for each object
// It should be possible to load the preferences here or within the onLoad() event handler

Services.console.logStringMessage("Preferences 1: Loading options.xul preferences P5");

let preferenceElements = document.querySelectorAll("data-preference");
let preferences = [];
for (let index = 0; index < preferenceElements.length; index++) {
	const element = preferenceElements[index];
	const elementType = element.getAttribute('type');
	preferences.push({id: element.id, type: elementType })
	Services.console.logStringMessage("Preferences 1: preference: "+ element.id + ' '+ elementType);
}
Services.console.logStringMessage("Preferences 1: scanned array: Done");

// Our onDialogAccept sub-handler
function onDialogAccept(e) {
	// Notice we are passing around the event object 'e'.  We need this to perform
	// changes on the default behavior (in this case closing the dialog AND saving the preferences)
	// With 'e'  we can use e.preventDefault() to NOT close or save the preferences

	// Do whatever you normally do for validation here, then decide to alert user
	// possibly reset to defaults or just don't close until a valid entry

	Services.console.logStringMessage("Preferences 1: onDialogAccept() - our accept handler");
	// Show what the preferences objects look like - just for kicks, nothing functional
	// Services.console.logStringMessage(Preferences.getAll());
	console.log(Preferences.getAll());

	// Here we check the values (from the page -based preferences, not the Preferences System directly)
	// You could also grab the current values from the DOM ala getElementById...

	// Note: If instantApply is true or the dialog is not a type=child, the preferences will have been saved
	// If not we do validation and potentially 'cancel' the normal accept path using preventDefault()
	// which prevents closing the dialog.  stopPropagation() also prevents the event from bubbling
	// which will have the preferences saved.

	const transitionColor = Preferences.get("extensions.preferences1.optionscolor").value;
	Services.console.logStringMessage("Preferences 1: Transition Color: " + transitionColor);

	// Validation functions/logic

	if (!isColor(transitionColor)) {
		Services.console.logStringMessage("Preferences 1: Invalid Color: " + transitionColor);
		// Use Services.prompt.alert() for best behavior
		Services.prompt.alert(window, 'Invalid Color', 'Please choose a valid color name.');

		// Note !!:  If we do not want to close AND also prevent application of the values (disk save)
		// we have to preventDefault and it looks like stopPropagation as well.
		e.stopPropagation();
		e.preventDefault();
		return true;
	}

	const duration = Preferences.get("extensions.preferences1.animationduration");
	if (typeof (duration.value) !== 'number' || duration.value <= 0) {
		Services.console.logStringMessage("Preferences 1: Invalid Duration: " + duration.value);
		Services.prompt.alert(window, 'Invalid Duration', 'Please choose a valid number (>0).');
		e.stopPropagation();
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
	s.color = strColor.toLowerCase();
	return s.color == strColor.toLowerCase();
}

// Standard load function - Preferences.addAll() does NOT like to be here
// they are already loaded at this point into the DOM

function onLoad(e) {
	Services.console.logStringMessage("Preferences 1: onload event function - load preferences array");

	Preferences.addAll(preferences);

/* 	
Preferences.addAll([
	{ id: "extensions.preferences1.optionscolor", type: "unichar" },
	{ id: "extensions.preferences1.animationduration", type: "int" },
	{ id: "extensions.preferences1.animationenabled", type: "bool" },
]);
 */
	// Grab the dialog element so we can play with it
	const dialog = document.getElementById("preferences1dialog");

	// Get current preferences (attached to DOM by Preferences.addAll() inline)
	// Note:  When one uses Preferences.get() these are not directly the preference attributes
	// rather they are the object copies in the window DOM therefore ephemeral like the dialog

	// Preferences.get() returns the preference object:
	// Use Preferences.get("pref-name").value for current value or .defaultValue for default
	const animateDialog = Preferences.get("extensions.preferences1.animationenabled");
	const duration = Preferences.get("extensions.preferences1.animationduration");
	const transitionColor = Preferences.get("extensions.preferences1.optionscolor");

	let durationTime = duration.defaultValue * 1000; // animation times in milliseconds

	// Do data validation just to be extra cautious
	if (typeof (duration.value) !== 'number' || duration.value < 0) {
		// Note: We cannot use prompt.alert here as pages not active yet (may be possible with fiddling)
		Services.console.logStringMessage("Preferences 1: Invalid Duration: " + duration.value);
		// Reset to preferences default stored in object
	} else {
		durationTime = duration.value * 1000;
	}

	if (!isColor(transitionColor.value)) {
		Services.console.logStringMessage("Preferences 1: Invalid Color: " + transitionColor.value);
		transitionColor.value = transitionColor.defaultValue;
	}

	const backgroundColor = window.getComputedStyle(dialog, null).getPropertyValue("background-color");
	Services.console.logStringMessage("Preferences 1: duration: " + durationTime + '  TransitionColor:' + transitionColor.value);

	// Use our Boolean preference animationenabled to animate or not
	if (!!animateDialog.value) {
		// And... Animate!  (because it's cool)
		dialog.animate([
			// keyframes
			{ backgroundColor: backgroundColor },
			{ backgroundColor: transitionColor.value },
			{ backgroundColor: backgroundColor },
		], {
				// timing options
				duration: durationTime,
				iterations: 1,
				delay: 2000
			});
	}
}

// The new preferences dialog paradigm uses standard event listeners for dialog events
// Use: 
// 'dialogaccept' event generated by the okay button (default button)
// 'dialogcancel' event generated by the cancel button 
// See documentation on modified dialog for more on events

document.addEventListener('dialogaccept', function (e) {
	Services.console.logStringMessage("Preferences 1: dialogaccept event handler");
	// Call our handler function - could be done here
	onDialogAccept(e);
	return false;
});

document.addEventListener('dialogcancel', function (e) {
	Services.console.logStringMessage("Preferences 1: dialogcancel event handler");
	return true;
});

window.addEventListener("load", function (e) { onLoad(e); }, false);
