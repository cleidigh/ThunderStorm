
// Register JavaScript files, which should be loaded into opened windows. The API expects two functions to exist and will call
// * onLoad(window, was AlreadyOpen) during window load
// * onUnload(window) during window unload and during add-on shutdown
// The parameter wasAlreadyOpen indicates, if the window was already open, when the add-on has been installed/loaded.
// The JavaScript file will be loaded into its own namespace/object
messenger.WindowListener.registerWindow("chrome://messenger/content/messenger.xhtml", "content/test1.js");
messenger.WindowListener.registerWindow("chrome://messenger/content/addressbook/addressbook.xhtml", "content/test2.js");

// Any JSM which has been loaded by any of the registered JavaScript file, needs to be unloaded upon shutdown.
// Register a script, where this and other actions can be performed on add-on shutdown.
messenger.WindowListener.registerShutdownScript("content/shutdown.js");

// Start Listening for Windows
messenger.WindowListener.startListening();

