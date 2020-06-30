## The WindowListener API

This API is intended to help authors to add elements to different parts of the Thunderbird UI, which is not yet possible with built-in MailExtension APIs. The API itself does not need to be touched, it is fully configurable by entries in the background.js script and the actual action is done by user provided JavaScript files. Check out these files to get started:

* [background.js](/examples/MailExtensions/WindowListener/background.js)
* [content/messenger.js](/examples/MailExtensions/WindowListener/content/messenger.js)
* [content/addressbook.js](/examples/MailExtensions/WindowListener/content/addressbook.js)
* [content/shutdown.js](/examples/MailExtensions/WindowListener/content/shutdown.js)

