## The WindowListener API

This API is intended to help authors to add elements to different parts of the Thunderbird UI, which is not yet possible with built-in MailExtension APIs. The API itself does not need to be touched, it is fully configurable by entries in the background.js script and the actual action is done by user provided JavaScript files. These scripts are registered for certain windows and must include *onLoad()* and *onUnload()* functions, which will be automatically called, when windows get opened/closed or the add-on shuts down. It also shows how to load JSMs and how to access the i18n locales from experiments.

For the future the mechanism used by this API is not guaranteed to work so we strongly suggest to try to create custom experimental APIs tailored to your needed functionality which could be of general use and therefore be included in Thunderbird itself. Reach out to the [Add-on developer community](https://developer.thunderbird.net/add-ons/community) for help.

Check out these files to get started:

* [background.js](/examples/MailExtensions/WindowListener/background.js)
* [content/messenger.js](/examples/MailExtensions/WindowListener/content/messenger.js)
* [content/addressbook.js](/examples/MailExtensions/WindowListener/content/addressbook.js)
* [content/shutdown.js](/examples/MailExtensions/WindowListener/content/shutdown.js)

