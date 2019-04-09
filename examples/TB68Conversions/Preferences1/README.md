# ![Thunderstorm icon] Thunderbird 68 Conversion: Preferences1

## Introduction & Overview

...to do

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
- [Message Archive Options (WIP): Andrew Williams, Christopher Leidigh][MAO]


## Credits

Folder diagram CSS: https://codepen.io/patrickhlauke/pen/azbYWZ

[MAO]:https://github.com/cleidigh/Message-archive-options-TB
[shrunked]:https://github.com/darktrojan/shrunked
[Thunderstorm icon]:/rep-resources/images/thunderstorm.png