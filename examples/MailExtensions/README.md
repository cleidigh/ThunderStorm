## ![Thunderstorm icon] MailExtension Examples - How to get things done

| API             | Description |
| --------------- | ----------- |
| [HelloWorld-Popup][HelloWorld-Popup]      |  Simple HelloWorld example, using a single popup page/js  |
| [LoadModule][LoadModule]      | Example showing how to load JSMs using `file://*` URLs or `chrome://` URLs into an experiment.  |
| [WindowListener][WindowListener]      | This API is intended to help authors to add elements to different parts of the Thunderbird UI, which is not yet possible with built-in MailExtension APIs. The API itself does not need to be touched, it is fully configurable by entries in the background.js script and the actual action is done by user provided JavaScript files. These scripts are registered for certain windows and must include *onLoad()* and *onUnload()* functions, which will be automatically called, when windows get opened/closed or the add-on shuts down. It also shows how to load JSMs and how to access the i18n locales from experiments. |


## Credits
<div>Icons made by <a href="https://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>

[Thunderstorm icon]:/rep-resources/images/thunderstorm.png
[HelloWorld-Popup]:/examples/MailExtensions/HelloWorld-Popup
[LoadModule]:/examples/MailExtensions/LoadModule
[WindowListener]:/examples/MailExtensions/WindowListener
