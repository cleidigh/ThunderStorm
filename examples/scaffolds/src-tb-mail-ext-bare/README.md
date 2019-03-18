# ![Thunderstorm icon](./rep-resources/images/thunderstorm.png) Bare Bones MailExtension Scaffold

## Bare Bones MailExtensionFile And Folder Structure

The structure below represents pretty much the bare minimum setup
for a new mail extension.

```js
	tb-mail-ext-bare/
	├── manifest.json
	├── popup.html
	├── scripts/
	│   └── popup.js
	└── _locale/
	    └── en-US/
	        └── manifest.json
```

## Notes:

- Rough parallel to the legacy-xul-ext-basic1
- The root manifest.json replaces both install.rdf and chrome.manifest
- Uses popup.html as equivalent to legacy options.xul
- Folder organization is currently not strictly defined except _locale
- It is recommended to use a better structure that facilitates expansion and organization

## Credits

Folder diagram CSS: https://codepen.io/patrickhlauke/pen/azbYWZ