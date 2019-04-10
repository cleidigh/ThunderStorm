# ![Thunderstorm icon] Thunderbird 68 Conversion: Preferences1

## Introduction & Overview

The current "Legacy" Preferences System documented [here][MozillaPreferences], hereafter
"LPS" has several key changes in Thunderbird 68.  While the basic management features
remain, the handling of preferences within XUL documents is done differently.
The fundamental changes are:
- `<prefwindow>, <preferences>, <preference>, <prefpane>` elements are deprecated
- A modified `<dialog>` window is used instead of `<prefwindow>`
- Preference elements are no longer described in the XUL document, but in a script
- The preferencesBindings.js helper script has methods for managing the document preferences 
- `preference` attributes remain to bind the system preferences to the document elements

Note: Targeting Both Thunderbird 60/68

While the preferencesBindings.js exists in Thunderbird 60, the current example
Preferences1, does not currently work in TB60.  However... it looks like it is possible
to have Preferences management working with the new preferencesBindings for both
TB60 and TB68, I am investigating possible solutions.  I have an experiment partially working.
Even if that proves to be impossible, one can work with both in the same add-on changing logic 
depending upon the version.


## Preferences 1 Example

This example shows the use of `<dialog>` to replace the deprecated `<prefwindow>`.
as well as the other facilities in the new preferencesBindings helper script that
facilitate some of the backend work previously done in the legacy system.

The example tries to show simple preference setup and usage including both
a simple options.xul page with a corresponding options.js script that includes
preference loading, event handlers setup and the new handler types.

The code is reasonably documented, however, it does not include all the new
preferencesBindings methods and features.  A basic documentation section for this
who will be included soon.

## Official Add-ons as other complete examples of conversions

The following Thunderbird Add-ons are other examples to look at using the new system:

- [Shrunked Image Resizer: Geoff Lankow][shrunked]
- [Message Archive Options (WIP - See tb68-update branch): Andrew Williams, Christopher Leidigh][MAO]

## preferencesBindings.js Helper Script Reference

Preferences Methods:
- add() : Add individual managed preference object for the XUL
- addAll() : Add all managed preference object for the XUL in an array
- get() : Get individual preference object (not the value)
- getAll() : Get all preference objects in an array
- type() : Get document type 
- observe() : Preference observer
- forceUnableInstantApply() : Force instantApply = true



## Credits

Folder diagram CSS: https://codepen.io/patrickhlauke/pen/azbYWZ

[MozillaPreferences]:https://developer.mozilla.org/en-US/docs/Archive/Add-ons/Code_snippets/Preferences
[MAO]:https://github.com/cleidigh/Message-archive-options-TB
[shrunked]:https://github.com/darktrojan/shrunked
[Thunderstorm icon]:/rep-resources/images/thunderstorm.png