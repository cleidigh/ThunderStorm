
// Register JavaScript files, which should be loaded into opened windows. The API expects two functions to exist and will call
// * onLoad(window, was AlreadyOpen) during window load
// * onUnload(window, isAddOnShutDown) during window unload and during add-on shutdown

// The additional parameter are:
// * wasAlreadyOpen : indicates, if the window was already open, when the add-on has been installed/loaded
// * isAddOnShutDown : indicates, if onUnload() has been called due to window closing or add-on shutdown

// The JavaScript file will be loaded into its own namespace/object, which has an additional extension member,
// which gives access to the extension object
messenger.WindowListener.registerWindow("chrome://messenger/content/messenger.xhtml", "content/messenger.js");
messenger.WindowListener.registerWindow("chrome://messenger/content/addressbook/addressbook.xhtml", "content/addressbook.js");

// Any JSM which has been loaded by any of the registered JavaScript file, needs to be unloaded upon shutdown.
// Register a script, where this and other actions can be performed on add-on shutdown.
messenger.WindowListener.registerShutdownScript("content/shutdown.js");

// Start Listening for Windows
messenger.WindowListener.startListening();

