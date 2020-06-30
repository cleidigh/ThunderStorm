# ![Thunderstorm icon] Hello World MailExtension - Popup

## Basic MailExtension File And Folder Structure

The structure below represents pretty much the bare minimum setup
for a new mail extension.

```js
	HelloWorld-Popup/
	├── manifest.json
	├── popup.html
	├── popup.css
	├── scripts/
	│   └── popup.js
	└── _locale/
	    └── en_US/
	        └── messages.json
```

## Notes:

- The root manifest.json replaces both install.rdf and chrome.manifest known from legacy extensions
- Uses popup.html as equivalent to legacy options.xul
- Folder organization is currently not strictly defined except _locale
- This example has one default locale, en_US
- The 2 manifest keys are the only localized strings
  

## Credits

Folder diagram CSS: https://codepen.io/patrickhlauke/pen/azbYWZ

[Thunderstorm icon]:/rep-resources/images/thunderstorm.png