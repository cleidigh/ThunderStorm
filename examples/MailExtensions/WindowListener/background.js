
messenger.WindowListener.registerWindow("chrome://messenger/content/messenger.xhtml", "content/test1.js");
messenger.WindowListener.registerWindow("chrome://messenger/content/addressbook/addressbook.xhtml", "content/test2.js");

// Any JSM which has been loaded by any of the registered JavaScript file, needs to be unloaded upon shutdown.
// Register a script, where this and other actions can be performed on add-on shutdown.
messenger.WindowListener.registerShutdownScript("content/shutdown.js");

// Start Listening for Windows
messenger.WindowListener.startListening();

